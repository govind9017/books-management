"use strict";

module.exports = function (Book) {
  Book.remoteMethod("fetchBooks", {
    http: {
      path: "/",
      verb: "get",
    },
    accepts: {
      arg: "filter",
      type: "object",
    },
    returns: {
      arg: "books",
      type: "object",
      root: "true",
    },
  });

  Book.fetchBooks = async function (filter) {
    console.log("Inside fetch book list", filter);
    if (!filter) filter = {};
    filter.limit = filter.limit || 10;
    filter.skip = filter.skip || 0;
    return await Book.find(filter);
  };
  Book.disableRemoteMethodByName("find", true);

  Book.remoteMethod("deleteAllBooks", {
    http: {
      path: "/",
      verb: "delete",
    },
    accepts: {
      arg: "filter",
      type: "object",
    },
    returns: {
      arg: "deletCount",
      type: "string",
      root: "true",
    },
  });

  Book.deleteAllBooks = function () {
    console.log("Inside deleteAllBooks :: Deleting all books");
    return Book.destroyAll();
  };
};
