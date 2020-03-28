const orm = require("../config/orm.js");

const burger = {
  all: cb => {
    orm.selectAll("burgers", res => {
      cb(res);
    });
  },
  insert: (cols, vals, cb) => {
    orm.insertOne("burgers", cols, vals, res => {
      cb(res);
    });
  },
  update: (objColVals, condition, cb) => {
    orm.updateOne("burgers", objColVals, condition, res => {
      cb(res);
    });
  }
};

module.exports = burger;
