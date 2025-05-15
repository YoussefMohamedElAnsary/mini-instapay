const express = require('express');
const router = express.Router();
const { generateReport, getReports } = require('../controllers/reportController');
const { authenticateToken } = require('../middlewares/auth');



// Get reports for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.query;
    const reports = await getReports(req.user.id, reportType, startDate, endDate);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Generate a new report
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, reportType } = req.body;
    const report = await generateReport(req.user.id, startDate, endDate, reportType);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 