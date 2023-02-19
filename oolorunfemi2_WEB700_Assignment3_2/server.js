/*********************************************************************************
 *  WEB700 – Assignment 03
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part
 *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Olushola Adeniyi Olorunfemi 
 *  Student ID: 105221220 
 *  Date: February 28,2023
 *
 ********************************************************************************/

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const comData = require("./modules/collegeData");
const app = express();
const PATH = require("path");
const bodyParser = require("body-parser");

app.set("json spaces", 4);
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/audio", express.static(PATH.join(__dirname, "/audio")));
app.use("/videos", express.static(PATH.join(__dirname, "/videos")));
app.use("/images", express.static(PATH.join(__dirname, "/images")));

// setup to listen from main
app.get("/students", (req, res) => {
  const pquery = parseInt(req.query.course);

  const allStudents = comData
    .getAllStudents()
    .then((data) => {
      if (pquery) {
        comData.getStudentsByCourse(pquery).then((item) => {
          return res.status(200).json(item);
        });
      } else {
        return res.status(200).json(data);
      }
    })
    .catch((error) => {
      return res.status(404).json({
        message: "No results returned",
      });
    });
});

app.get("/students/:num", (req, res) => {
  const theNum = parseInt(req.params.num);
  if (theNum) {
    return comData
      .getStudentsByNum(theNum)
      .then((item) => {
        return res.status(200).json(item);
      })
      .catch((error) => {
        return res.status(404).json({
          message: "No results",
        });
      });
  }
});

app.get("/tas", (req, res) => {
  const allTas = comData
    .getTAs()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(200).json({
        message: "No results",
      });
    });
});

app.get("/courses", (req, res) => {
  const allCourses = comData
    .getCourses()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(200).json({
        message: "No results",
      });
    });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/htmlDemo", (req, res) => {
  res.sendFile(__dirname + "/views/htmlDemo.html");
});

// for unknow routes
app.use(function (req, res) {
  res.status(404).sendFile(__dirname + "/views/404.html");
});

comData
  .initialize()[0]
  .then((data) => {
    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: " + HTTP_PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
