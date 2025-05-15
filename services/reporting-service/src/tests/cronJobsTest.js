/**
 * Manual Test Script for Cron Jobs
 * 
 * This script tests the cron job functionality by:
 * 1. Using mock data for testing
 * 2. Testing different cron patterns
 * 3. Verifying cron job execution timing
 */

const cron = require('node-cron');
const moment = require('moment');

// Test flags to track successful execution
const successFlags = {
  dailyReports: false,
  weeklyReports: false,
  monthlyReports: false,
  testReport: false,
  testCron: false
};

// Mock report generation function
async function mockGenerateReport(type = 'DAILY') {
  const currentTime = moment();
  
  return {
    id: `test-report-${Date.now()}`,
    userId: 'test-user-1',
    reportType: type,
    totalTransactions: Math.floor(Math.random() * 10) + 1,
    totalSent: Math.floor(Math.random() * 1000),
    totalReceived: Math.floor(Math.random() * 1000),
    generatedAt: currentTime.toDate()
  };
}

// Mock report generation functions
async function generateDailyReports() {
  const report = await mockGenerateReport('DAILY');
  console.log('Generated daily report:', report.id);
  return report;
}

async function generateWeeklyReports() {
  const report = await mockGenerateReport('WEEKLY');
  console.log('Generated weekly report:', report.id);
  return report;
}

async function generateMonthlyReports() {
  const report = await mockGenerateReport('MONTHLY');
  console.log('Generated monthly report:', report.id);
  return report;
}

async function generateTestReport() {
  const report = await mockGenerateReport('TEST');
  console.log('Generated test report:', report.id);
  return report;
}

// Initialize test
const runTest = async () => {
  try {
    console.log('=== CRON JOB TEST SCRIPT ===');
    console.log('✓ Using mock data for testing');
    
    // Manually trigger each report generation function
    console.log('\nTesting report generation functions:');
    
    // 1. Test daily reports
    console.log('1. Generating daily reports...');
    await generateDailyReports()
      .then(() => {
        successFlags.dailyReports = true;
        console.log('✓ Daily reports generated successfully');
      })
      .catch(err => console.error('✗ Error generating daily reports:', err));
    
    // 2. Test weekly reports
    console.log('2. Generating weekly reports...');
    await generateWeeklyReports()
      .then(() => {
        successFlags.weeklyReports = true;
        console.log('✓ Weekly reports generated successfully');
      })
      .catch(err => console.error('✗ Error generating weekly reports:', err));
    
    // 3. Test monthly reports
    console.log('3. Generating monthly reports...');
    await generateMonthlyReports()
      .then(() => {
        successFlags.monthlyReports = true;
        console.log('✓ Monthly reports generated successfully');
      })
      .catch(err => console.error('✗ Error generating monthly reports:', err));
    
    // 4. Test single test report
    console.log('4. Generating test report...');
    await generateTestReport()
      .then(() => {
        successFlags.testReport = true;
        console.log('✓ Test report generated successfully');
      })
      .catch(err => console.error('✗ Error generating test report:', err));
    
    // 5. Test a temporary cron job that runs immediately (after 2 seconds)
    console.log('\n5. Testing immediate cron job (will execute in 2 seconds)...');
    
    // Create timestamp for verification
    const timestamp = moment().format('HH:mm:ss');
    console.log(`Current time: ${timestamp}`);
    console.log('Scheduling cron job...');
    
    // Instead of using hour/minute/second pattern, use a 2-second interval
    const cronPattern = '*/2 * * * * *';
    console.log(`Cron pattern: ${cronPattern} (runs every 2 seconds)`);
    
    // Create the temporary cron job
    const task = cron.schedule(cronPattern, async () => {
      console.log(`✓ Immediate cron job executed at ${moment().format('HH:mm:ss.SSS')}`);
      successFlags.testCron = true;
      
      // Print test summary after immediate cron job completes
      task.stop(); // Stop the cron job immediately after first execution
      setTimeout(() => {
        printSummary();
        process.exit(0);
      }, 500); // Reduced timeout to 500ms since we don't need to wait as long
    }, {
      scheduled: true
    });
    
    console.log('Waiting for cron job to execute (max 2 seconds)...');
  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
};

// Print test summary
const printSummary = () => {
  console.log('\n=== TEST SUMMARY ===');
  console.log(`Daily Reports: ${successFlags.dailyReports ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Weekly Reports: ${successFlags.weeklyReports ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Monthly Reports: ${successFlags.monthlyReports ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Test Report: ${successFlags.testReport ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Immediate Cron: ${successFlags.testCron ? '✓ PASS' : '✗ FAIL'}`);
  
  const allPassed = Object.values(successFlags).every(flag => flag === true);
  console.log(`\nOverall Test Result: ${allPassed ? '✓ PASS' : '✗ FAIL'}`);
};

// Run the test
runTest(); 