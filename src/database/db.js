// crear la conexion a la base de datos
const mongoose = require("mongoose");
const connectionOptions = { useUnifiedTopology: true, useNewUrlParser: true};

//revisar la conexion

mongoose.connect(
  "mongodb+srv://xiomara:xiomara@cluster0.0kekxu9.mongodb.net/?retryWrites=true&w=majority", 
  connectionOptions
);
mongoose.connection.once("open", () => {
  console.log("Db is connected");
});


module.exports = mongoose.connection;
