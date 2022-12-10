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

   function timeFormatter (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }



module.exports = {
dateFormatter: dateFormatter,
timeFormatter: timeFormatter
}
