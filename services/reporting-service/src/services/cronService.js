const cron = require('node-cron');
const { generateReport } = require('../controllers/reportController');
const axios = require('axios');
const moment = require('moment-timezone');

const TIMEZONE = 'Africa/Cairo';

// Function to get all users from user service
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/users`);
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response from user service');
    }

    console.log(`Successfully fetched ${response.data.length} users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return [];
  }
};

// Helper function to determine if we're in production
const isProduction = () => process.env.ENV === 'prod';

// Generate daily reports for all users
const generateDailyReports = async () => {
  try {
    console.log('Starting daily report generation...');
    const users = await getAllUsers();
    
    if (users.length === 0) {
      console.log('No users found to generate reports for');
      return;
    }

    // Use start and end of current day in Africa/Cairo timezone
    const startDate = moment().tz(TIMEZONE).startOf('day').toDate();
    const endDate = moment().tz(TIMEZONE).endOf('day').toDate();

    console.log(`Generating daily reports for ${users.length} users`);
    console.log(`Date range: ${moment(startDate).format('YYYY-MM-DD HH:mm:ss')} to ${moment(endDate).format('YYYY-MM-DD HH:mm:ss')}`);

    for (const user of users) {
      try {
        console.log(`Generating daily report for user ${user.id}`);
        await generateReport(user.id, startDate, endDate, 'DAILY');
        console.log(`Successfully generated daily report for user ${user.id}`);
      } catch (error) {
        console.error(`Error generating daily report for user ${user.id}:`, error.message);
        // Continue with next user even if one fails
        continue;
      }
    }
    console.log('Daily reports generation completed');
  } catch (error) {
    console.error('Error in generateDailyReports:', error.message);
  }
};

// Generate weekly reports for all users
const generateWeeklyReports = async () => {
  try {
    console.log('Starting weekly report generation...');
    const users = await getAllUsers();
    
    if (users.length === 0) {
      console.log('No users found to generate reports for');
      return;
    }

    // Use start of week and end of current day in Africa/Cairo timezone
    const startDate = moment().tz(TIMEZONE).startOf('week').toDate();
    const endDate = moment().tz(TIMEZONE).endOf('day').toDate();

    console.log(`Generating weekly reports for ${users.length} users`);
    console.log(`Date range: ${moment(startDate).format('YYYY-MM-DD HH:mm:ss')} to ${moment(endDate).format('YYYY-MM-DD HH:mm:ss')}`);

    for (const user of users) {
      try {
        console.log(`Generating weekly report for user ${user.id}`);
        await generateReport(user.id, startDate, endDate, 'WEEKLY');
        console.log(`Successfully generated weekly report for user ${user.id}`);
      } catch (error) {
        console.error(`Error generating weekly report for user ${user.id}:`, error.message);
        // Continue with next user even if one fails
        continue;
      }
    }
    console.log('Weekly reports generation completed');
  } catch (error) {
    console.error('Error in generateWeeklyReports:', error.message);
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
  console.log(`Initializing ${process.env.ENV} report schedules...`);
  
  // "Daily" reports every 3 minutes
  cron.schedule('*/3 * * * *', () => {
    console.log(`Running daily report generation (every 3 minutes) in ${process.env.ENV}...`);
    generateDailyReports();
  });

  // "Weekly" reports every 6 minutes
  cron.schedule('*/6 * * * *', () => {
    console.log(`Running weekly report generation (every 6 minutes) in ${process.env.ENV}...`);
    generateWeeklyReports();
  });
}

module.exports = {
  generateDailyReports,
  generateWeeklyReports
};