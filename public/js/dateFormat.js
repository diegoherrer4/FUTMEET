function dateFormatter(date) {
    var day = new Date(date).getDate();
var month= new Date(date).getMonth() + 1;
var year = new Date(date).getFullYear();
  
    // show date and month in two digits
    // if month is less than 10, add a 0 before it
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
  
    // now we have day, month and year
    // use the separator to join them
    return month+ '/' + day + '/' + year;

   


}

module.exports = {
dateFormatter: dateFormatter
}
