const fs = require('fs');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let entireData = initialize()
let dataCollection = new Data(entireData[0], entireData[1]);

function initialize() {
    const students = new Promise(function (resolve, reject) {
        fs.readFile("./data/students.json", "utf8", (err, data) => {
            if (err) {
                reject("Unable to read file " + err);
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject("Unexpected error while parsing " + error);
                }
            }
        });
    });
    const courses = new Promise(function (resolve, reject) {
        fs.readFile("./data/courses.json", "utf8", (err, res) => {
            if (err) {
                reject("Unable to read " + err);
            } else {
                try {
                    resolve(JSON.parse(res));
                } catch (error) {
                    reject("Unexpected error while parsing " + error);
                }
            }
        });
    })
    return [students, courses]
}

function getAllStudents() {
    return new Promise(function (resolve, reject) {
        dataCollection.students.then(data => {
            if (data.length === 0) {
                reject("No results returned");
            }
            resolve(data)
        })
    }).catch(error => {
        console.log(error)
    })
}

function getTAs() {
    return new Promise((resolve, reject) => {
        dataCollection.students.then(data => {
            if (data.length === 0) {
                reject("No results returned")
            }
            let realTA = [];
            data.forEach((item, index) => {
                if (item["TA"] === true) {
                    realTA.push(item)
                }
            })
            resolve(realTA)
        })
    })
}

function getCourses() {
    return new Promise((resolve, reject) => {
        dataCollection.courses.then(
            (data) => {
                if (data.length === 0) {
                    reject("No results returned");
                }
                resolve(data)
            }
        );
    })
}

function getStudentsByCourse(course) {
    return new Promise(function (resolve, reject) {
        dataCollection.students.then((data) => {
            if (data.length === 0) {
                reject("No results returned");
            }
            let studentsByCourse = [];
            data.forEach((item, index) => {
                if (item["course"] === course) {
                    studentsByCourse.push(item)
                }
            })
            resolve(studentsByCourse)
        })
    })
}

function getStudentsByNum(num) {
    return new Promise(function (resolve, reject) {
        dataCollection.students.then((data) => {
            let name = null;
            data.forEach((item, index) => {
                if (item["studentNum"] === num) {
                    name = item["firstName"] + " " + item["lastName"]
                }
            })
            if (name) {
                resolve(name)
            } else {
                reject("No results returned")
            }
        })
    })
}


module.exports = {
    Data,
    initialize,
    getAllStudents,
    getTAs,
    getCourses,
    getStudentsByCourse,
    getStudentsByNum
}