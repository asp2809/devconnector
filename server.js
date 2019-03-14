const express = require("express");
const mongoose = require("mongoose");

const app = express();

const user = require("./routes/api/user");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const bodyParser = require("body-parser");
const passport = require("passport");


//DB Config
const db = require("./config/keys").mongoURI;

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", user);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
