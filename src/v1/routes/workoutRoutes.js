const express = require("express");
const workoutController = require("../../controllers/workoutController");

const router = express.Router();
/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     summary: Get all workouts or filter by mode
 *     description: Returns a list of all workouts or a filtered list by mode
 *     tags:
 *       - workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         description: Filter by workout mode (e.g. 'strength', 'endurance', 'mobility')
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Workout'
 *       '400':
 *         description: Invalid request parameters
 *       '500':
 *         description: Internal server error
 */
/**
 * @openapi
 * /workouts/{workoutId}:
 *   get:
 *     summary: Get a single workout by ID
 *     description: Returns a single workout by ID.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         description: ID of the workout to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Parameter ':workoutId' can not be empty"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Workout with ID {workoutId} not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 */
/**
 * @openapi
 * /api/v1/workouts:
 *   post:
 *     summary: Create a new workout
 *     tags:
 *       - Workouts
 *     requestBody:
 *       description: Workout object that needs to be added to the database
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       '201':
 *         description: Workout successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       '400':
 *         description: Bad request - some required fields are missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'FAILED'
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'FAILED'
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: 'Internal server error'
 */
/**
 * @openapi
 * /workouts/{workoutId}:
 *   put:
 *     summary: Update a workout by ID
 *     description: Update a workout's details by its ID
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         description: ID of the workout to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New details of the workout to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Workout with ID {workoutId} not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 */
/**
 * @openapi
 * /workouts/{workoutId}:
 *   delete:
 *     summary: Deletes a workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the workout to delete
 *     responses:
 *       204:
 *         description: The workout was successfully deleted
 *       400:
 *         description: Parameter ':workoutId' can not be empty
 *       404:
 *         description: Workout with ID {workoutId} not found
 *       500:
 *         description: Failed to delete workout
 */

router
  .get("/", workoutController.getAllWorkouts)
  .get("/:workoutId", workoutController.getOneWorkout)
  .post("/", workoutController.createNewWorkout)
  .patch("/:workoutId", workoutController.updateOneWorkout)
  .delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
