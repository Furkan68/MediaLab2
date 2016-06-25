// Mdriver.js
var Mdriver = function () {
    var gpio = require("gpio");
	
    var speed = {
        1 : 50, 2 : 60, 3 : 65, 4 : 70
    };

	var speedup = 10;
	
    //Motor1
    var gpio23 = gpio.export(23, {
        ready: function () {
            console.log("gpio23 set, + Motor1" + speed[1]);
        }
    });


    var gpio24 = gpio.export(24, {
        ready: function () {
            console.log("gpio24 set, - Motor1");
            gpio24.set(0);
        }
    });

    //Motor2
    var gpio27 = gpio.export(27, {
        ready: function () {
            console.log("gpio27 set, + Motor2");

        }
    });

    var gpio22 = gpio.export(22, {
        ready: function () {
            console.log("gpio22 set, - Motor2");
            gpio22.set(0);
        }
    });

    //GPIO18 = enable Motor1
    //GPIO17 = enable Motor2

    var gpio17 = gpio.export(17, {
        direction: 'out',
        ready: function () {
            console.log("gpio17 set, Enable Motor1");
            gpio17.set();
        }
    });

    var gpio18 = gpio.export(18, {
        direction: 'out',
        ready: function () {
            console.log("gpio18 set, Enable Motor1");
            gpio18.set();
        }
    });

    this.forward = function (x) {
        setInterval(function () {
            gpio23.set();
            gpio27.set();
            setTimeout(function () {
                //console.log("Reset Enable");
                gpio23.set(0);
            }, speed[x]);
            setTimeout(function () {
                //console.log("Reset Enable");
                gpio27.set(0);
            }, speed[x] + speedup);
        }, 100);
    };

    this.left = function (x) {
        setInterval(function () {
            gpio27.set();
            setTimeout(function () {
                //console.log("Reset Enable");
                gpio27.set(0);
            }, speed[x] + speedup);
        }, 100);
    };


    this.right = function (x) {
        setInterval(function () {
            gpio23.set();
            setTimeout(function () {
                //console.log("Reset Enable");
                gpio23.set(0);
            }, speed[x]);
        }, 100);
    };

    this.stopMotor_1 = function () {
        gpio23.set(0);
        gpio24.set(0);
        gpio18.set(0);
        console.log("Stopped Motor1!");
    };

    this.stopMotor_2 = function () {
        gpio22.set(0);
        gpio27.set(0);
        gpio17.set(0);
        console.log("Stopped Motor2!");
    };

    this.log = function () {
        console.log('Mdriver!');
    };

    this.stop = function(){
        //Motor 2
        gpio22.set(0);
        gpio27.set(0);
        gpio17.set(0);
        // Motor 1
        gpio23.set(0);
        gpio24.set(0);
        gpio18.set(0);
    }
};

module.exports = new Mdriver();