var x;
function myFunction() {
  x = document.getElementById("myDate").value;
  console.log(x)
  heyDataSoi();
  loadDataTableTemp();
  loadDataTableHum();
  loadDataTableSoi();
  loadDataTableLight();
  loadDataTableRain();
}

function heyDataSoi() {
  let dataDate = { x };
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataDate)
  };
  fetch('/api/Month', options);
}





var max32;
var min12;
var minmax1232;
function loadDataTableTemp() {
  getDataTemp();
  async function getDataTemp() {
    const response = await fetch('/api/statisticsByMonth/Temp');
    const data = await response.json();

    rs = data[0];
    oke = rs.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Temp}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
    document.getElementById("result").innerHTML = oke;
    max32 = data[3][0]['SUM(Temp)'];
    min12 = data[4][0]['SUM(Temp)'];
    minmax1232 = data[5][0]['SUM(Temp)'];
    document.getElementById("showMaxTemp").innerHTML = data[1][0]['MAX(Temp)'];
    document.getElementById("showMinTemp").innerHTML = data[2][0]['MIN(Temp)'];
    document.getElementById("showAvgTemp").innerHTML = data[6][0]['AVG(Temp)'].toFixed(1);
    console.log(minmax1232)
    chartPieTemp();
    // document.getElementById("result1").innerHTML = JSON.stringify(rs);
    //  document.getElementById('showAvgTemp').innerHTML = getData;
  }
}

getDataTemp1();
async function getDataTemp1() {
  const response = await fetch('/api/statisticsByMonth/Temp2');
  const data = await response.json();
  rss = data[0];
  oke1 = rss.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Temp}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
  document.getElementById("result").innerHTML = oke1;
  max32 = data[3][0]['SUM(Temp)'];
  min12 = data[4][0]['SUM(Temp)'];
  minmax1232 = data[5][0]['SUM(Temp)'];
  document.getElementById("showMaxTemp").innerHTML = data[1][0]['MAX(Temp)'];
  document.getElementById("showMinTemp").innerHTML = data[2][0]['MIN(Temp)'];
  document.getElementById("showAvgTemp").innerHTML = data[6][0]['AVG(Temp)'].toFixed(1);
  chartPieTemp();
  // document.getElementById("result1").innerHTML = JSON.stringify(rs);
  //  document.getElementById('showAvgTemp').innerHTML = getData;
}

function chartPieTemp() {
  new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Bé hơn 18", "Lớn hơn 32", "Trong khoảng 18 đền 32"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3cba9f", "#e8c3b9", "#c45850"],
        data: [min12, max32, minmax1232]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Biểu đồ nhiệt độ'
      }
    }
  });
}


// do am
var max90;
var min70;
var minmax7090;
function loadDataTableHum() {
  getDataHum();
  async function getDataHum() {
    const response = await fetch('/api/statisticsByMonth/Hum');
    const data = await response.json();

    rs = data[0];
    oke = rs.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Hum}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
    document.getElementById("resultHum").innerHTML = oke;
    max90 = data[3][0]['SUM(Hum)'];
    min70 = data[4][0]['SUM(Hum)'];
    minmax7090 = data[5][0]['SUM(Hum)'];
    document.getElementById("showMaxHum").innerHTML = data[1][0]['MAX(Hum)'];
    document.getElementById("showMinHum").innerHTML = data[2][0]['MIN(Hum)'];
    document.getElementById("showAvgHum").innerHTML = data[6][0]['AVG(Hum)'].toFixed(1);
    chartPieHum();
    // document.getElementById("result1").innerHTML = JSON.stringify(rs);
    //  document.getElementById('showAvgHum').innerHTML = getData;
  }
}

getDataHum1();
async function getDataHum1() {
  const response = await fetch('/api/statisticsByMonth/Hum2');
  const data = await response.json();
  rss = data[0];
  oke1 = rss.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Hum}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
  document.getElementById("resultHum").innerHTML = oke1;
  max90 = data[3][0]['SUM(Hum)'];
  min70 = data[4][0]['SUM(Hum)'];
  minmax7090 = data[5][0]['SUM(Hum)'];
  document.getElementById("showMaxHum").innerHTML = data[1][0]['MAX(Hum)'];
  document.getElementById("showMinHum").innerHTML = data[2][0]['MIN(Hum)'];
  document.getElementById("showAvgHum").innerHTML = data[6][0]['AVG(Hum)'].toFixed(1);
  chartPieHum();
  console.log(data)
  // document.getElementById("result1").innerHTML = JSON.stringify(rs);
  //  document.getElementById('showAvgHum').innerHTML = getData;
}

function chartPieHum() {
  new Chart(document.getElementById("pie-chartHum"), {
    type: 'pie',
    data: {
      labels: ["Bé hơn 70", "Lớn hơn 90", "Trong khoảng 70 đền 90"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3cba9f", "#e8c3b9", "#c45850"],
        data: [min70, max90, minmax7090]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Biểu đồ độ ẩm'
      }
    }
  });
}
//do am dat
var max88;
var min66;
var minmax6688;
function loadDataTableSoi() {
  getDataSoi();
  async function getDataSoi() {
    const response = await fetch('/api/statisticsByMonth/Soi');
    const data = await response.json();

    rs = data[0];
    oke = rs.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Soi}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
    document.getElementById("resultSoi").innerHTML = oke;
    max88 = data[3][0]['SUM(Soi)'];
    min66 = data[4][0]['SUM(Soi)'];
    minmax6688 = data[5][0]['SUM(Soi)'];
    document.getElementById("showMaxSoi").innerHTML = data[1][0]['MAX(Soi)'];
    document.getElementById("showMinSoi").innerHTML = data[2][0]['MIN(Soi)'];
    document.getElementById("showAvgSoi").innerHTML = data[6][0]['AVG(Soi)'].toFixed(1);
    chartPieSoi();
    // document.getElementById("result1").innerHTML = JSON.stringify(rs);
    //  document.getElementById('showAvgSoi').innerHTML = getData;
  }
}

getDataSoi1();
async function getDataSoi1() {
  const response = await fetch('/api/statisticsByMonth/Soi2');
  const data = await response.json();
  rss = data[0];
  oke1 = rss.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Soi}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
  document.getElementById("resultSoi").innerHTML = oke1;
  max88 = data[3][0]['SUM(Soi)'];
  min66 = data[4][0]['SUM(Soi)'];
  minmax6688 = data[5][0]['SUM(Soi)'];
  document.getElementById("showMaxSoi").innerHTML = data[1][0]['MAX(Soi)'];
  document.getElementById("showMinSoi").innerHTML = data[2][0]['MIN(Soi)'];
  document.getElementById("showAvgSoi").innerHTML = data[6][0]['AVG(Soi)'].toFixed(1);
  chartPieSoi();
  console.log(data)
  // document.getElementById("result1").innerHTML = JSON.stringify(rs);
  //  document.getElementById('showAvgSoi').innerHTML = getData;
}

function chartPieSoi() {
  new Chart(document.getElementById("pie-chartSoi"), {
    type: 'pie',
    data: {
      labels: ["Bé hơn 70", "Lớn hơn 90", "Trong khoảng 70 đền 90"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3cba9f", "#e8c3b9", "#c45850"],
        data: [min66, max88, minmax6688]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Biểu đồ độ ẩm'
      }
    }
  });
}

// anh sang

var max75;
var min50;
var minmax5075;
function loadDataTableLight() {
  getDataLight();
  async function getDataLight() {
    const response = await fetch('/api/statisticsByMonth/Light');
    const data = await response.json();

    rs = data[0];
    oke = rs.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Light}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
    document.getElementById("resultLight").innerHTML = oke;
    max75 = data[3][0]['SUM(Light)'];
    min50 = data[4][0]['SUM(Light)'];
    minmax5075 = data[5][0]['SUM(Light)'];
    document.getElementById("showMaxLight").innerHTML = data[1][0]['MAX(Light)'];
    document.getElementById("showMinLight").innerHTML = data[2][0]['MIN(Light)'];
    document.getElementById("showAvgLight").innerHTML = data[6][0]['AVG(Light)'].toFixed(1);
    chartPieLight();
    // document.getElementById("result1").innerHTML = JSON.stringify(rs);
    //  document.getElementById('showAvgLight').innerHTML = getData;
  }
}

