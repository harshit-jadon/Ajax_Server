let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours()+"Hrs " + date.getMinutes()+"Mins " + date.getSeconds()+ "Secs ";
}

function makeAJAXCall(methodType, url, callback,async= true,data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        // console.log(methodType+" state changed called at: "+showTime()+"Ready state: "+ xhr.readyState+" Status "+xhr.status);
        if(xhr.readyState === 4){
        if(xhr.status === 200 || xhr.status === 201){
            callback(xhr.responseText);
        }else if(xhr.status >=400){
            console.log("Handle 400 client Eroor 0r %00 server Error at: "+showTime());
        }
    }
}
    xhr.open(methodType,url,async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+" request sent to the server at "+showTime());
}

const getURL = "http://127.0.0.1:3000/employees/";
function getUserDetails(data){
    console.log("Get User data at: "+showTime()+ " data: "+data)
}

makeAJAXCall("GET", getURL, getUserDetails,true);
console.log("Made FET AJAX call to server at "+showTime());

const deleteURL ="http://127.0.0.1:3000/employees/4";
function userDeleted(data){
    console.log("user deleted at: "+showTime() +"data: "+data)
}
makeAJAXCall("DELETE", deleteURL,userDeleted,false);
console.log("Made FET AJAX call to server at "+showTime());

const postURL = "http://127.0.0.1:3000/employees";
const emplData ={"name": "Harry","salary": "5000"};
function userAdded(data){
    console.log("user Added: "+showTime() +" data: "+data)
}
makeAJAXCall("POST", postURL,userAdded, true,emplData);
console.log("Made FET AJAX call to server at "+showTime());