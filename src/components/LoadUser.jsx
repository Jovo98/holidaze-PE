import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

const LoadUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUserStr = localStorage.getItem('user');
        if (storedUserStr) {
            try {
                const storedUser = JSON.parse(storedUserStr);
                storedUser.accountType = storedUser.accountType === 'true';
                dispatch(setUser(storedUser));
            } catch (err) {
                console.error('Error parsing stored user:', err);
            }
        }
    }, [dispatch]);

    return null;
};

export default LoadUser;