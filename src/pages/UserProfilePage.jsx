import { useSelector } from 'react-redux';
import Header from '../components/Header';
import React from "react";
function ProfilePage() {
    const user = useSelector((state) => state.user.data);
    console.log('User data from redux:', user);
    if (!user) {
        return <p>No user data. Please log in.</p>;
    }

    const { name, email, bio, avatar, banner } = user;

    return (

        <>
            <Header />
        <div style={{ maxWidth: '700px', margin: '50px auto', padding: '20px' }}>
            <h1>{name}</h1>
            {banner?.url && (
                <img src={banner.url} alt={banner.alt || 'Banner'} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            )}
            {avatar?.url && (
                <img src={avatar.url} alt={avatar.alt || 'Avatar'} style={{ width: '150px', height: '150px', borderRadius: '50%', marginTop: '-75px', border: '4px solid white' }} />
            )}
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Bio:</strong> {bio || 'No bio provided.'}</p>
        </div>
        </>

    );
}

export default ProfilePage;