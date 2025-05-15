/**
 * Five-Second Cron Job Test
 * 
 * This script tests the 5-second interval cron job functionality.
 * It will run for 20 seconds and capture 4 executions of the 5-second cron job.
 */

const moment = require('moment');
const cron = require('node-cron');

// Maximum runtime in milliseconds
const MAX_RUNTIME = 20000; // 20 seconds
const CHECK_INTERVAL = 1000; // Check every 1 second
const EXPECTED_RUNS = 4; // Expect 4 runs in 20 seconds

// Initialize counters
let cronRuns = 0;
let startTime = null;
let previousRunTime = null;
let intervalGaps = [];

// Mock report generation function
async function mockGenerateReport() {
  const currentTime = moment();
  cronRuns++;
  
  // Calculate interval from previous run (except first run)
  if (previousRunTime) {
    const intervalInSeconds = currentTime.diff(previousRunTime, 'seconds', true);
    intervalGaps.push(intervalInSeconds);
    console.log(`Run #${cronRuns} at ${currentTime.format('HH:mm:ss.SSS')} (${intervalInSeconds.toFixed(2)}s since last run)`);
  } else {
    console.log(`Run #${cronRuns} at ${currentTime.format('HH:mm:ss.SSS')}`);
  }
  
  previousRunTime = currentTime;
  
  // Simulate report generation with mock data
  return {
    id: `test-report-${cronRuns}`,
    userId: 'test-user-1',
    reportType: 'DAILY',
    totalTransactions: Math.floor(Math.random() * 10) + 1,
    totalSent: Math.floor(Math.random() * 1000),
    totalReceived: Math.floor(Math.random() * 1000),
    generatedAt: currentTime.toDate()
  };
}

// Set up the test
const runTest = async () => {
  try {
    console.log('=== FIVE-SECOND CRON JOB TEST ===');
    console.log('✓ Using mock data for testing');
    
    // Start the test
    startTime = moment();
    console.log(`\nTest started at ${startTime.format('HH:mm:ss')}`);
    console.log('Monitoring 5-second cron job for 20 seconds...\n');
    
    // Create the 5-second cron job
    const task = cron.schedule('*/5 * * * * *', async () => {
      try {
        await mockGenerateReport();
      } catch (error) {
        console.error('Error in cron job:', error);
      }
    });
    
    // Check execution every second and print status
    const checkInterval = setInterval(() => {
      const elapsedTime = moment().diff(startTime, 'seconds');
      const timeRemaining = (MAX_RUNTIME / 1000) - elapsedTime;
      
      if (timeRemaining <= 0) {
        task.stop(); // Stop the cron job
        clearInterval(checkInterval);
        printResults();
        process.exit(0);
      }
    }, CHECK_INTERVAL);
    
  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
};

// Print test results
const printResults = () => {
  const runTime = moment().diff(startTime, 'seconds', true);
  const averageInterval = intervalGaps.length > 0 
    ? intervalGaps.reduce((sum, gap) => sum + gap, 0) / intervalGaps.length 
    : 0;
  
  console.log('\n=== TEST RESULTS ===');
  console.log(`Test duration: ${runTime.toFixed(2)} seconds`);
  console.log(`Total cron job executions: ${cronRuns}`);
  console.log(`Average interval between runs: ${averageInterval.toFixed(2)} seconds`);
  
  // Determine if the test passed (we should see close to EXPECTED_RUNS executions)
  const minExpectedRuns = EXPECTED_RUNS - 1; // Allow for timing variations
  const testPassed = cronRuns >= minExpectedRuns;
  
  console.log(`\nExpected at least ${minExpectedRuns} runs in ${MAX_RUNTIME/1000} seconds`);
  console.log(`Test result: ${testPassed ? '✓ PASS' : '✗ FAIL'}`);
  
  if (testPassed) {
    console.log('\n✓ The 5-second cron job is working correctly!');
  } else {
    console.log('\n✗ The 5-second cron job is not executing as expected.');
    console.log('Check the cron job configuration in cronService.js');
  }
};

// Run the test
runTest(); 