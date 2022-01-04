const express = require("express");
require("dotenv").config();

const app = express();
const port =3001;
const fs = require("fs");

//creating a folder to store files
if (!fs.existsSync("CreatedFiles")) fs.mkdirSync("CreatedFiles");

// Create File
app.get("/createFile", (req, res, next) => {
  var date = new Date();
  var fileName = `${date.toISOString()}.txt`;
  fileName = fileName.slice(0, 19).replace(/:/g, "-");

  var data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;

  fs.writeFileSync(`./CreatedFiles/${fileName}.txt`, data, (err) => {
    if (err) console.log(err);
  });
  res.send("File Created Successfully");
});

// Get the data
app.get("/getFile", (req, res) => {
  var storage = fs.readdirSync("./CreatedFiles");
  res.send(storage.sort());
});
app.get("/", (req, res) => {
  res.send(`Create New File: Use url/createFile & Get Files: Use url/getFile`);
});

app.listen(port, () => {
  console.log(`server run at port ${port}`);
});
