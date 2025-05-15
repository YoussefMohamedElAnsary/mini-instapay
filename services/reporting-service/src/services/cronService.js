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

// Helper function to determine if we're in production
const isProduction = () => process.env.NODE_ENV === 'prod';

// Generate daily reports for all users
const generateDailyReports = async () => {
  try {
    const users = await getAllUsers();
    const endDate = moment().toDate();
    const startDate = isProduction()
      ? moment().startOf('day').toDate()
      : moment().subtract(1, 'minute').toDate();

    for (const user of users) {
      await generateReport(user.id, startDate, endDate, 'DAILY');
    }
    console.log('Daily reports generated successfully');
  } catch (error) {
    console.error('Error generating daily reports:', error);
  }
};

// Generate weekly reports for all users
const generateWeeklyReports = async () => {
  try {
    const users = await getAllUsers();
    const endDate = moment().toDate();
    const startDate = isProduction()
      ? moment().startOf('week').toDate()
      : moment().subtract(5, 'minutes').toDate();

    for (const user of users) {
      await generateReport(user.id, startDate, endDate, 'WEEKLY');
    }
    console.log('Weekly reports generated successfully');
  } catch (error) {
    console.error('Error generating weekly reports:', error);
  }
};

if (isProduction()) {
  // Production schedules
  console.log('Initializing production report schedules...');
  
  // Daily reports at 23:59 every day
  cron.schedule('59 23 * * *', () => {
    console.log('Running daily report generation...');
    generateDailyReports();
  });

  // Weekly reports every Sunday at 23:59
  cron.schedule('59 23 * * 0', () => {
    console.log('Running weekly report generation...');
    generateWeeklyReports();
  });
} else {
  // Development and Staging schedules
  console.log(`Initializing ${process.env.NODE_ENV} report schedules...`);
  
  // "Daily" reports every minute
  cron.schedule('* * * * *', () => {
    console.log(`Running daily report generation (every minute) in ${process.env.NODE_ENV}...`);
    generateDailyReports();
  });

  // "Weekly" reports every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log(`Running weekly report generation (every 5 minutes) in ${process.env.NODE_ENV}...`);
    generateWeeklyReports();
  });
}

module.exports = {
  generateDailyReports,
  generateWeeklyReports
};