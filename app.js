const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
mongoose.connect("mongodb+srv://admin-khallaf:Khallmohmed123@cluster0.imo1e.mongodb.net/socialcontactDB");
const emailScema={
    Fname:String,
    lname:String,
    address:String,
    birthdate:Date,
    phonenumber:String,
    gender:String,
    email:String,
    password:String
}
const emails=mongoose.model("emails",emailScema);
const email=new emails({
    Fname:"mohamed",
    lname:"abdulhameed",
    address:"nekla-qanater-giza",
    birthdate:"1998-04-14",
    phonenumber:"01027329744",
    gender:"male",
    email:"khallmohmed123@gmail.com",
    password:"Khallmohmed123_"
});
email.save(function(err){
    if(err) throw err;
});
var messagebird = require('messagebird')("eRnirdlWRiwh0ZUsQdiOjs7bF")
app.get("/",function(req,res){
    verifynumber();
    res.render("index");
});
function verifynumber(){
    const charnums="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var code="";
    for(var i=0;i<6;i++){
        code+=(charnums[Math.floor(Math.random()*62)]);
    }
    return code;
}
app.get("/signUp",function(req,res){
    res.render("signUp");
})
var code="";
app.post("/",function(req,res)
{   
    if(req.body.action=="sign"){
        const verinumber=verifynumber();
        code=verinumber;
        console.log(code);
        res.render("numverify");
    }else if(req.body.action=="sendmsg")
    {

        if(code==req.body.numverify){

            
            res.render("emailcenter");
        }
        else{
            res.render("emailcenter");
        }
    }else if(req.body.action=="emailverify"){
        console.log("email : "+req.body.email)
        console.log("pass word : "+req.body.passwd)
    }
    /* var params = {
        'originator': 'TestMessage',
        'recipients': [
          "+2"+req.body.mobile
      ],
        'body': 'verification number for social contacts is :'+verinumber
      };
      messagebird.messages.create(params, function (err, response) {
        if (err) {
          return console.log(err);
        }
        console.log(response);
      }); */

})
let port=process.env.PORT;
if(port==null||port==""){
    port=3000;
}
app.listen(port,function(){
    console.log("server has started successfuly");
});