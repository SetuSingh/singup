const express = require("express");

const request = require("request");

const https = require("https");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/styles/"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "\\signup.html")
});
app.post("/failure",function(req,res){
    res.sendFile(__dirname + "\\signup.html")
})
app.post("/",function(req,res){
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var email = req.body.Emails;
    console.log(FirstName,LastName,email);
    const datas = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                }

            }
        ]
    }
    var jsonData = JSON.stringify(datas);

    url = "https://us5.api.mailchimp.com/3.0/lists/825b161900"
    
    const options = {
        method: "POST",
        auth: "Setu2020:b26249ae80160a4052c2536aae519ebb-us5"
    }
    
    const request = https.request(url, options, function(response){
        

        response.on("data",function(data){
            console.log(JSON.parse(data));
            if (JSON.parse(data).total_created == 1){
                res.sendFile(__dirname + "/success.html")
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            } 
        })
    })
    request.write(jsonData);
    request.end();

    
})



app.listen(process.env.PORT || 3002,function(){
    console.log("running superhot in 3002");
});

// b26249ae80160a4052c2536aae519ebb-us5"