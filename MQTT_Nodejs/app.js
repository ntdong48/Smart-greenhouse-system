const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer')

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


var fs = require('fs');
var url = require('url');
var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');


//upload firmware cho esp
function requestHandler(req, res) {
  var uriData = url.parse(req.url);
  var pathname = uriData.pathname; // /firmware.bin
  if (pathname == '/upload/firmware.bin') {
      var ver = req.headers['x-esp8266-version'];
      console.log('Client req update, version ', ver);
      if (ver == '1.0') {
          console.log('Send firmware 2.0 to client');
          fs.readFile('./esp8266-firmware-2.0.bin', function(error, content) {
              res.writeHead(200, {
                  'Content-Type': 'binary/octet-stream',
                  'Content-Length': Buffer.byteLength(content),
                  'x-MD5': crypto.createHash('md5').update(content).digest("hex")
              });
              res.end(content);
          });
      } else {
          res.statusCode = 304;
          res.end();
      }
  }
  if (pathname == '/upload/firmware32.bin') {
    var ver = req.headers['x-esp32-version'];
    console.log('Client req update, version ', ver);
    if (ver == '1.0') {
        console.log('Send firmware 2.0 to client');
        fs.readFile('./Blink.bin', function(error, content) {
            res.writeHead(200, {
                'Content-Type': 'binary/octet-stream',
                'Content-Length': Buffer.byteLength(content),
                'x-MD5': crypto.createHash('md5').update(content).digest("hex")
            });
            res.end(content);
        });
    } else {
        res.statusCode = 304;
        res.end();
    }
}
}
//khoi tao server upload firmware
var server = http.createServer(requestHandler);
server.listen(3001);
console.log('Server listening on port 3001');

var upload = multer({ dest: 'uploads/' })
app.post('/profile', upload.single('avatar'), function (req, res, next) {

})


// var storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null, './upload')
//   },
//   filename: function(req,file,cb){
//     cb(null,file.originalname)
//   }
// })

// var upload = multer({storage:storage})
// app.post('', upload.single('file'), (req, res) => {
//   console.log(req.file);
//   res.redirect('')
 
// })

// var storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null, './upload')
//   },
//   __filename: function(req,file,cb){
//     cb(null,file.originalname)
//   }
// })


//upload file bin vao thu muc de update firmware 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

var upload = multer({storage:storage})
app.post('', upload.single('file'), (req, res) => {
   //console.log(req.file);
   //console.log(req);
  // uploadf = req.body.uploadf;
  //  console.log(req.body.uploadf)
  res.redirect('')// upload t
  res.end();
})

//mysql
var mysql = require('mysql');
const { request } = require('express');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbMQTT",
  multipleStatements:true
});

app.post('/api', (req,res ) => {
  var x = new Date()
  var Temp = parseFloat(req.body.gautemp);
  var Hum = parseFloat(req.body.gauhum);
  var Soi = parseFloat(req.body.gausoi);
  var Light = parseFloat(req.body.gaulight);
  var newDate = x.getFullYear()+"-"+(x.getMonth()+1)+"-"+ x.getDate();
  var newTime = x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();
  var sql = "INSERT INTO Sensor (Temp, Hum, Soi, Light, Date, Time) VALUES ('"+Temp+"', '"+Hum+"','"+Soi+"', '"+Light+"', '"+newDate+"','"+newTime+"')";
  con.query(sql, function (err, result){});
  con.commit()
//  console.log(req.body);
  res.send('abc')  
  res.end()   
});






app.post('/api/temp', (req,res ) => {
  var x = new Date()
  var Temp = parseFloat(req.body.gautemp);
  var newDate = x.getFullYear()+"-"+(x.getMonth()+1)+"-"+ x.getDate();
  var newTime = x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();
  var sql = "INSERT INTO SensorTemp (Temp, Date, Time) VALUES ('"+Temp+"', '"+newDate+"','"+newTime+"')";
  con.query(sql, function (err, result){});
  con.commit()
  // console.log(req.body);
  res.send('abc')  
  res.end()   
});