getDataLight1();
async function getDataLight1() {
  const response = await fetch('/api/statisticsByMonth/Light2');
  const data = await response.json();
  rss = data[0];
  oke1 = rss.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Light}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
  document.getElementById("resultLight").innerHTML = oke1;
  max75 = data[3][0]['SUM(Light)'];
  min50 = data[4][0]['SUM(Light)'];
  minmax5075 = data[5][0]['SUM(Light)'];
  document.getElementById("showMaxLight").innerHTML = data[1][0]['MAX(Light)'];
  document.getElementById("showMinLight").innerHTML = data[2][0]['MIN(Light)'];
  document.getElementById("showAvgLight").innerHTML = data[6][0]['AVG(Light)'].toFixed(1);
  chartPieLight();
  console.log(data)
  // document.getElementById("result1").innerHTML = JSON.stringify(rs);
  //  document.getElementById('showAvgLight').innerHTML = getData;
}

function chartPieLight() {
  new Chart(document.getElementById("pie-chartLight"), {
    type: 'pie',
    data: {
      labels: ["Bé hơn 70", "Lớn hơn 90", "Trong khoảng 70 đền 90"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3cba9f", "#e8c3b9", "#c45850"],
        data: [min50, max75, minmax5075]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Biểu đồ ánh sáng'
      }
    }
  });
}





var max80;
var min20;
var minmax2080;
function loadDataTableRain() {
  getDataRain();
  async function getDataRain() {
    const response = await fetch('/api/statisticsByMonth/Rain');
    const data = await response.json();

    rs = data[0];
    oke = rs.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Rain}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
    document.getElementById("resultRain").innerHTML = oke;
    max80 = data[3][0]['SUM(Rain)'];
    min20 = data[4][0]['SUM(Rain)'];
    minmax2080 = data[5][0]['SUM(Rain)'];
    document.getElementById("showMaxRain").innerHTML = data[1][0]['MAX(Rain)'];
    document.getElementById("showMinRain").innerHTML = data[2][0]['MIN(Rain)'];
    document.getElementById("showAvgRain").innerHTML = data[6][0]['AVG(Rain)'].toFixed(1);
    chartPieRain();
    // document.getElementById("result1").innerHTML = JSON.stringify(rs);
    //  document.getElementById('showAvgRain').innerHTML = getData;
  }
}

getDataRain1();
async function getDataRain1() {
  const response = await fetch('/api/statisticsByMonth/Rain2');
  const data = await response.json();
  rss = data[0];
  oke1 = rss.map((x) => `<tr>
            <th scope="row">${x.id}</th>
            <td>${x.Rain}</td>
            <td>${x.Date = formatDateTime(x.Date)}</td>
            <td>${x.Time}</td></tr>`).join('')
  document.getElementById("resultRain").innerHTML = oke1;
  max80 = data[3][0]['SUM(Rain)'];
  min20 = data[4][0]['SUM(Rain)'];
  minmax2080 = data[5][0]['SUM(Rain)'];
  document.getElementById("showMaxRain").innerHTML = data[1][0]['MAX(Rain)'];
  document.getElementById("showMinRain").innerHTML = data[2][0]['MIN(Rain)'];
  document.getElementById("showAvgRain").innerHTML = data[6][0]['AVG(Rain)'].toFixed(1);
  chartPieRain();
  console.log(data)
  // document.getElementById("result1").innerHTML = JSON.stringify(rs);
  //  document.getElementById('showAvgRain').innerHTML = getData;
}

function chartPieRain() {
  new Chart(document.getElementById("pie-chartRain"), {
    type: 'pie',
    data: {
      labels: ["Bé hơn 70", "Lớn hơn 90", "Trong khoảng 70 đền 90"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3cba9f", "#e8c3b9", "#c45850"],
        data: [min20, max80, minmax2080]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Biểu đồ lượng mưa'
      }
    }
  });
}