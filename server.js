const express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
let http = require("http").Server(app);
let io = require("socket.io")(http);

// var config = require('./config');
const routes_user = require("./routes/user");
const routes_post = require("./routes/post");

app.use(cors());

require("./startup/middlewares")(app);

require("./startup/db")();


app.use("/api/user", routes_user);


app.use((req, res, next) => {
  var token =
    req.headers.authtoken || req.body.authtoken || req.params.authtoken;
  jwt.verify(token, "tracker-secret-key", function(err, decoded) {
    if (err) {
      res.status(403).send({
        err: "Invalid Details",
        isLoggedIn: false
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});

app.use("/api/post", routes_post);
app.get("/", function(req, res) {
  res.send("Welcome to my application");
});

app.get("/home", function(req, res) {
  res.send("Welcome to home application");
});

//==================================
io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });
});

// Initialize our websocket server on port 5000
http.listen(3000, () => {
  console.log("started on port 3000");
});

//==================================

/*app.listen(3000, () => {
  console.log("Server running at localhost : 3000");
});
*/