import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/userSlice';

const LoadUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        } else {
            dispatch(clearUser()); // optional
        }
    }, [dispatch]);

    return null; // Doesn't render anything
};

export default LoadUser;