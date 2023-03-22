const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { 
      title: "Crossfit WOD API", 
      version: "1.0.0",
      description: "API para manejar entrenamientos de Crossfit" 
    },
    components: {
      schemas: {
        Workout: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            mode: {
              type: "string",
            },
            equipment: {
              type: "array",
              items: {
                type: "string",
              },
            },
            exercises: {
              type: "array",
              items: {
                type: "string",
              },
            },
            trainerTips: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  apis: ["src/v1/routes/workoutRoutes.js", "src/database/db.js"],
};

// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

/// Function to setup our docs
const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available at http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };

