import {collections, secret} from '../config';
import {handleError} from '../errors';
import {schema as userSchema, sanatize} from '../schema/user';
import authorizationSchema from '../schema/authorization';

import {
  create as crudCreate,
  readAll as crudReadAll,
  readByEmail as crudReadByEmail,
  readById as crudReadById,
  replaceById as crudReplaceById,
  deleteById as crudDeleteById,
  deleteMany as crudDeleteMany,
  isAuthorizedToModify,
} from '../ops/db';
import {
  compare,
  hash,
  generateJwt,
  isValidId,
} from '../ops/utils';

const usersCollection = collections.users;
const expensesCollection = collections.expenses;

export const authenticate = async ({payload, mongo: {db}}, reply) => {
  try {
    const {error} = authorizationSchema.validate(payload);
    if (error) { throw Object.create({code: 400, message: 'invalid payload.'}); }

    const col = db.collection(usersCollection);
    const user = await crudReadByEmail(col, payload.email);
    if (!user) { throw Object.create({code: 404}); }

    const isValid = compare(payload.password, user.password);
    if (!isValid) { throw Object.create({code: 401, message: 'invalid login credentials.'}); }

    const token = generateJwt({
      id: user._id,
      email: user.email,
      access: user.access,
    }, secret);
    reply({token});
  } catch (e) {
    reply(handleError(e));
  }
};

export const create = async ({payload, mongo: {db}}, reply) => {
  try {
    if (payload.access !== undefined) { throw Object.create({code: 400, message: 'invalid payload.'}); }
    const {error} = userSchema.validate(payload);
    if (error) { throw Object.create({code: 400, message: 'invalid payload.'}); }

    const col = db.collection(usersCollection);
    const hashedPassword = hash(payload.password, 8);
    const object = {...payload, password: hashedPassword, access: 0};
    const result = await crudCreate(col, object);
    if (!result) { throw Object.create({code: 500}); }

    reply({id: result.insertedId}).code(201);
  } catch (e) {
    reply(handleError(e));
  }
};

export const createAuthorized = async ({app: {authPayload}, payload, mongo: {db}}, reply) => {
  try {
    if (payload.access === undefined) { throw Object.create({code: 400, message: 'invalid payload.'}); }
    if (payload.access > authPayload.access) {
      throw Object.create({
        code: 401,
        message: 'cannot provide access greater than your own.',
      });
    }
    const {error} = userSchema.validate(payload);
    if (error) { throw Object.create({code: 400, message: 'invalid payload.'}); }

    const col = db.collection(usersCollection);
    const hashedPassword = hash(payload.password, 8);
    const object = {...payload, password: hashedPassword, access: payload.access};
    const result = await crudCreate(col, object);
    if (!result) { throw Object.create({code: 500}); }

    reply({id: result.insertedId}).code(201);
  } catch (e) {
    reply(handleError(e));
  }
};

export const readAll = async ({app, mongo: {db}}, reply) => {
  try {
    const col = db.collection(usersCollection);
    const users = (await crudReadAll(col)).reduce((list, user) => {
      if (app.authPayload.access >= user.access) {
        list.push(sanatize(user));
      }
      return list;
    }, []);

    reply(users);
  } catch (e) {
    reply(handleError(e));
  }
};

export const readById = async ({app: {authPayload}, mongo: {db, ObjectID}, params}, reply) => {
  try {
    if (!isValidId(params.userId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    const col = db.collection(usersCollection);

    const user = await crudReadById(col, new ObjectID(params.userId));
    if (!user) { throw Object.create({code: 404}); }
    if (user.access > authPayload.access) { throw Object.create({code: 404}); }

    reply(sanatize(user));
  } catch (e) {
    reply(handleError(e));
  }
};

export const replaceById = async (
  {app: {authPayload}, payload, mongo: {db, ObjectID}, params},
  reply) => {
  try {
    if (!isValidId(params.userId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    const {error} = userSchema.validate(payload);
    if (error) { throw Object.create({code: 400, message: 'invalid payload.'}); }

    const col = db.collection(usersCollection);


    // move to lib/auth.js after https://github.com/dwyl/hapi-auth-jwt2/issues/219
    if (authPayload.access === 0 && payload.access !== undefined) {
      throw Object.create({code: 401, message: 'cannot modify own access.'});
    }
    if (authPayload.access === 1) {
      if (authPayload.id === params.userId && payload.access !== undefined) {
        throw Object.create({code: 401, message: 'cannot modify own access.'});
      } else if (payload.access > authPayload.access) {
        throw Object.create({
          code: 401,
          message: 'cannot provide access greater than your own.',
        });
      } else {
        const isAuthorized = await isAuthorizedToModify(
          col,
          authPayload.access,
          new ObjectID(params.userId),
        );
        if (!isAuthorized) {
          throw Object.create({code: 404});
        }
      }
    }

    const hashedPassword = hash(payload.password, 8);
    const object = {...payload, password: hashedPassword};
    const oldUser = await crudReplaceById(col, new ObjectID(params.userId), {$set: object});
    if (!oldUser) { throw Object.create({code: 404}); }

    reply(sanatize(oldUser));
  } catch (e) {
    reply(handleError(e));
  }
};

export const deleteById = async ({app: {authPayload}, mongo: {db, ObjectID}, params}, reply) => {
  try {
    if (!isValidId(params.userId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    const userCol = db.collection(usersCollection);
    const expensesCol = db.collection(expensesCollection);

    // move to lib/auth.js after https://github.com/dwyl/hapi-auth-jwt2/issues/219
    if (authPayload.access !== 2) {
      const isAuthorized = await isAuthorizedToModify(
        userCol,
        authPayload.access,
        new ObjectID(params.userId),
      );
      if (!isAuthorized) {
        throw Object.create({code: 404});
      }
    }

    const deletedUser = await crudDeleteById(userCol, new ObjectID(params.userId));
    if (!deletedUser) { throw Object.create({code: 404}); }

    await crudDeleteMany(expensesCol, {createdBy: new ObjectID(params.userId)});

    reply(sanatize(deletedUser));
  } catch (e) {
    reply(handleError(e));
  }
};
