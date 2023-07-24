import { useState, useEffect, createContext } from 'react';
import fetchFromApi from '../api/api';
import cookie from 'js-cookie';

// Define UserContext here before using it in UserProvider
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = cookie.get('token');

            if (token) {
                try {
                    const data = await fetchFromApi('users/', 'GET', null, {
                        Authorization: `Token ${token}`,
                    });

                    setUser(data[0]);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };

