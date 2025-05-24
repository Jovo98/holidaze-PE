import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function AvatarEditModal({ open, handleClose, avatarUrl, onSave }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        // Here you would upload the image to your server, then update user avatar
        // For demo, we simulate the change locally
        if (previewUrl) {
            onSave(previewUrl); // pass preview URL or new data to parent
        }
        handleClose();
    };

    const handleCancel = () => {
        // Reset state on cancel
        setSelectedFile(null);
        setPreviewUrl(null);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth>
            <DialogTitle>Edit Avatar</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                {/* Show selected image or current avatar */}
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" style={{ width: 200, borderRadius: 8, marginBottom: 16 }} />
                ) : (
                    <img src={avatarUrl} alt="Current Avatar" style={{ width: 200, borderRadius: 8, marginBottom: 16 }} />
                )}

                {/* Upload new image */}
                <Button variant="contained" component="label">
                    Upload New Image
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Button>
            </DialogContent>
            {/* Action buttons */}
            <DialogActions>
                <Button onClick={handleCancel} color="secondary" variant="outlined">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    disabled={!selectedFile}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AvatarEditModal;