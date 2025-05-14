const { Report } = require('../../models');
const axios = require('axios');
const { Op } = require('sequelize');

const generateReport = async (userId, startDate, endDate, reportType) => {
  try {
    // Fetch transactions from transaction service
    const response = await axios.get(`${process.env.TRANSACTION_SERVICE_URL}/api/transactions`, {
      params: {
        userId,
        startDate,
        endDate
      }
    });

    const transactions = response.data;

    // Calculate report statistics
    const totalTransactions = transactions.length;
    const totalSent = transactions
      .filter(t => t.type === 'SENT')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalReceived = transactions
      .filter(t => t.type === 'RECEIVED')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Create report
    const report = await Report.create({
      userId,
      reportType,
      startDate,
      endDate,
      totalTransactions,
      totalSent,
      totalReceived
    });

    return report;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

const getReports = async (userId, reportType, startDate, endDate) => {
  try {
    const whereClause = { userId };
    
    if (reportType) {
      whereClause.reportType = reportType;
    }
    
    if (startDate && endDate) {
      whereClause.startDate = {
        [Op.between]: [startDate, endDate]
      };
    }

    const reports = await Report.findAll({
      where: whereClause,
      order: [['generatedAt', 'DESC']]
    });

    return reports;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

module.exports = {
  generateReport,
  getReports
}; 