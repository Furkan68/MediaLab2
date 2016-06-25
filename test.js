// test.js
var md = require('./Mdriver.js');

md.log();
md.forward();
setTimeout(md.stopMotor_1, 10000);
setTimeout(md.stopMotor_2, 10000);
