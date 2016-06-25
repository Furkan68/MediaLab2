var gpio = require("gpio");
var gpio23, gpio24, gpio18, gpio17, gpio27, gpio22;

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " SOME_PARAM");
    process.exit(-1);
}

var param = process.argv[2];

//Motor1

gpio23 = gpio.export(23, {
    ready: function () {
        console.log("gpio23 set, + Motor1");
        gpio23.set(0);
    }
});


gpio24 = gpio.export(24, {
    ready: function () {
        gpio24.set();
        console.log("gpio24 set, - Motor1");
    }
});

//Motor2

gpio27 = gpio.export(27, {
    ready: function () {
        console.log("gpio27 set, + Motor2");
        gpio27.set(0);
    }
});

gpio22 = gpio.export(22, {
    ready: function () {
        console.log("gpio22 set, - Motor2");
        gpio22.set();
    }
});

//GPIO18 = enable Motor1
//GPIO17 = enable Motor2

gpio17 = gpio.export(17, {
    direction: 'out',
    ready: function () {
        console.log("gpio17 set, Enable Motor1");
        intervalTimer = setInterval(function () {
            gpio17.set();
            setTimeout(function () {
                //console.log("Reset Enable");
                gpio17.reset();
            }, param);
        }, 100);
    }
});

gpio18 = gpio.export(18, {
    direction: 'out',
    ready: function () {
        console.log("gpio18 set, Enable Motor1");
        gpio18.set();
        gpio17.set();
        intervalTimer = setInterval(function () {
            gpio18.set();
            setTimeout(function () {
                //console.log("Reset Enable");
                gpio18.reset();
            }, param);
        }, 100);
    }
});

setTimeout(stopMotor_1, 10000);
setTimeout(stopMotor_2, 10000);

function stopMotor_1() {
    gpio23.reset();
    gpio24.reset();
    gpio18.reset();
    console.log("Stopped Motor1!");
}

function stopMotor_2() {
    gpio22.reset();
    gpio27.reset();
    gpio17.reset();
    console.log("Stopped Motor2!");
}