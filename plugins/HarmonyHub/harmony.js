var harmony = require('harmonyhubjs-client');

var config = require('../../configloader').get("Harmony Hub");

// harmony(config.ip)
// .then(function(harmonyClient) {
//     harmonyClient.isOff()
//     .then(function(off) {
//         if(off) {
//             console.log('Currently off. Turning TV on.');

//             harmonyClient.getActivities()
//             .then(function(activities) {
//                 activities.some(function(activity) {
//                     console.log(activity.label);
//                     if(activity.label === 'FERNSEHEN') {
//                         var id = activity.id;
//                         harmonyClient.startActivity(id);
//                         harmonyClient.end();
//                         return true;
//                     }
//                     return false;
//                 });
//             });
//         } else {
//             console.log('Currently on. Turning TV off');
//             harmonyClient.turnOff();
//             harmonyClient.end();
//         }
//     });
// });



exports.getName = function(){
    return "Harmony Hub";
};

function turnOn(activityName) {
    harmony(config.ip)
    .then(function(harmonyClient) {
        harmonyClient.getActivities()
        .then(function(activities) {
            activities.some(function(activity) {
                console.log(activity.label);
                if(activity.label.toLowerCase() === activityName.toLowerCase()) {
                    var id = activity.id;
                    harmonyClient.startActivity(id);
                    harmonyClient.end();
                    return true;
                }
                return false;
            });
        });
    });
}

function turnOff() {
    harmony(config.ip)
    .then(function(harmonyClient) {
        console.log('Turning TV off');
        harmonyClient.turnOff();
        harmonyClient.end();
    });
}

function createfunc(service) {
    return function() {
        if (service.action == "off") {
            turnOff();
        }else{
            turnOn(service.activity);
        }
    };
}

exports.services = function(){
    var actions = [];
    for (var prop in config.services) {
        var deviceName = config.services[prop];
        actions.push({
            name: prop,
            action : createfunc(config.services[prop])
        });
    }
    return actions;
};

exports.commandApi = function(command){
    var lamps = command.devices || config.devices;

    if (command.action == "turnon") {
        turnOn();
    }
    if (command.action == "turnoff") {
        turnOff();
    }
};
