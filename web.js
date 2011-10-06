var Campfire = require("./lib/campfire").Campfire;

var config = {
  token:   process.env["CAMPFIRE_TOKEN"],
  account: process.env["CAMPFIRE_ACCOUNT"],
  ssl:     process.env["CAMPFIRE_SSL"] == "true",
  roomId:  process.env["CAMPFIRE_ROOM"]
};

var instance = new Campfire(config);

instance.join(config.roomId, function(error, room) {
  if (error) {
    console.log(error);
  } else {
    room.listen(function(message) {
      if (message.body == "!ping") {
        console.log("PING received.");

        room.speak("pong!", function(error, response) {
          console.log("PONG sent at " + response.message.created_at + ".");
        });
      }
    });
  }
});

// var marshmallow = require("./lib/marshmallow").marshmallow;
// marshmallow(config, function(bot) {
//   bot.on("!ping", function(branch) {
//     this.speak("pong!");
//   });
// });
