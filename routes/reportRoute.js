const express = require("express");
const authenticateToken = require("../middleware/authentcatetoken");
const adminAuthenticateToken = require("../middleware/adminAuthenticateToken");
const controller = require("../controllers/reportController")
const router = express.Router();

/**
 * @swagger
 * /report/add-reason:
 *   post:
 *     summary: Add a new reason (Admin Only)
 *     tags:
 *       - Report Reasons
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Spam or misleading"
 *     responses:
 *       201:
 *         description: Reason added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reason added successfully."
 *       400:
 *         description: Missing reason in request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please add a reason."
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to add reason, Internal server error"
 */
router.post('/report/add-reason', adminAuthenticateToken, controller.addReason);
/**
 * @swagger
 * /report/update-reason:
 *   put:
 *     summary: Update a reason (Admin Only)
 *     tags:
 *       - Report Reasons
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - reason
 *             properties:
 *               id:
 *                 type: string
 *                 example: "650fa7a6dfb48e9a1c5e5ef2"
 *               reason:
 *                 type: string
 *                 example: "Updated reason text"
 *     responses:
 *       200:
 *         description: Reason updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reason updated successfully."
 *       400:
 *         description: Missing id or reason
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please add a id and reason."
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Reason not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reason not found."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update reason, Internal server error"
 */

router.put('/report/update-reason', adminAuthenticateToken, controller.updateReason);

/**
 * @swagger
 * /report/reason/{id}:
 *   delete:
 *     summary: Delete a reason
 *     tags:
 *       - Report Reasons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "650fa7a6dfb48e9a1c5e5ef2"
 *     responses:
 *       200:
 *         description: Reason deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reason deleted successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "650fa7a6dfb48e9a1c5e5ef2"
 *                     reason:
 *                       type: string
 *                       example: "Spam content"
 *       400:
 *         description: Reason linked with report or ID missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reason is associated with a report, cannot delete"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Reason not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reason not found."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete reason, Internal server error"
 */

router.delete('/report/reason/:id', adminAuthenticateToken, controller.deleteReason);

/**
 * @swagger
 * /api/reasons:
 *   get:
 *     summary: Get all active reasons
 *     tags:
 *       - Report Reasons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active reasons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reason'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/report/reasons', authenticateToken, controller.getAllReasons);

/**
 * @swagger
 * /report/submit:
 *   post:
 *     summary: Submit a report (User Protected)
 *     description: Allows a logged-in user to report content (article, podcast, or comment) for a selected reason.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reportedBy
 *               - reasonId
 *               - authorId
 *             properties:
 *               podcastId:
 *                 type: string
 *                 description: ID of the podcast being reported (optional if articleId or commentId is present)
 *                 example: "650fa8c2db48a3b11c5a6ef9"
 *               articleId:
 *                 type: string
 *                 description: ID of the article being reported (optional if podcastId or commentId is present)
 *                 example: "650fa7f1db48a3b11c5a6ef7"
 *               commentId:
 *                 type: string
 *                 description: ID of the comment being reported (optional if articleId or podcastId is present)
 *                 example: "650fa91adb48a3b11c5a6efb"
 *               reportedBy:
 *                 type: string
 *                 description: ID of the user who is reporting
 *                 example: "650fa6a3db48a3b11c5a6ef3"
 *               reasonId:
 *                 type: string
 *                 description: ID of the reason for reporting
 *                 example: "650fa69edb48a3b11c5a6ef2"
 *               authorId:
 *                 type: string
 *                 description: ID of the user who created the reported content
 *                 example: "650fa699db48a3b11c5a6ef1"
 *     responses:
 *       201:
 *         description: Report submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report submitted successfully"
 *       400:
 *         description: Missing required fields or content IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide either articleId, podcastId or commentId."
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Related content or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast not found."
 *       500:
 *         description: Server error while processing the report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/report/submit', authenticateToken, controller.submitReport);

/**
 * @swagger
 * /report/pending-reports:
 *   get:
 *     summary: Get all pending reports (Admin Only)
 *     description: Returns a paginated list of reports that are still pending and not yet assigned to any admin.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of pending reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pendingReports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Report object
 *                     $ref: '#/components/schemas/Report'
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching pending reports"
 */
router.get('/report/pending-reports', adminAuthenticateToken, controller.getAllPendingReports);

/**
 * @swagger
 * /report/all-assigned-reports:
 *   get:
 *     summary: Get moderator reports (Assigned to current admin/moderator)
 *     description: Returns a paginated list of reports assigned to the logged-in moderator. Use `isCompleted` to filter resolved/unresolved.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isCompleted
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Filter by completed status. Pass true to get resolved reports.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of reports assigned to the moderator
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Report'
 *                     description: Report object
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Error while fetching reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching pending reports"
 */
router.get('/report/all-assigned-reports', adminAuthenticateToken, controller.getAllReportsForModerator);

/**
 * @swagger
 * /report-details/{id}:
 *   get:
 *     summary: Get details of a specific report (Admin/Moderator Protected)
 *     description: Fetches detailed information of a report by its ID. Includes populated fields like reportedBy, convict, reason, and content info.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Report ID
 *         schema:
 *           type: string
 *           example: "650fa9e1db48a3b11c5a6f01"
 *     responses:
 *       200:
 *         description: Report details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ReportAction'
 *       400:
 *         description: Missing report ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report id is required"
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report not found"
 *       500:
 *         description: Server error while fetching report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching report details"
 */
