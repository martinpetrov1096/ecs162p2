/////////////////////////////////////////////////
///////////////////// Config ////////////////////
/////////////////////////////////////////////////
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(express.json());


/////////////////////////////////////////////////
//////////////////  Middleware //////////////////
/////////////////////////////////////////////////

/* Configure Multer for storing files */
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
let uploadMulter = multer({storage: storage});


/////////////////////////////////////////////////
////////////////////  Routing ///////////////////
/////////////////////////////////////////////////

/* Default Homepage */
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/display.html");
});

app.get("/creator", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get('/loadConfig', (request, response) => {
  response.sendFile(__dirname + '/public/postcardData.json');
});

/* HTTP Request for Image Upload */
app.post('/uploadImage', uploadMulter.single('newImage'), function (request, response) {
  console.log("Image Upload Request Received", request.file.originalname, request.file.size,"bytes")

  if (request.file) {
    response.end("Server Received "+request.file.originalname);
  } else {
    throw 'error';
  }
});

/* HTTP Request for Caption Upload */
app.post('/share', function(request, response) {
  const json = JSON.stringify(request.body);
  fs.writeFile('public/postcardData.json', json, err => {
    if (err) {
      console.error(err);
      return;
    }
  });

  response.send(JSON.stringify(request.body));
});

/////////////////////////////////////////////////
////////////////  Express Startup ///////////////
/////////////////////////////////////////////////
const listener = app.listen(8000, () => { /* TODO: Change back port to "process.env.PORT" */
  console.log("Your app is listening on port " + listener.address().port);
});
