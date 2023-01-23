require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const client = require("./db/config");
const userRoutes = require("./Routes/UserRoutes");
const authRoutes = require("./Routes/AuthRoutes");
const taskRoutes = require("./Routes/TaskRoutes")
const passport = require("passport");
const initializePassport = require("./Passport/Passport");


initializePassport(passport);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    credentials: true,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(
    cors({
      origin: [
        "http://localhost:3000"
      ],
      methods: ["POST", "GET"],
      credentials: true,
    })
  );


app.use("/",userRoutes);
app.use("/",authRoutes);
app.use("/",taskRoutes);

  client.connect();
  
  const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.ENDPOINT}:${process.env.PORT}`);
});