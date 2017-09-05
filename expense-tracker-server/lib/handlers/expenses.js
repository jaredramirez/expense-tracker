import {collections} from '../config';
import {handleError} from '../errors';
import {schema} from '../schema/expense';

import {
  create as crudCreate,
  readAll as crudReadAll,
  readById as crudReadById,
  replaceById as crudReplaceById,
  deleteById as crudDeleteById,
} from '../ops/db';
import {isValidId} from '../ops/utils';

const expensesCollection = collections.expenses;
const usersCollection = collections.users;

const ensureUserExists = async (col, id) => {
  const user = await crudReadById(col, id);
  if (!user) { throw Object.create({code: 404}); }
};

export const createByUser = async ({payload, mongo: {db, ObjectID}, params}, reply) => {
  try {
    if (!isValidId(params.userId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    const {error} = schema.validate(payload);
    if (error) { throw Object.create({code: 400, message: 'invalid payload.'}); }

    await ensureUserExists(db.collection(usersCollection), new ObjectID(params.userId));

    const col = db.collection(expensesCollection);
    const result = await crudCreate(col, {...payload, createdBy: new ObjectID(params.userId)});
    if (!result) { throw Object.create({code: 500}); }

    reply({id: result.insertedId}).code(201);
  } catch (e) {
    reply(handleError(e));
  }
};

export const readAllByUser = async ({mongo: {db, ObjectID}, params}, reply) => {
  try {
    if (!isValidId(params.userId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    await ensureUserExists(db.collection(usersCollection), new ObjectID(params.userId));

    const col = db.collection(expensesCollection);
    const condition = {createdBy: new ObjectID(params.userId)};
    const expenses = await crudReadAll(col, condition);
    reply(expenses);
  } catch (e) {
    reply(handleError(e));
  }
};

export const readByUserAndId = async ({mongo: {db, ObjectID}, params}, reply) => {
  try {
    if (!isValidId(params.userId) || !isValidId(params.expenseId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    const col = db.collection(expensesCollection);
    const condition = {createdBy: new ObjectID(params.userId)};
    const expense = await crudReadById(col, new ObjectID(params.expenseId), condition);
    if (!expense) { throw Object.create({code: 404}); }

    reply(expense);
  } catch (e) {
    reply(handleError(e));
  }
};

export const replaceByUserAndId = async ({payload, mongo: {db, ObjectID}, params}, reply) => {
  try {
    if (!isValidId(params.userId) || !isValidId(params.expenseId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    const {error} = schema.validate(payload);
    if (error) { throw Object.create({code: 400, message: 'invalid payload.'}); }

    const col = db.collection(expensesCollection);
    const condition = {createdBy: new ObjectID(params.userId)};
    const oldExpense = await crudReplaceById(
      col,
      new ObjectID(params.expenseId),
      {$set: payload},
      condition,
    );
    if (!oldExpense) { throw Object.create({code: 404}); }

    reply(oldExpense);
  } catch (e) {
    reply(handleError(e));
  }
};

export const deleteByUserAndId = async ({mongo: {db, ObjectID}, params}, reply) => {
  try {
    if (!isValidId(params.userId) || !isValidId(params.expenseId)) {
      throw Object.create({code: 400, message: 'invalid ID.'});
    }

    const col = db.collection(expensesCollection);
    const condition = {createdBy: new ObjectID(params.userId)};
    const deletedExpense = await crudDeleteById(col, new ObjectID(params.expenseId), condition);
    if (!deletedExpense) { throw Object.create({code: 404}); }

    reply(deletedExpense);
  } catch (e) {
    reply(handleError(e));
  }
};
