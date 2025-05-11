import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    const refreshUser = async (token) => {
        try {
            if (!token) return;
            
            const res = await axios.get('http://localhost:3001/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if(res.data){
                setUser(res.data.user);
                console.log('User refreshed:', res.data.user)
            }
            else{
                console.log('Failed to refresh user:', res.data)
                logout()
            }
    
        } catch (err) {
            console.error('Failed to refresh user:', err);
            logout();
        }
    };



    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        const init = async () => {
            if (storedToken) {
                setToken(storedToken);
                await refreshUser(storedToken);
            }
            setLoading(false); 
        };

        init();
    }, [])

    const login = ({user, token}) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')    
    }

    if (loading) {
        return <div>Loading...</div>;    
    }

    return (
        <UserContext.Provider value={{ user, token, login, logout, refreshUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
