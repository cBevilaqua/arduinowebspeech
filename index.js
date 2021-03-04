const express = require("express");
const five = require("johnny-five");
const app = express();
const http = require("http").createServer(app);
const board = new five.Board();
const io = require("socket.io")(http);

board.on("ready", function() {
  var led = new five.Led(13);

  io.on("connection", function(socket) {
    socket.on("turn-on", function() {
    	led.on()
    })

    socket.on("turn-off", function() {
    	led.off()
    })

    socket.on("blink", function() {
    	led.blink()
    })

    socket.on("stop", function() {
    	led.stop()
    })
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log("Server running on: ", port);
});
