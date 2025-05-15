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

// Generate daily reports for all users
const generateDailyReports = async () => {
  try {
    const users = await getAllUsers();
    const endDate = moment().endOf('day').toDate();
    const startDate = moment().startOf('day').toDate();

    for (const user of users) {
      await generateReport(user.id, startDate, endDate, 'DAILY');
    }
    console.log('Daily reports generated successfully');
  } catch (error) {
    console.error('Error generating daily reports:', error);
  }
};

// Generate a single test report for testing purposes
const generateTestReport = async () => {
  try {
    // Use a fixed test user ID or fetch the first user
    const testUserId = 'test-user-id'; // Replace with an actual user ID when testing
    const endDate = moment().toDate();
    const startDate = moment().subtract(1, 'hour').toDate();
    
    await generateReport(testUserId, startDate, endDate, 'DAILY');
    console.log(`Test report generated at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  } catch (error) {
    console.error('Error generating test report:', error);
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

// Schedule daily reports (every day at 23:59)
cron.schedule('59 23 * * *', () => {
  console.log('Running daily report generation...');
  generateDailyReports();
});

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

// TEST CRON JOB - Runs every minute for testing purposes
// Format: second(optional) minute hour day-of-month month day-of-week
cron.schedule('* * * * *', () => {
  console.log('Running test report generation every minute...');
  generateDailyReports();
});

// FAST TEST CRON JOB - Runs every 5 seconds for quick testing
// Note: This uses the seconds field which is optional in cron
cron.schedule('*/5 * * * * *', () => {
  console.log('Running super fast test report generation every 5 seconds...');
  generateTestReport();
});

module.exports = {
  generateDailyReports,
  generateWeeklyReports,
  generateMonthlyReports,
  generateTestReport
}; 