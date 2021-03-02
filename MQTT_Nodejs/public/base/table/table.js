
  getDataTable();
  async function getDataTable() {
    const response = await fetch('/api/Max/Temp');
    const data = await response.json();
    console.log(data);
//    document.getElementById('showAvgTemp').innerHTML = getData;
  }

