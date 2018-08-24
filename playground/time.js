const moment = require('moment');
//Jan 1st 1970 00:00:10 am

// let timestamp = new Date().getTime();
// console.log(timestamp);

//ES5/ES6 date creation , a little tricky
// let date = new Date();
// console.log(date.getMonth());
// console.log(date.getDay());

// momentJS date creation more easy
let date = moment();
console.log(date.format('LLLL'));
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('LT'));