
const express = require('express');
const request = require('request');
const app=express();
const bodyparser = require('body-parser');


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function (req,res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function (req,res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };

  var jsonData=JSON.stringify(data);


  var option={
    url:"https://us10.api.mailchimp.com/3.0/lists/4695f6812b",
    method:"post",
    headers:{
      Authorization:"vaibhav 7d18163b31b272b1c3028bcfb55da4a9-us10"
    },
    body:jsonData
  }
  request(option,function (err,response,body) {
    if (err) {
      res.sendFile(__dirname + "/failure.html");
    }else {
      if (response.statusCode===200) {
            res.sendFile(__dirname + "/sucess.html");
      }else {
                res.sendFile(__dirname + "/failure.html");
      }
    }
  });


});

  app.post("/failure",function (req,res) {
  res.redirect("/");
  });










app.listen(process.env.PORT || 3000,function () {
  console.log("hi...server is running perfectly at port :3000");
});
