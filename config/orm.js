const connection = require("../config/connection.js");

function valuesToStrings(values) {
  let tempString = "";

  for (let i = 0; i < values.length; i++) {
    if (i === values.length - 1) {
      tempString += "'" + values[i] + "'";
    } else {
      tempString += "'" + values[i] + "',";
    }
  }

  return tempString;
}

const objToSql = ob => {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
};

const orm = {
  selectAll: (tableInput, cb) => {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: (tableInput, cols, vals, cb) => {
    let queryString =
      "INSERT INTO " + tableInput + " (" + cols.toString() + ") VALUES (";
    queryString += valuesToStrings(vals) + ");";

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: (tableInput, objColVals, condition, cb) => {
    let queryString = "UPDATE " + tableInput + " SET ";
    queryString += objToSql(objColVals) + " WHERE " + condition + ";";

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;
