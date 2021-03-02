

// Khai bao MQTT
var WebSocket_MQTT_Broker_URL = "";
var MQTT_Client_ID = "";
var port = "";
var MQTT_Topic = "";
var MQTT_Client = "";

//Khai bao du lieu chart
var data = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];

// Cap nhat du lieu chart
var chartTemp;
var chartHum;
var chartSoi;
var chartLight;
var chartRain;

// Khai bao gia tri gauges khi duoc nhan
var gautemp;
var gauhum;
var gausoi;
var gaulight;
var gaurain;

var toDay;
var nowTime;
var d;






function heyData() {
  const dataSensor = { gaulight, gautemp, gauhum, gausoi, toDay, nowTime };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSensor)
  };
  fetch('/api', options);
}

function heyDataTemp() {
  let dataSensor = { gautemp, toDay, nowTime };
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSensor)
  };
  fetch('/api/temp', options);
}


function heyDataHum() {
  let dataSensor = { gauhum, toDay, nowTime };
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSensor)
  };
  fetch('/api/hum', options);
}


function heyDataSoi() {
  let dataSensor = { gausoi, toDay, nowTime };
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSensor)
  };
  fetch('/api/soi', options);
}


function heyDataLight() {
  let dataSensor = { gaulight, toDay, nowTime };
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSensor)
  };
  fetch('/api/light', options);
}


function heyDataRain() {
  let dataSensor = { gaurain, toDay, nowTime };
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSensor)
  };
  fetch('/api/rain', options);
}


function loadDataTemp() {
  getDataAvgTemp();
  async function getDataAvgTemp() {
    var getData;
    const response = await fetch('/api/Avg/Temp');
    const data = await response.json();
    getData = data.result[0]['AVG(Temp)'].toFixed(1);
    document.getElementById('showAvgTemp').innerHTML = getData;
  }
  getDataMinTemp();
  async function getDataMinTemp() {
    var getData;
    var getTime;
    const response = await fetch('/api/Min/Temp');
    const data = await response.json();
    getData = data.result[0]['Temp'];
    getTime = data.result[0]['Time']
    document.getElementById('showMinTemp').innerHTML = getData;
    document.getElementById('showMinTimeTemp').innerHTML = getTime;
  }
  getDataMaxTemp();
  async function getDataMaxTemp() {
    var getData;
    var getTime;
    const response = await fetch('/api/Max/Temp');
    const data = await response.json();
    getData = data.result[0]['Temp'];
    getTime = data.result[0]['Time']
    getDate = (data.result[0]['Date'])
    //Định dạng ngày giờ
    getDate = formatDateTime(getDate)

    document.getElementById('showMaxTemp').innerHTML = getData;
    document.getElementById('showMaxTimeTemp').innerHTML = getTime;
    document.getElementById('day').innerHTML = getDate;
  }
}
//load lại data tren trinh duyet
function loadDataHum() {
  getDataAvgHum();
  async function getDataAvgHum() {
    var getData;
    const response = await fetch('/api/Avg/Hum');
    const data = await response.json();
    getData = data.result[0]['AVG(Hum)'].toFixed(1);
    document.getElementById('showAvgHum').innerHTML = getData;
  }
  getDataMinHum();
  async function getDataMinHum() {
    var getData;
    var getTime;
    const response = await fetch('/api/Min/Hum');
    const data = await response.json();
    getData = data.result[0]['Hum'];
    getTime = data.result[0]['Time']
    document.getElementById('showMinHum').innerHTML = getData;
    document.getElementById('showMinTimeHum').innerHTML = getTime;
  }
  getDataMaxHum();
  async function getDataMaxHum() {
    var getData;
    var getTime;
    const response = await fetch('/api/Max/Hum');
    const data = await response.json();
    getData = data.result[0]['Hum'];
    getTime = data.result[0]['Time']
    getDate = data.result[0]['Date']
    getDate = formatDateTime(getDate)
    document.getElementById('showMaxHum').innerHTML = getData;
    document.getElementById('showMaxTimeHum').innerHTML = getTime;
    document.getElementById('day2').innerHTML = getDate;
  }
}

