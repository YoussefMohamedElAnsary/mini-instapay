import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if(storedToken && storedUser){
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    } ,[])

    const login = ({user , token})=>{
        setUser(user)
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = ()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')    
        localStorage.removeItem('user')
    }


    if (loading) {
        return null; 
    }

// const refreshUser = async () => {
//     try {
//         if (!token) return;
        
//         const res = await axios.get('/api/auth/user', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         });
//         setUser(res.data);
//         localStorage.setItem('user', JSON.stringify(res.data));
//     } catch (err) {
//         console.error('Failed to refresh user:', err);
//     }
//     };



return (
    
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;
