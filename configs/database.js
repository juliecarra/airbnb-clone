const mongoose = require("mongoose");

const database = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(
      `Connected to MongoDB! Database name: "${db.connections[0].name}"`
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = database;
