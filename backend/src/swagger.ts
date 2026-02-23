import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Habit Tracker API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "session",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string", format: "email" },
            name: { type: "string", nullable: true },
            avatarUrl: { type: "string", nullable: true },
            timezone: { type: "string", example: "UTC" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Habit: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            userId: { type: "integer" },
          },
        },
        HabitWithStatus: {
          allOf: [
            { $ref: "#/components/schemas/Habit" },
            {
              type: "object",
              properties: {
                checkedToday: { type: "boolean" },
                streak: { type: "integer" },
              },
            },
          ],
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/modules/**/*.docs.ts"],
});