function loadDataSoi() {
  getDataAvgSoi();
  async function getDataAvgSoi() {
    var getData;
    const response = await fetch('/api/Avg/Soi');
    const data = await response.json();
    getData = data.result[0]['AVG(Soi)'].toFixed(1);
    document.getElementById('showAvgSoi').innerHTML = getData;
  }
  getDataMinSoi();
  async function getDataMinSoi() {
    var getData;
    var getTime;
    const response = await fetch('/api/Min/Soi');
    const data = await response.json();
    getData = data.result[0]['Soi'];
    getTime = data.result[0]['Time']

    document.getElementById('showMinSoi').innerHTML = getData;
    document.getElementById('showMinTimeSoi').innerHTML = getTime;


  }
  getDataMaxSoi();
  async function getDataMaxSoi() {
    var getData;
    var getTime;
    const response = await fetch('/api/Max/Soi');
    const data = await response.json();
    getData = data.result[0]['Soi'];
    getTime = data.result[0]['Time']
    getDate = data.result[0]['Date']
    getDate = formatDateTime(getDate)
    document.getElementById('showMaxSoi').innerHTML = getData;
    document.getElementById('showMaxTimeSoi').innerHTML = getTime;
    document.getElementById('day3').innerHTML = getDate;
  }
}

function loadDataLight() {
  getDataAvgLight();
  async function getDataAvgLight() {
    var getData;
    const response = await fetch('/api/Avg/Light');
    const data = await response.json();
    getData = data.result[0]['AVG(Light)'].toFixed(1);
    document.getElementById('showAvgLight').innerHTML = getData;
  }
  getDataMinLight();
  async function getDataMinLight() {
    var getData;
    var getTime;
    const response = await fetch('/api/Min/Light');
    const data = await response.json();
    getData = data.result[0]['Light'];
    getTime = data.result[0]['Time']
    document.getElementById('showMinLight').innerHTML = getData;
    document.getElementById('showMinTimeLight').innerHTML = getTime;
  }
  getDataMaxLight();
  async function getDataMaxLight() {
    var getData;
    var getTime;
    const response = await fetch('/api/Max/Light');
    const data = await response.json();
    getData = data.result[0]['Light'];
    getTime = data.result[0]['Time']
    getDate = data.result[0]['Date']
    getDate = formatDateTime(getDate)
    document.getElementById('showMaxLight').innerHTML = getData;
    document.getElementById('showMaxTimeLight').innerHTML = getTime;
    document.getElementById('day4').innerHTML = getDate;
  }
}




function loadDataRain() {
  getDataAvgRain();
  async function getDataAvgRain() {
    var getData;
    const response = await fetch('/api/Avg/Rain');
    const data = await response.json();
    getData = data.result[0]['AVG(Rain)'].toFixed(1);
    document.getElementById('showAvgRain').innerHTML = getData;
  }
  getDataMinRain();
  async function getDataMinRain() {
    var getData;
    var getTime;
    const response = await fetch('/api/Min/Rain');
    const data = await response.json();
    getData = data.result[0]['Rain'];
    getTime = data.result[0]['Time']
    document.getElementById('showMinRain').innerHTML = getData;
    document.getElementById('showMinTimeRain').innerHTML = getTime;
  }
  getDataMaxRain();
  async function getDataMaxRain() {
    var getData;
    var getTime;
    const response = await fetch('/api/Max/Rain');
    const data = await response.json();
    getData = data.result[0]['Rain'];
    getTime = data.result[0]['Time']
    getDate = data.result[0]['Date']
    getDate = formatDateTime(getDate)
    document.getElementById('showMaxRain').innerHTML = getData;
    document.getElementById('showMaxTimeRain').innerHTML = getTime;
    document.getElementById('day5').innerHTML = getDate;
  }
}
if (localStorage.getItem("connected") == "NTD") {
  WebSocket_MQTT_Broker_URL = localStorage.getItem("txt_MQTT_Broker_URL")
  MQTT_Client_ID = localStorage.getItem("txt_MQTT_Client_ID")
  port = localStorage.getItem("txt_port")

  // Tao Client ket noi den MQTT 
  MQTT_Client = new Paho.MQTT.Client(WebSocket_MQTT_Broker_URL, Number(port), MQTT_Client_ID);

  // Xu ly du lieu khi callback
  MQTT_Client.onConnectionLost = onConnectionLost;
  MQTT_Client.onMessageArrived = onMessageArrived;
  MQTT_Client.connect({ onSuccess: onConnect });

}
function mqtt_Connect_with_Broker() {
  localStorage.setItem("connected", "NTD");
  localStorage.setItem("txt_MQTT_Broker_URL", document.getElementById("txt_MQTT_Broker_URL").value);
  localStorage.setItem("txt_MQTT_Client_ID", document.getElementById("txt_MQTT_Client_ID").value);
  localStorage.setItem("txt_port", document.getElementById("txt_port").value);
  // Lay gia tri MQTT
  WebSocket_MQTT_Broker_URL = document.getElementById("txt_MQTT_Broker_URL").value;
  MQTT_Client_ID = document.getElementById("txt_MQTT_Client_ID").value;
  port = document.getElementById("txt_port").value;
  // Tao Client ket noi den MQTT 
  MQTT_Client = new Paho.MQTT.Client(WebSocket_MQTT_Broker_URL, Number(port), MQTT_Client_ID);
  // Xu ly du lieu khi callback
  MQTT_Client.onConnectionLost = onConnectionLost;
  MQTT_Client.onMessageArrived = onMessageArrived;
  MQTT_Client.connect({ onSuccess: onConnect });

}

