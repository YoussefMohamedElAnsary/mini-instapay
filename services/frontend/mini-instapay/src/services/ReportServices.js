import axios from 'axios';

const API_URL = 'http://localhost:3003/api/reports';

const getReports = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}`, {
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


