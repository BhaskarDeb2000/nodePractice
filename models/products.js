const fs = require("fs");
const path = require("path");
const Path = require("../util/path");
const { fileLoader } = require("ejs");

module.exports = class product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(Path, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    const p = path.join(Path, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
