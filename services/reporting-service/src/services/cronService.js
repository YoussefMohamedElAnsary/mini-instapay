const cron = require('node-cron');
const { generateReport } = require('../controllers/reportController');
const axios = require('axios');
const moment = require('moment');

// Function to get all users from user service
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Generate weekly reports for all users
const generateWeeklyReports = async () => {
  try {
    const users = await getAllUsers();
    const endDate = moment().endOf('week').toDate();
    const startDate = moment().startOf('week').toDate();

    for (const user of users) {
      await generateReport(user.id, startDate, endDate, 'WEEKLY');
    }
    console.log('Weekly reports generated successfully');
  } catch (error) {
    console.error('Error generating weekly reports:', error);
  }
};

// Generate monthly reports for all users
const generateMonthlyReports = async () => {
  try {
    const users = await getAllUsers();
    const endDate = moment().endOf('month').toDate();
    const startDate = moment().startOf('month').toDate();

    for (const user of users) {
      await generateReport(user.id, startDate, endDate, 'MONTHLY');
    }
    console.log('Monthly reports generated successfully');
  } catch (error) {
    console.error('Error generating monthly reports:', error);
  }
};

// Schedule weekly reports (every Sunday at 23:59)
cron.schedule('59 23 * * 0', () => {
  console.log('Running weekly report generation...');
  generateWeeklyReports();
});

// Schedule monthly reports (last day of each month at 23:59)
cron.schedule('59 23 28-31 * *', () => {
  const tomorrow = moment().add(1, 'day');
  if (tomorrow.date() === 1) {
    console.log('Running monthly report generation...');
    generateMonthlyReports();
  }
});

module.exports = {
  generateWeeklyReports,
  generateMonthlyReports
}; 