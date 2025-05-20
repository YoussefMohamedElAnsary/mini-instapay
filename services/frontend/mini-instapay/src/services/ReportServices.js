import axios from 'axios';

const API_URL = 'api/reports';

const getReports = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Reports response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error.response?.data || error.message);
        throw error;
    }
};

// const generateReport = async () => {
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             throw new Error('No authentication token found');
//         }
//         // Get current date
//         const now = new Date();
//         // Set start date to beginning of current day (00:00:00)
//         const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         // Set end date to end of current day (23:59:59)
//         const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        
//         const response = await axios.post(`${API_URL}/generate`, {
//             startDate: startDate.toISOString(),
//             endDate: endDate.toISOString(),
//             reportType: 'DAILY'
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         console.log('Report generated:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error generating report:', error.response?.data || error.message);
//         throw error;
//     }
// }

export default {
    getReports,
};


