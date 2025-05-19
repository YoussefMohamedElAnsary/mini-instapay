const { Report } = require('../../models');
const axios = require('axios');
const { Op } = require('sequelize');

const generateReport = async (userId, startDate, endDate, reportType, token) => {

  try {
    console.log("::::meow meow meow ::::::transaction service::::::userId from transaction service:::::", userId);
    // Fetch transactions of a user from transaction service 
    const response = await axios.get(`${process.env.TRANSACTION_SERVICE_URL}/api/transactions/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log("::::meow meow meow ::::::transaction service::::::userId from transaction service:::::", response.data);
    console.log('Fetched transactions count:', response.data.length);

    if (!response.data) {
      throw new Error('No transactions found');
    }

    // Filter transactions by date range and status
    const filteredTransactions = response.data.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return (
        transactionDate >= new Date(startDate) && 
        transactionDate <= new Date(endDate) &&
        transaction.status === 'COMPLETED'  // Only include completed transactions
      );
    });

    console.log(':::::::::::::Filtered transactions count: for user >>>>>>', userId, filteredTransactions.length);
    console.log(':::::::::::::Filtered transactions: for user >>>>>>', userId, filteredTransactions);

    // Calculate report statistics
    const totalTransactions = filteredTransactions.length;
    const totalSent = filteredTransactions
      .filter(t => t.senderUserId === userId)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalReceived = filteredTransactions
      .filter(t => t.receiverUserId === userId)
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