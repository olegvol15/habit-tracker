/**
 * @openapi
 * tags:
 *   name: Habits
 *   description: Habit management
 */

/**
 * @openapi
 * /api/habits:
 *   get:
 *     tags: [Habits]
 *     summary: Get all habits for the current user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of habits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Habit'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     tags: [Habits]
 *     summary: Create a new habit
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Habit created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @openapi
 * /api/habits/week:
 *   get:
 *     tags: [Habits]
 *     summary: Get habits with checkins for a 7-day window
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *         description: Start date of the week (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Week view data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 days:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date
 *                 habits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 checkins:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     additionalProperties:
 *                       type: boolean
 *       400:
 *         description: Invalid or missing start date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @openapi
 * /api/habits/{habitId}:
 *   patch:
 *     tags: [Habits]
 *     summary: Edit a habit's title
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Habit updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 *       404:
 *         description: Habit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     tags: [Habits]
 *     summary: Delete a habit
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Habit deleted
 *       404:
 *         description: Habit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @openapi
 * /api/habits/{habitId}/checkins:
 *   post:
 *     tags: [Habits]
 *     summary: Toggle a checkin for a habit on a given date
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date]
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *     responses:
 *       200:
 *         description: Checkin toggled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 habitId:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 checked:
 *                   type: boolean
 *       404:
 *         description: Habit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