// Dang ky Topic den MQTT
function mqtt_Subscribe_to_Topic() {
  MQTT_Subscribe_Topic = document.getElementById("txt_MQTT_Subscribe_Topic").value;
  MQTT_Client.subscribe(MQTT_Subscribe_Topic);
  Set_New_Console_Msg("Đăng ký MQTT với Topic: " + "\"" + MQTT_Subscribe_Topic + "\"");
}

// Gui mess den MQTT 
function mqtt_Publish_Message() {
  message = new Paho.MQTT.Message(document.getElementById("txt_MQTT_Msg").value);
  message.destinationName = document.getElementById("txt_MQTT_Publish_Topic").value;
  MQTT_Client.send(message);
  Set_New_Console_Msg("Đã gửi " + "\"" + document.getElementById("txt_MQTT_Msg").value + "\"" + " đến MQTT Topic: " + "\"" + document.getElementById("txt_MQTT_Publish_Topic").value + "\"");
}

// Xu ly khi co Clien khac ket noi den
function onConnect() {
  Set_New_Console_Msg("Đã kết nói với MQTT Broker: " + "\"" + document.getElementById("txt_MQTT_Broker_URL").value + "\"");
}

// xu ly khi mat ket noi
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    Set_New_Console_Msg("Connection Lost with MQTT Broker. Error: " + "\"" + responseObject.errorMessage + "\"");
  }
}

