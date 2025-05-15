import axios from 'axios';

const API_URL = 'http://localhost:3004/api/reports';

const getReports = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}` 
        ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export default {
    getReports
};


