import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function AvatarEditModal({ open, handleClose, avatarUrl, bannerUrl, onSave }) {
    const [avatarInput, setAvatarInput] = useState(avatarUrl || '');
    const [bannerInput, setBannerInput] = useState(bannerUrl || '');

    const [avatarPreview, setAvatarPreview] = useState(avatarUrl);
    const [bannerPreview, setBannerPreview] = useState(bannerUrl);

    const handleAvatarInputChange = (e) => {
        const url = e.target.value;
        setAvatarInput(url);
        setAvatarPreview(url);
    };

    const handleBannerInputChange = (e) => {
        const url = e.target.value;
        setBannerInput(url);
        setBannerPreview(url);
    };

    const handleSaveClick = () => {
        onSave({
            avatarUrl: avatarInput,
            bannerUrl: bannerInput,
        });
        handleClose();
    };

    const handleCancel = () => {
        setAvatarInput(avatarUrl || '');
        setBannerInput(bannerUrl || '');
        setAvatarPreview(avatarUrl);
        setBannerPreview(bannerUrl);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Profile Images</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
                <TextField
                    label="Avatar URL"
                    variant="outlined"
                    value={avatarInput}
                    onChange={handleAvatarInputChange}
                />
                {avatarPreview && (
                    <div style={{ textAlign: 'center' }}>
                        <p>Avatar Preview:</p>
                        <img src={avatarPreview} alt="Avatar Preview" style={{ width: 200, borderRadius: 8 }} />
                    </div>
                )}

                <TextField
                    label="Banner URL"
                    variant="outlined"
                    value={bannerInput}
                    onChange={handleBannerInputChange}
                />
                {bannerPreview && (
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <p>Banner Preview:</p>
                        <img src={bannerPreview} alt="Banner Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="secondary" variant="outlined">
                    Cancel
                </Button>
                <Button
                    onClick={handleSaveClick}
                    color="primary"
                    variant="contained"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AvatarEditModal;