// Xu ly khi co tin nhan den
function onMessageArrived(message) {
  switch (message.destinationName) {
    case "garden/temperature":
      var x = new Date();
      var theTemp = Number(message.payloadString.replace(/^\D+/g, ''));
      data.push([x, theTemp]);
      data.shift();
      chartTemp.updateOptions({ 'file': data });//chart
      gautemp = theTemp; //gauges
      dbtemp = theTemp;
      // toDay = x.getFullYear() + "-" + x.getMonth() + "-" + x.getDate();
      // nowTime = x.getHours() + "-" + x.getMinutes + "-" + x.getSeconds();
      heyDataTemp();
      loadDataTemp();
      loadDataChartTemp();

      break;
    case "garden/humidity":
      var x = new Date();
      var thehum = Number(message.payloadString.replace(/^\D+/g, ''));
      data2.push([x, thehum]);
      data2.shift();
      chartHum.updateOptions({ 'file': data2 });
      gauhum = thehum;
      heyDataHum();
      loadDataHum();
      break;
    case "garden/soilmoisture":
      var x = new Date();
      var thesoi = Number(message.payloadString.replace(/^\D+/g, ''));
      data3.push([x, thesoi]);
      data3.shift();
      chartSoi.updateOptions({ 'file': data3 });
      gausoi = thesoi;
      heyDataSoi();
      loadDataSoi();
      break;
    case "garden/light":
      var x = new Date();
      var thelight = Number(message.payloadString.replace(/^\D+/g, ''));
      data4.push([x, thelight]);
      data4.shift();
      chartLight.updateOptions({ 'file': data4 });
      gaulight = thelight;
      heyDataLight();
      loadDataLight();
      break;
    case "garden/rain":
      var x = new Date();
      var therain = Number(message.payloadString.replace(/^\D+/g, ''));
      data5.push([x, therain]);
      data5.shift();
      chartRain.updateOptions({ 'file': data5 });
      gaurain = therain;
      heyDataRain();
      loadDataRain();
      break;
    case "garden/lamp":
      switch (message.payloadString) {
        case "off":
          document.getElementById('btnLamp').innerHTML = "Đèn Tắt";
          document.getElementById("btnLamp").classList.remove('btn-success');
          document.getElementById("btnLamp").classList.add('btn-danger');
          break;
        case "on":
          document.getElementById('btnLamp').innerHTML = "Đèn Bật";
          document.getElementById("btnLamp").classList.remove('btn-danger');
          document.getElementById("btnLamp").classList.add('btn-success');
          break;
      }
      break;
    case "garden/fan":
      switch (message.payloadString) {
        case "off":
          document.getElementById('btnFan').innerHTML = "Quạt Tắt";
          document.getElementById("btnFan").classList.remove('btn-success');
          document.getElementById("btnFan").classList.add('btn-danger');
          break;
        case "on":
          document.getElementById('btnFan').innerHTML = "Quạt Bật";
          document.getElementById("btnFan").classList.remove('btn-danger');
          document.getElementById("btnFan").classList.add('btn-success');
          break;
      }
      break;
    case "garden/pump":
      switch (message.payloadString) {
        case "off":
          document.getElementById('btnPump').innerHTML = "Bơm Tắt";
          document.getElementById("btnPump").classList.remove('btn-success');
          document.getElementById("btnPump").classList.add('btn-danger');
          break;
        case "on":

          document.getElementById('btnPump').innerHTML = "Bơm Bật";
          document.getElementById("btnPump").classList.remove('btn-danger');
          document.getElementById("btnPump").classList.add('btn-success');
          break;
      }
      break;
    case "garden/mode":
      switch (message.payloadString) {
        case "off":
          document.getElementById('btnMode').innerHTML = "Thủ Công";
          document.getElementById("btnMode").classList.remove('btn-success');
          document.getElementById("btnMode").classList.add('btn-danger');
          break;
        case "on":
          document.getElementById('btnMode').innerHTML = "Tự Động";
          document.getElementById("btnMode").classList.remove('btn-danger');
          document.getElementById("btnMode").classList.add('btn-success');
          break;
      }
    case "garden/temp/number":
      document.getElementById('nbTemp').innerHTML = message.payloadString;
      break;
    case "garden/soi/number":
      document.getElementById('nbSoi').innerHTML = message.payloadString;
      break;
    case "garden/lig/number":
      document.getElementById('nbLight').innerHTML = message.payloadString;
      break;
    case "garden/rain/number":
      document.getElementById('nbRain').innerHTML = message.payloadString;
      break;
    case "garden/timer/number":
      document.getElementById('nbTimer').innerHTML = message.payloadString;
      break;
    case "garden/motor":
      output.innerHTML = message.payloadString;
      slider.value = message.payloadString;
      break;

  }
  Set_New_Console_Msg("Đã nhận tin nhắn đến MQTT. " + " Message: " + "\"" + message.payloadString + "\"" + " MQTT Topic: " + "\"" + message.destinationName + "\"" + " QoS Value: " + "\"" + message.qos + "\"");
}
//chart 
$(document).ready(function () {
  var t = new Date();
  for (var i = 100; i >= 0; i--) {
    var x = new Date(t.getTime() - i * 1000);
    data.push([x, 0]);
    data2.push([x, 0]);
    data3.push([x, 0]);
    data4.push([x, 0]);
    data5.push([x, 0]);
  }

  chartTemp = new Dygraph(document.getElementById("div_g"), data, {
    drawPoints: true,
    showRoller: false,
    drawXAxis: true,
    labels: ['Time', 'Nhiệt Độ']
  });

  chartHum = new Dygraph(document.getElementById("div_g2"), data2, {
    drawPoints: true,
    showRoller: false,
    drawXAxis: true,
    labels: ['Time', 'Độ ẩm']
  });

  chartSoi = new Dygraph(document.getElementById("div_g3"), data3, {
    drawPoints: true,
    showRoller: false,
    drawXAxis: true,
    labels: ['Time', 'Độ ẩm Đất']
  });
  chartLight = new Dygraph(document.getElementById("div_g4"), data4, {
    drawPoints: true,
    showRoller: false,
    drawXAxis: true,
    labels: ['Time', 'Ánh Sáng']
  });
  chartRain = new Dygraph(document.getElementById("div_g5"), data5, {
    drawPoints: true,
    showRoller: false,
    drawXAxis: true,
    labels: ['Time', 'Lượng Mưa']
  });
}
);

$(document).ready(function () {
  document.getElementById("txt_MQTT_Broker_URL").value = localStorage.getItem("txt_MQTT_Broker_URL");
  document.getElementById("txt_port").value = localStorage.getItem("txt_port");
  gen_MQTT_Client_ID();
})

function Set_New_Console_Msg(text) {
  document.getElementById("txtAr_Console").value = document.getElementById("txtAr_Console").value + get_Fromatted_Time().toString() + ":  " + text + "\n";
  document.getElementById("txtAr_Console").scrollTop = document.getElementById("txtAr_Console").scrollHeight;
}
//Clear Console
function clear_Console() {
  document.getElementById("txtAr_Console").value = "";
}
// time
function get_Fromatted_Time() {
  var dt = new Date();
  var hours = dt.getHours() == 0 ? "12" : dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours();
  var minutes = (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
  var seconds = dt.getSeconds();
  var ampm = dt.getHours() < 12 ? "AM" : "PM";
  var formattedTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return formattedTime;
}

// Random so ID client
function gen_MQTT_Client_ID() {
  document.getElementById("txt_MQTT_Client_ID").value = Math.floor(100000000000 + Math.random() * 900000000000);
}
//gauge 
var g1, g2, g3, g4, g5;
window.onload = function () {
  var g1 = new JustGage({
    id: "g1",
    value: getRandomInt(0, 100),
    min: 0,
    max: 100,
    title: "Nhiệt Độ",
    label: "ºC"
  });
  var g2 = new JustGage({
    id: "g2",
    value: getRandomInt(0, 100),
    min: 0,
    max: 100,
    title: "Độ Ẩm",
    label: "%"
  });
  var g3 = new JustGage({
    id: "g3",
    value: getRandomInt(0, 100),
    min: 0,
    max: 100,
    title: "Độ Ẩm Đất",
    label: "%"
  });
  var g4 = new JustGage({
    id: "g4",
    value: getRandomInt(0, 100),
    min: 0,
    max: 100,
    title: "Ánh Sang",
    label: "%"
  });
  var g5 = new JustGage({
    id: "g5",
    value: getRandomInt(0, 100),
    min: 0,
    max: 100,
    title: "Lượng Mưa",
    label: "%"
  });
  setInterval(function () {
    g1.refresh(gautemp);
    g2.refresh(gauhum);
    g3.refresh(gausoi);
    g4.refresh(gaulight);
    g5.refresh(gaurain);
  })
  document.getElementById('btnLamp').addEventListener("click", Lampf);
  function Lampf() {
    var cell = document.getElementById("btnLamp");
    switch (cell.innerHTML) {
      case "Đèn Tắt":
        var message = new Paho.MQTT.Message("on");
        message.destinationName = "garden/lamp";
        MQTT_Client.send(message);
        break;
      case "Đèn Bật":
        var message = new Paho.MQTT.Message("off");
        message.destinationName = "garden/lamp";
        MQTT_Client.send(message);
        break;
    }
  }
  document.getElementById('btnFan').addEventListener("click", Fanf);
  function Fanf() {
    var cell = document.getElementById("btnFan");
    switch (cell.innerHTML) {
      case "Quạt Tắt":
        var message = new Paho.MQTT.Message("on");
        message.destinationName = "garden/fan";
        MQTT_Client.send(message);
        break;
      case "Quạt Bật":
        var message = new Paho.MQTT.Message("off");
        message.destinationName = "garden/fan";
        MQTT_Client.send(message);
        break;
    }
  }
  document.getElementById('btnPump').addEventListener("click", Pumpf);
  function Pumpf() {
    var cell = document.getElementById("btnPump");
    switch (cell.innerHTML) {
      case "Bơm Tắt":
        var message = new Paho.MQTT.Message("on");
        message.destinationName = "garden/pump";
        MQTT_Client.send(message);
        break;
      case "Bơm Bật":
        var message = new Paho.MQTT.Message("off");
        message.destinationName = "garden/pump";
        MQTT_Client.send(message);
        break;
    }
  }
  document.getElementById('btnMode').addEventListener("click", Modef);
  function Modef() {
    var cell = document.getElementById("btnMode");
    switch (cell.innerHTML) {
      case "Thủ Công":
        var message = new Paho.MQTT.Message("on");
        message.destinationName = "garden/mode";
        MQTT_Client.send(message);
        break;
      case "Tự Động":
        var message = new Paho.MQTT.Message("off");
        message.destinationName = "garden/mode";
        MQTT_Client.send(message);
        break;
    }
  }

}

//send data
function Send_temperature() {
  var message = new Paho.MQTT.Message(document.getElementById("txt_sensor_temperature").value);
  message.destinationName = "garden/temp/number";
  MQTT_Client.send(message);
  Set_New_Console_Msg("Send " + "\"" + document.getElementById("txt_sensor_temperature").value + "\"" + "to MQTT Topic: " + "\"" + message.destinationName + "\"");
}
function Send_humidity() {
  var message = new Paho.MQTT.Message(document.getElementById("txt_sensor_humidity").value);
  message.destinationName = "garden/hum/number";
  MQTT_Client.send(message);
  Set_New_Console_Msg("Send " + "\"" + document.getElementById("txt_sensor_humidity").value + "\"" + "to MQTT Topic: " + "\"" + message.destinationName + "\"");
}
function Send_soilmoisture() {
  var message = new Paho.MQTT.Message(document.getElementById("txt_sensor_soilmoisture").value);
  message.destinationName = "garden/soi/number";
  MQTT_Client.send(message);
  Set_New_Console_Msg("Send " + "\"" + document.getElementById("txt_sensor_soilmoisture").value + "\"" + "to MQTT Topic: " + "\"" + message.destinationName + "\"");
}
function Send_light() {
  var message = new Paho.MQTT.Message(document.getElementById("txt_sensor_light").value);
  message.destinationName = "garden/lig/number";
  MQTT_Client.send(message);
  Set_New_Console_Msg("Send " + "\"" + document.getElementById("txt_sensor_light").value + "\"" + "to MQTT Topic: " + "\"" + message.destinationName + "\"");
}

function Send_rain() {
  var message = new Paho.MQTT.Message(document.getElementById("txt_sensor_rain").value);
  message.destinationName = "garden/rain/number";
  MQTT_Client.send(message);
  Set_New_Console_Msg("Send " + "\"" + document.getElementById("txt_sensor_rain").value + "\"" + "to MQTT Topic: " + "\"" + message.destinationName + "\"");
}


function Send_timer() {
  var message = new Paho.MQTT.Message(document.getElementById("txt_timer").value);
  message.destinationName = "garden/timer/number";
  MQTT_Client.send(message);
  Set_New_Console_Msg("Send " + "\"" + document.getElementById("txt_timer").value + "\"" + "to MQTT Topic: " + "\"" + message.destinationName + "\"");
}





var charTemp
var timeTemp = []

function loadDataChartTemp() {
  getDataChartTemp();
  async function getDataChartTemp() {
    const response = await fetch('/api/Update/Chart');
    const data = await response.json();
    console.log(data[1].length)
  }
}





var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
  var message = new Paho.MQTT.Message(output.innerHTML);
  message.destinationName = "garden/motor";
  MQTT_Client.send(message);
}

