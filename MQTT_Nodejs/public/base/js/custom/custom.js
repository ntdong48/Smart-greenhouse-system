function formatDateTime(datetime){
    datetime = String(datetime)
    day = ++(datetime.split('T')[0]).split("-")[2]
    month = (datetime.split('T')[0]).split("-")[1]
    year = (datetime.split('T')[0]).split("-")[0]
    time = day + "-" + month + "-" + year
    return time
  }