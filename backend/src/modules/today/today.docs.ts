/**
 * @openapi
 * tags:
 *   name: Today
 *   description: Today's habits view
 */

/**
 * @openapi
 * /api/today:
 *   get:
 *     tags: [Today]
 *     summary: Get all active habits with today's status and streak
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of habits with today's check-in status and streak
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HabitWithStatus'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
