const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer  = require('multer');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

//configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Local Server running at port ${port}`);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earth_saver",
});

app.post("/api/register", (request, response) => {
  const firstname = request.body.firstName;
  const lastname = request.body.lastName;
  const phone = request.body.phone;
  const password = request.body.password;
  const email = request.body.email;
  const addy = request.body.homeAddy;

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
                id: result.insertId,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                addy: addy,
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
            { email: email, userId: result[0].user_id },
            "25072022"
          );
          const accessData = {
            id: result[0].user_id,
            firstname: result[0].first_name,
            lastname: result[0].last_name,
            email: result[0].email,
            phone: result[0].phone,
            addy: result[0].home_address,
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

app.post("/api/users/:userId", (request, response) => {
  const firstname = request.body.firstName;
  const lastname = request.body.lastName;
  const phone = request.body.phone;
  const email = request.body.email;
  const addy = request.body.homeAddy;
  const userid = request.params.userId;
  const token = request.body.token;

  connection.query(
    "UPDATE users SET first_name=?, last_name=?, phone=?, email=?, home_address=? WHERE user_id=?",
    [firstname, lastname, phone, email, addy, userid],
    (error, result, fields) => {
      if (error) {
        response.send({ message: "Failed", reason: "Account update failed" });
      } else {
              const accessData = {
                id: userid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                addy: addy,
                token: token,
              };
              response.send({ message: "Success", reason: "Account updated successfully",  data: accessData });
      }
    }
  )

});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/images')     
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random())}.jpg`;
      cb(null, file.fieldname + '_' + uniqueSuffix)
  }
})

const upload = multer({
  storage: storage
});

app.post("/api/request/add", upload.single('wasteimage'), (request, response) => {
  const requestDate = request.body.requestDate;
  const requestWeight = request.body.requestWeight;
  const requestLocation = request.body.requestLocation;
  const userid = request.body.userId;
  const requestImage = request.file.filename;

  console.log("Body", request.body)
  console.log("File", request.file)

  connection.query(
    "INSERT INTO requests (req_weight, pickup_date, req_image, req_location, req_user_id) VALUES (?,?,?,?,?)",
    [requestWeight, requestDate, requestImage, requestLocation, userid],
    (error, result, fields) => {
      if (error) {
          response.send({ message: "Failed", reason: "Recycle request failed" });
      } else {
          response.send({ message: "Success", reason: "Recycle request added successfully"});
      }
    }
  )

});

app.get("/api/requests/:userId", (request, response) => {
  const userid = request.params.userId;

  connection.query(
    "SELECT * FROM requests WHERE req_user_id = ?",
    [userid],
    (error, result, fields) => {
      if (error) {
        response.send({
          message: "Failed",
          reason: "Database connection error",
        });
      } else if (result) {        
        response.send({
          message: "Success",
          data: result 
        });
      }
    })
});