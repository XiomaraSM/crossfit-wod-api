const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

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
          example: {
            name: "Ejemplo de rutina",
            mode: "cardio",
            equipment: ["pesas", "bicicleta estática"],
            exercises: ["sentadillas", "flexiones", "abdominales"],
            trainerTips: ["Mantener la postura", "Hidratarse durante el ejercicio"],
          }
        },
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/workoutRoutes.js")}`],
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