app.post('/api/hum', (req,res ) => {
  var x = new Date()
  var Hum = parseFloat(req.body.gauhum);
  var newDate = x.getFullYear()+"-"+(x.getMonth()+1)+"-"+ x.getDate();
  var newTime = x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();
  var sql = "INSERT INTO SensorHum (Hum, Date, Time) VALUES ('"+Hum+"', '"+newDate+"','"+newTime+"')";
  con.query(sql, function (err, result){});
  con.commit()
  // console.log(req.body);
  res.send('abc')  
  res.end()   
});

app.post('/api/soi', (req,res ) => {
  var x = new Date()
  var Soi = parseFloat(req.body.gausoi);
  var newDate = x.getFullYear()+"-"+(x.getMonth()+1)+"-"+ x.getDate();
  var newTime = x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();
  var sql = "INSERT INTO SensorSoi (Soi, Date, Time) VALUES ('"+Soi+"', '"+newDate+"','"+newTime+"')";
  con.query(sql, function (err, result){});
  con.commit()
  // console.log(req.body);
  res.send('abc')  
  res.end()   
});


app.post('/api/light', (req,res ) => {
  var x = new Date()
  var Light = parseFloat(req.body.gaulight);
  var newDate = x.getFullYear()+"-"+(x.getMonth()+1)+"-"+ x.getDate();
  var newTime = x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();
  var sql = "INSERT INTO SensorLight (Light, Date, Time) VALUES ('"+Light+"', '"+newDate+"','"+newTime+"')";
  con.query(sql, function (err, result){});
  con.commit()
  // console.log(req.body);
  res.send('abc')  
  res.end()   
});



app.post('/api/rain', (req,res ) => {
  var x = new Date()
  var Rain = parseFloat(req.body.gaurain);
  var newDate = x.getFullYear()+"-"+(x.getMonth()+1)+"-"+ x.getDate();
  var newTime = x.getHours()+":"+x.getMinutes()+":"+x.getSeconds();
  var sql = "INSERT INTO SensorRain (Rain, Date, Time) VALUES ('"+Rain+"', '"+newDate+"','"+newTime+"')";
  con.query(sql, function (err, result){});
  con.commit()
  // console.log(req.body);
  res.send('abc')  
  res.end()   
});




// app.get('/api/Max/Tempa', (req, res) => {
//   con.query("SELECT * FROM Sensor ", function (err, result, fields){
//     if (err) throw err;
//     res.json({result});
//    });  
// });

//Temp
app.get('/api/Max/Temp', (req, res) => {
  con.query("SELECT Temp, Time, Date FROM `SensorTemp` WHERE Date = CURDATE() AND Temp = (SELECT MAX(Temp) FROM SensorTemp WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});
app.get('/api/Min/Temp', (req, res) => {
  con.query("SELECT Temp, Time FROM `SensorTemp` WHERE Date = CURDATE() AND Temp = (SELECT MIN(Temp) FROM SensorTemp WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});
app.get('/api/Avg/Temp', (req, res) => {
  con.query("SELECT AVG(Temp) FROM SensorTemp WHERE Date = CURDATE() ", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});
//Hum
app.get('/api/Max/Hum', (req, res) => {
  con.query("SELECT Hum, Time, Date FROM `SensorHum` WHERE Date = CURDATE() AND Hum = (SELECT MAX(Hum) FROM SensorHum WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});
app.get('/api/Min/Hum', (req, res) => {
  con.query("SELECT Hum, Time FROM `SensorHum` WHERE Date = CURDATE() AND Hum = (SELECT MIN(Hum) FROM SensorHum WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});
app.get('/api/Avg/Hum', (req, res) => {
  con.query("SELECT AVG(Hum) FROM SensorHum WHERE Date = CURDATE() ", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});

//Soi
app.get('/api/Max/Soi', (req, res) => {
  con.query("SELECT Soi, Time, Date FROM `SensorSoi` WHERE Date = CURDATE() AND Soi = (SELECT MAX(Soi) FROM SensorSoi WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
//    console.log(result[0]["Soi"]);
   });  
});
app.get('/api/Min/Soi', (req, res) => {
  con.query("SELECT Soi, Time FROM `SensorSoi` WHERE Date = CURDATE() AND Soi = (SELECT MIN(Soi) FROM SensorSoi WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});
app.get('/api/Avg/Soi', (req, res) => {
  con.query("SELECT AVG(Soi) FROM SensorSoi WHERE Date = CURDATE() ", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});

app.get('/api/Max/Light', (req, res) => {
  con.query("SELECT Light, Time, Date FROM `SensorLight` WHERE Date = CURDATE() AND Light = (SELECT MAX(Light) FROM SensorLight WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
//    console.log(result[0]["Soi"]);
   });  
});

app.get('/api/Min/Light', (req, res) => {
  con.query("SELECT Light, Time FROM `SensorLight` WHERE Date = CURDATE() AND Light = (SELECT MIN(Light) FROM SensorLight WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
//    console.log(result[0]["Soi"]);
   });  
});

app.get('/api/Avg/Light', (req, res) => {
  con.query("SELECT AVG(Light) FROM SensorLight WHERE Date = CURDATE() ", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});


// //Light
// app.get('/api/Max/Light', (req, res) => {
//   con.query("SELECT Light, Time FROM Sensor WHERE Date = CURDATE() AND Light = (SELECT MAX(Light) FROM Sensor WHERE Date = CURDATE())", function (err, result, fields){
//     if (err) throw err;
//     res.json({result});
//    });  
// });
// app.get('/api/Min/Light', (req, res) => {
//   con.query("SELECT Light, Time FROM Sensor WHERE Date = CURDATE() AND Light = (SELECT MIN(Light) FROM Sensor WHERE Date = CURDATE())", function (err, result, fields){
//     if (err) throw err;
//     res.json({result});
//    });  
// });

app.get('/api/Max/Rain', (req, res) => {
  con.query("SELECT Rain, Time, Date FROM `SensorRain` WHERE Date = CURDATE() AND Rain = (SELECT MAX(Rain) FROM SensorRain WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
//    console.log(result[0]["Soi"]);
   });  
});

app.get('/api/Min/Rain', (req, res) => {
  con.query("SELECT Rain, Time FROM `SensorRain` WHERE Date = CURDATE() AND Rain = (SELECT MIN(Rain) FROM SensorRain WHERE Date = CURDATE())", function (err, result, fields){
    if (err) throw err;
    res.json({result});
//    console.log(result[0]["Soi"]);
   });  
});


app.get('/api/Avg/Rain', (req, res) => {
  con.query("SELECT AVG(Rain) FROM SensorRain WHERE Date = CURDATE() ", function (err, result, fields){
    if (err) throw err;
    res.json({result});
   });  
});




//chon ngay 
var valueDate;
app.post('/api/Date', (req,res ) => {
  valueDate = req.body.x;
  // console.log(valueDate);
  dataDayTemp();
  dataDayHum();
  dataDaySoi();
  dataDayLight();
  dataDayRain();
  res.send('abc')  
  res.end()   
});

app.get('/api/statisticsByDay/Temp2', (req, res)=>{
  let sql = "SELECT * FROM SensorTemp WHERE Date = CURDATE();SELECT MAX(Temp) FROM SensorTemp WHERE Date = CURDATE();SELECT MIN(Temp) FROM SensorTemp WHERE Date = CURDATE();SELECT COUNT(Temp) FROM SensorTemp WHERE Date = CURDATE() AND Temp>32;SELECT COUNT(Temp) FROM SensorTemp WHERE Date = CURDATE() AND Temp<18;SELECT COUNT(Temp) FROM SensorTemp WHERE Date = CURDATE() AND Temp BETWEEN 18 AND 32;SELECT AVG(Temp) FROM SensorTemp WHERE Date = CURDATE()";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
// SELECT MAX(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"'SELECT MIN(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp>32 FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp<12 FROM SensorTemp WHERE Date = '"+valueDate+"'";
function dataDayTemp(){
app.get('/api/statisticsByDay/Temp', (req, res)=>{
  let sql = "SELECT * FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT MAX(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT MIN(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT COUNT(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"' AND Temp>32;SELECT COUNT(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"' AND Temp<18;SELECT COUNT(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"' AND Temp BETWEEN 18 AND 32;SELECT AVG(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}

// do am
app.get('/api/statisticsByDay/Hum2', (req, res)=>{
  let sql = "SELECT * FROM SensorHum WHERE Date = CURDATE();SELECT MAX(Hum) FROM SensorHum WHERE Date = CURDATE();SELECT MIN(Hum) FROM SensorHum WHERE Date = CURDATE();SELECT COUNT(Hum) FROM SensorHum WHERE Date = CURDATE() AND Hum>90;SELECT COUNT(Hum) FROM SensorHum WHERE Date = CURDATE() AND Hum<70;SELECT COUNT(Hum) FROM SensorHum WHERE Date = CURDATE() AND Hum BETWEEN 70 AND 90;SELECT AVG(Hum) FROM SensorHum WHERE Date = CURDATE()";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
// SELECT MAX(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"'SELECT MIN(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp>32 FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp<12 FROM SensorTemp WHERE Date = '"+valueDate+"'";
function dataDayHum(){
app.get('/api/statisticsByDay/Hum', (req, res)=>{
  let sql = "SELECT * FROM SensorHum WHERE Date = '"+valueDate+"';SELECT MAX(Hum) FROM SensorHum WHERE Date = '"+valueDate+"';SELECT MIN(Hum) FROM SensorHum WHERE Date = '"+valueDate+"';SELECT COUNT(Hum) FROM SensorHum WHERE Date = '"+valueDate+"' AND Hum>90;SELECT COUNT(Hum) FROM SensorHum WHERE Date = '"+valueDate+"' AND Hum<70;SELECT COUNT(Hum) FROM SensorHum WHERE Date = '"+valueDate+"' AND Hum BETWEEN 70 AND 90;SELECT AVG(Hum) FROM SensorHum WHERE Date = '"+valueDate+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}
// do am dat
app.get('/api/statisticsByDay/Soi2', (req, res)=>{
  let sql = "SELECT * FROM SensorSoi WHERE Date = CURDATE();SELECT MAX(Soi) FROM SensorSoi WHERE Date = CURDATE();SELECT MIN(Soi) FROM SensorSoi WHERE Date = CURDATE();SELECT COUNT(Soi) FROM SensorSoi WHERE Date = CURDATE() AND Soi>88;SELECT COUNT(Soi) FROM SensorSoi WHERE Date = CURDATE() AND Soi<66;SELECT COUNT(Soi) FROM SensorSoi WHERE Date = CURDATE() AND Soi BETWEEN 66 AND 88;SELECT AVG(Soi) FROM SensorSoi WHERE Date = CURDATE()";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
// SELECT MAX(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"'SELECT MIN(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp>32 FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp<12 FROM SensorTemp WHERE Date = '"+valueDate+"'";
function dataDaySoi(){
app.get('/api/statisticsByDay/Soi', (req, res)=>{
  let sql = "SELECT * FROM SensorSoi WHERE Date = '"+valueDate+"';SELECT MAX(Soi) FROM SensorSoi WHERE Date = '"+valueDate+"';SELECT MIN(Soi) FROM SensorSoi WHERE Date = '"+valueDate+"';SELECT COUNT(Soi) FROM SensorSoi WHERE Date = '"+valueDate+"' AND Soi>88;SELECT COUNT(Soi) FROM SensorSoi WHERE Date = '"+valueDate+"' AND Soi<66;SELECT COUNT(Soi) FROM SensorSoi WHERE Date = '"+valueDate+"' AND Soi BETWEEN 66 AND 88;SELECT AVG(Soi) FROM SensorSoi WHERE Date = '"+valueDate+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}
//anh sang
app.get('/api/statisticsByDay/Light2', (req, res)=>{
  let sql = "SELECT * FROM SensorLight WHERE Date = CURDATE();SELECT MAX(Light) FROM SensorLight WHERE Date = CURDATE();SELECT MIN(Light) FROM SensorLight WHERE Date = CURDATE();SELECT COUNT(Light) FROM SensorLight WHERE Date = CURDATE() AND Light>75;SELECT COUNT(Light) FROM SensorLight WHERE Date = CURDATE() AND Light<30;SELECT COUNT(Light) FROM SensorLight WHERE Date = CURDATE() AND Light BETWEEN 30 AND 75;SELECT AVG(Light) FROM SensorLight WHERE Date = CURDATE()";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
// SELECT MAX(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"'SELECT MIN(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp>32 FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp<12 FROM SensorTemp WHERE Date = '"+valueDate+"'";
function dataDayLight(){
app.get('/api/statisticsByDay/Light', (req, res)=>{
  let sql = "SELECT * FROM SensorLight WHERE Date = '"+valueDate+"';SELECT MAX(Light) FROM SensorLight WHERE Date = '"+valueDate+"';SELECT MIN(Light) FROM SensorLight WHERE Date = '"+valueDate+"';SELECT COUNT(Light) FROM SensorLight WHERE Date = '"+valueDate+"' AND Light>75;SELECT COUNT(Light) FROM SensorLight WHERE Date = '"+valueDate+"' AND Light<30;SELECT COUNT(Light) FROM SensorLight WHERE Date = '"+valueDate+"' AND Light BETWEEN 30 AND 75;SELECT AVG(Light) FROM SensorLight WHERE Date = '"+valueDate+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}




app.get('/api/statisticsByDay/Rain2', (req, res)=>{
  let sql = "SELECT * FROM SensorRain WHERE Date = CURDATE();SELECT MAX(Rain) FROM SensorRain WHERE Date = CURDATE();SELECT MIN(Rain) FROM SensorRain WHERE Date = CURDATE();SELECT COUNT(Rain) FROM SensorRain WHERE Date = CURDATE() AND Rain>80;SELECT COUNT(Rain) FROM SensorRain WHERE Date = CURDATE() AND Rain<20;SELECT COUNT(Rain) FROM SensorRain WHERE Date = CURDATE() AND Rain BETWEEN 20 AND 80;SELECT AVG(Rain) FROM SensorRain WHERE Date = CURDATE()";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
// SELECT MAX(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"'SELECT MIN(Temp) FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp>32 FROM SensorTemp WHERE Date = '"+valueDate+"';SELECT Temp<12 FROM SensorTemp WHERE Date = '"+valueDate+"'";
function dataDayRain(){
app.get('/api/statisticsByDay/Rain', (req, res)=>{
  let sql = "SELECT * FROM SensorRain WHERE Date = '"+valueDate+"';SELECT MAX(Rain) FROM SensorRain WHERE Date = '"+valueDate+"';SELECT MIN(Rain) FROM SensorRain WHERE Date = '"+valueDate+"';SELECT COUNT(Rain) FROM SensorRain WHERE Date = '"+valueDate+"' AND Rain>80;SELECT COUNT(Rain) FROM SensorRain WHERE Date = '"+valueDate+"' AND Rain<20;SELECT COUNT(Rain) FROM SensorRain WHERE Date = '"+valueDate+"' AND Rain BETWEEN 20 AND 80;SELECT AVG(Rain) FROM SensorRain WHERE Date = '"+valueDate+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}



























//chon nam 
var startDateValue;
var endDateValue;
app.post('/api/Date2', (req,res ) => {
  startDateValue = req.body.y;
  endDateValue = req.body.z;
  // console.log(startDateValue);
  // console.log(endDateValue);
  dataDate2Temp();
  dataDate2Hum();
  dataDate2Soi();
  dataDate2Light();
  dataDate2Rain();
  res.send('abc')  
  res.end()   
});



function dataDate2Temp(){
app.get('/api/statisticsByDate2/Temp', (req, res)=>{
  let sql = "SELECT * FROM SensorTemp WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MAX(Temp) FROM SensorTemp WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MIN(Temp) FROM SensorTemp WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT COUNT(Temp) FROM SensorTemp WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Temp>32;SELECT COUNT(Temp) FROM SensorTemp WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Temp<18;SELECT COUNT(Temp) FROM SensorTemp WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Temp BETWEEN 18 AND 32;SELECT AVG(Temp) FROM SensorTemp WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
    // console.log(result)
  });
})
}



function dataDate2Hum(){
app.get('/api/statisticsByDate2/Hum', (req, res)=>{
  let sql = "SELECT * FROM SensorHum WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MAX(Hum) FROM SensorHum WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MIN(Hum) FROM SensorHum WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT COUNT(Hum) FROM SensorHum WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Hum>90;SELECT COUNT(Hum) FROM SensorHum WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Hum<70;SELECT COUNT(Hum) FROM SensorHum WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Hum BETWEEN 70 AND 90;SELECT AVG(Hum) FROM SensorHum WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}

// do am dat
function dataDate2Soi(){
app.get('/api/statisticsByDate2/Soi', (req, res)=>{
  let sql = "SELECT * FROM SensorSoi WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MAX(Soi) FROM SensorSoi WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MIN(Soi) FROM SensorSoi WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT COUNT(Soi) FROM SensorSoi WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Soi>88;SELECT COUNT(Soi) FROM SensorSoi WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Soi<66;SELECT COUNT(Soi) FROM SensorSoi WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Soi BETWEEN 66 AND 88;SELECT AVG(Soi) FROM SensorSoi WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}


//anh sang
function dataDate2Light(){
app.get('/api/statisticsByDate2/Light', (req, res)=>{
  let sql = "SELECT * FROM SensorLight WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MAX(Light) FROM SensorLight WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MIN(Light) FROM SensorLight WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT COUNT(Light) FROM SensorLight WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Light>75;SELECT COUNT(Light) FROM SensorLight WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Light<30;SELECT COUNT(Light) FROM SensorLight WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Light BETWEEN 30 AND 75;SELECT AVG(Light) FROM SensorLight WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"'";
  con.query(sql, (err, result, fields)=>{
    if (err) throw err;
    res.json(result);
  });
})
}



///luong mua
function dataDate2Rain(){
  app.get('/api/statisticsByDate2/Rain', (req, res)=>{
    let sql = "SELECT * FROM SensorRain WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MAX(Rain) FROM SensorRain WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT MIN(Rain) FROM SensorRain WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"';SELECT COUNT(Rain) FROM SensorRain WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Rain>80;SELECT COUNT(Rain) FROM SensorRain WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Rain<20;SELECT COUNT(Rain) FROM SensorRain WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"' AND Rain BETWEEN 20 AND 80;SELECT AVG(Rain) FROM SensorRain WHERE Date >= '"+startDateValue+"' AND Date <= '"+endDateValue+"'";
    con.query(sql, (err, result, fields)=>{
      if (err) throw err;
      res.json(result);
    });
  })
  }




  app.get('/api/Update/Chart', (req, res)=>{
    let sql = "SELECT Temp FROM SensorTemp WHERE Date = CURDATE();SELECT Time FROM SensorTemp WHERE Date = CURDATE()";
    con.query(sql, (err, result, fields)=>{
      if (err) throw err;
      res.json(result);
    });
  })

















con.connect(function(err) {
  var  x = new Date();
  var newDate = x.getFullYear()+"-"+x.getYear()+1+"-"+ x.getDate();
  if (err) throw err;
  console.log("Connected!");
});