router.get('/report-details/:id', adminAuthenticateToken, controller.getReportDetails);

/**
 * @swagger
 * /report/pick-report-for-investigation:
 *   post:
 *     summary: Assign a report to the logged-in moderator for investigation
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reportId
 *             properties:
 *               reportId:
 *                 type: string
 *                 description: The ID of the report to pick/assign
 *                 example: 64f91c0a5c1234567890abcd
 *     responses:
 *       200:
 *         description: Report picked successfully and assigned to moderator
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Report picked successfully
 *       400:
 *         description: Bad Request - Missing reportId in request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Report id is required
 *       401:
 *         description: Unauthorized - User is not authenticated or token is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Report not found with the given reportId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Report not found
 *       500:
 *         description: Internal Server Error - Something went wrong on server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error picking report
 */
router.post('/report/pick-report-for-investigation', adminAuthenticateToken, controller.pickReport);

/**
 * @swagger
 * /report/take-admin-action:
 *   post:
 *     summary: Take action on a report (admin/moderator only)
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reportId
 *               - action
 *               - admin_id
 *             properties:
 *               reportId:
 *                 type: string
 *                 description: ID of the report on which to take action
 *                 example: 64f91c0a5c1234567890abcd
 *               action:
 *                 type: string
 *                 enum:
 *                   - RESOLVED
 *                   - DISMISSED
 *                   - IGNORE
 *                   - WARN_CONVICT
 *                   - REMOVE_CONTENT
 *                   - BLOCK_CONVICT
 *                   - RESTORE_CONTENT
 *                   - BAN_CONVICT
 *                   - CONVICT_REQUEST_DISAPPROVED
 *                 description: |
 *                   Action to be taken on the report. Effects:
 *                     - **RESOLVED**: Marks report as resolved. Decreases convict's active report count. Sends resolution mail.
 *                     - **DISMISSED**: Dismisses false/invalid report. Increases victim's misuse count. Victim may be blocked after 3 such dismissals.
 *                     - **IGNORE**: Ignores the report silently. Used when convict/victim is already banned/blocked.
 *                     - **WARN_CONVICT**: Warns the convict and removes content. Increases strike count. After 3 strikes, user is banned.
 *                     - **REMOVE_CONTENT**: Removes the associated content (comment/article/podcast). Does not warn convict.
 *                     - **BLOCK_CONVICT**: Temporarily blocks the convict for a set period (e.g., 1 month). Increases active report count.
 *                     - **RESTORE_CONTENT**: Restores previously removed content (used if removal was incorrect).
 *                     - **BAN_CONVICT**: Permanently bans the convict. Used for severe or repeated violations.
 *                     - **CONVICT_REQUEST_DISAPPROVED**: Disapproves content restore request. No impact on user status.
 *                 example: WARN_CONVICT
 *               admin_id:
 *                 type: string
 *                 description: ID of the admin/moderator taking the action
 *                 example: 64e91c0b9a7f001a0abc1234
 *               dismissReason:
 *                 type: string
 *                 description: Required if action is DISMISSED
 *                 example: This report lacks sufficient evidence.
 *     responses:
 *       200:
 *         description: Action performed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Action performed
 *       400:
 *         description: Bad Request - Missing fields or invalid action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required field- Report id, action and admin id
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden - Convict or victim is blocked/banned or report already handled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Convict or victim is blocked
 *       404:
 *         description: Report or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Report or moderator not found
 *       500:
 *         description: Internal Server Error - Failed to process the action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error taking action on report
 */
router.post('/report/take-admin-action', adminAuthenticateToken, controller.takeAdminActionOnReport);

/**
 * @swagger
 * /report/convict-request-against-report:
 *   post:
 *     summary: Submit a request to restore content (Convict only)
 *     tags:
 *       - Reports
 *     description: |
 *       Allows the user (convict) to submit a request to restore content that was previously removed.
 *       Only works for **article** content. If the report is related to a **comment**, this action is rejected.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - convict_id
 *               - convict_statement
 *               - report_id
 *             properties:
 *               convict_id:
 *                 type: string
 *                 description: ID of the user submitting the request (must match report.convictId)
 *                 example: "64fc12345abc67890def1234"
 *               convict_statement:
 *                 type: string
 *                 description: Reason or explanation provided by the convict to justify restoring the content
 *                 example: "This article was wrongly reported. It does not violate community guidelines."
 *               report_id:
 *                 type: string
 *                 description: ID of the report associated with the content to be restored
 *                 example: "650d987abc1234567890abcd"
 *     responses:
 *       200:
 *         description: Restore request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Request sent
 *       400:
 *         description: Bad request — missing or mismatched fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Convict does not match report
 *       401:
 *         description: Unauthorized — Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error — Unable to process the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error convicting user
 */
router.post('/report/convict-request-against-report', authenticateToken, controller.convictRequestToRestoreContent);



/**
 * @later
 */
router.get('/report/all-reports-against-convict', adminAuthenticateToken, controller.getAllReportsAgainstConvict);

module.exports = router;