const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

//configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

const server = app.listen(port, () => {
  console.log(`Local Server running at port ${port}`);
});

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earth_saver",
});

app.get("/", (request, response) => {
  response.send("Getting here is good");
});

app.post("/api/register", (request, response) => {
  const firstname = request.body.firstName;
  const lastname = request.body.lastName;
  const phone = request.body.phone;
  const password = request.body.password;
  const email = request.body.email;
  const addy = request.body.homeAddy;

  console.log(request.body);

  connection.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
    (error, result, fields) => {
      if (error) {
        console.log(err);
      } else if (result.length > 0) {
        response.send({ message: "Failed", reason: "Email already exist"});
      } else {
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);

        connection.query(
          "INSERT INTO users (first_name, last_name, email, phone, home_address, password) VALUES (?,?,?,?,?,?)",
          [firstname, lastname, email, phone, addy, hashPassword],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let token = jwt.sign(
                { email: email, userId: result.insertId },
                "19072022"
              );
              const accessData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                token: token,
              };
              response.send({ message: "Success", data: accessData });
            }
          }
        );
      }
    }
  );
});

app.post("/api/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  connection.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
    (error, result, fields) => {
      if (error) {
        response.send({
          message: "Failed",
          reason: "Database connection error",
        });
      } else if (result.length > 0) {
        if (bcrypt.compareSync(password, result[0].password)) {
          let token = jwt.sign(
            { email: email, userId: result.insertId },
            "25072022"
          );
          const accessData = {
            firstname: result[0].first_name,
            lastname: result[0].last_name,
            email: result[0].email,
            token: token,
          };
          response.send({ message: "Success", data: accessData });
        } else {
          response.send({ message: "Failed", reason: "Wrong Password" });
        }
      } else {
        response.send({ message: "Failed", reason: "Email does not exist" });
      }
    }
  );
});
