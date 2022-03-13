const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
var fileupload = require("express-fileupload");
app.use(fileupload());
app.use(express.static(__dirname+"/public"));
const multer = require( "multer" );
const filehandle=require(__dirname+"/fileinfo.js");
const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now+"--"+file.originalname)
    }
});
const upload=multer({storage:filestorage}).single("image");
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
/* email.save(function(err){
    if(err) throw err;
}); */
var messagebird = require('messagebird')("eRnirdlWRiwh0ZUsQdiOjs7bF")
app.get("/",function(req,res){
    res.render("regestration",{type:"index"});
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
    res.render("regestration",{type:"signUp"});
})
var code="";
var meassageboll="";
var selected_email='';
app.post("/",function(req,res)
{   
    if(req.body.action=="sign"){
        const verinumber=verifynumber();
        code=verinumber;
        res.render("regestration",{type:"numverify"});
    }else if(req.body.action=="sendmsg")
    {
        if(code==req.body.numverify){
            res.render("regestration",{type:"emailcenter"});
        }
        else{
            res.render("regestration",{type:"emailcenter"});
        }
    }else if(req.body.action=="emailverify"){
            const emailregex=/\w+.\w+@\w+(\.)\w+/g
            const passregex=/\w+.\w+/g
            const verified_email=req.body.email;
            const verified_pass=req.body.passwd;
            emails.find({email:verified_email},(err,resul)=>{
                if(err) throw err;
                else{
                    if(resul.length>0){
                        meassageboll="choose another one";
                    }
                    else{
                         const ok1 = emailregex.test(verified_email);
                         const ok2 = passregex.test(verified_pass);
                          if(verified_pass.length<9){
                            meassageboll="you should enter pass word conatains spcial charcters and the length greater than 9";
                          }
                          else{
                            if(ok1&&ok2){
                                meassageboll=true;
                              }
                              else{
                                  if(!ok1){
                                    meassageboll="the email doesn't follow the email structure";
                                  }else{
                                    meassageboll="the password doesn't follow the password structure";
                                  }
                              }
                          }
                    }
                }
            })
            if(meassageboll===true){
                res.render("regestration",{type:"imgprofile"})
            }
            else{
                res.render("regestration",{type:"imgprofile"})
            }
    }else if(req.body.action=="imgchosen"){
        res.render("home");
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