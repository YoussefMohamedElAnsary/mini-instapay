const express = require('express');
const router = express.Router();
const { generateReport, getReports } = require('../controllers/reportController');
const { authenticateToken } = require('../middlewares/auth');



// Get reports for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching reports for user:', req.user.id);
    const { reportType, startDate, endDate } = req.query;
    const reports = await getReports(req.user.id, reportType, startDate, endDate);
    console.log('Found reports>>>>>:::::::', reports.length);
    res.json(reports);
  } catch (error) {
    console.error('Error in GET /reports:', error);
    res.status(500).json({ error: error.message });
  }
});


// Generate a new report
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, reportType } = req.body;
    
    // Get the full authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    console.log(':::::::::::::Report generation for user >>>>>>', req.user.id);
    
    const report = await generateReport(req.user.id, startDate, endDate, reportType, authHeader);
    console.log(':::::::::::::Report generated for user >>>>>>', req.user.id, report);

    res.json(report);
  } catch (error) {
    console.error('Error in POST /reports/generate:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate report',
      details: error.response?.data || 'No additional details available'
    });
  }
}); 

module.exports = router; 