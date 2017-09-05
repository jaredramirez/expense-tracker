const mongoBase = (
  method,
  collection,
  object,
  returnRawResult = false,
) => new Promise((resolve, reject) => {
  collection[method](object, (err, result) => {
    if (err) {
      reject(err);
    }

    if (returnRawResult) {
      resolve(result);
    } else if (result || result.value) {
      resolve(result.value);
    } else {
      resolve();
    }
  });
});

const mongoBaseOperations = (method, collection, object, operations) =>
new Promise((resolve, reject) => {
  collection[method](object, {...operations},
  (err, result) => {
    if (err) {
      reject(err);
    }

    if (result || result.value) {
      resolve(result.value || result);
    } else {
      resolve();
    }
  });
});

const create = (collection, object) =>
  mongoBase('insertOne', collection, object, true);

const readAll = (collection, condition = {}) => new Promise((resolve, reject) => {
  collection.find(condition).toArray((err, users) => {
    if (err) {
      reject(err);
    }
    resolve(users);
  });
});

const readByEmail = (collection, email) =>
  mongoBase('findOne', collection, {email}, true);

const readById = (collection, _id, condition = {}) =>
  mongoBase('findOne', collection, {_id, ...condition}, true);

const replaceById = (collection, _id, operations, condition = {}) =>
  mongoBaseOperations('findOneAndReplace', collection, {_id, ...condition}, operations);

const deleteById = (collection, _id, condition = {}) =>
  mongoBase('findOneAndDelete', collection, {_id, ...condition});

const deleteMany = (collection, condition = {}) =>
  mongoBase('deleteMany', collection, condition, true);

const isAuthorizedToModify = async (col, authAccess, _id) => {
  const userToModify = await readById(col, _id);
  if (!userToModify) { throw Object.create({code: 404}); }
  return userToModify.access <= authAccess;
};

export {
  create,
  readAll,
  readByEmail,
  readById,
  replaceById,
  deleteById,
  deleteMany,
  isAuthorizedToModify,
};
