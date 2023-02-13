/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Olushola Adeniyi Olorunfemi 
*  Student ID: oolorunfemi  
*  Date: January 21, 2023
*
********************************************************************************/ 


const serverVerbs=["GET","GET","GET","POST","GET","POST"];
const serverPaths=["/","/about","/contact","/login","/panel","/logout"];
const serverResponses=[
    "Welcome to WEB700 Assignment 1",
    "This assignment was prepared by Olushola Adeniyi Olorunfemi",
    "Olushola Adeniyi Olorunfemi: oolorunfemi2@myseneca.ca",
    "User Logged In",
    "Main Panel",
    "Logout Complete"
];
function httpRequest(httpVerb,path){
    const pathIndex=serverPaths.indexOf(path)
    if (serverVerbs[pathIndex]===httpVerb){
        return ("200: "+ serverResponses[pathIndex] )
    }else{
        return (`404: Unable to process ${httpVerb} request for ${path}`);
    };
};


function automateTest(){
const randomIndex=function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
const testVerbs=["GET","POST"]
const testPaths=[
    "/",
    "/about",
    "/contact",
    "/login",
    "/panel",
    "/logout",
    "/randomPath1",
    "/randomPath2"
]
function randomRequest(){
    let randVerb=testVerbs[randomIndex(2)];
    let randPath=testPaths[randomIndex(2)];
    console.log(httpRequest(randVerb,randPath));
    }
setInterval(randomRequest,1000);
}
automateTest()
