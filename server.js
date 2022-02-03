const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const app = express();

const database = require("./configs/database");
database();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "airbnbSession",
});
store.on("error", function (error) {
  console.log(error);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/houses", require("./routes/houses"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/payments", require("./routes/payments"));

require("./middlewares/passport");

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT}/ !`);
});
