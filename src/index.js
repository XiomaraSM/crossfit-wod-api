const express = require("express");
const apicache = require("apicache");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const { default: mongoose } = require("mongoose");
require ("dotenv").config();

//monogodb connection
mongoose
.connect(process.env.MONGODB_URI)
.then (() => console.log("conected to MongoDB Atlas"))
.catch((error) => console.error(error))

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

//middleware
app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
