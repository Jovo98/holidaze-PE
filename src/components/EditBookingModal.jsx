const EditBookingModal = ({ open, onClose, booking, fetchBookings, setSnackbarMessage, setSnackbarOpen }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [guests, setGuests] = useState(0);

    useEffect(() => {
        if (booking) {
            setDateFrom(booking.dateFrom);
            setDateTo(booking.dateTo);
            setGuests(booking.guests);
        }
    }, [booking]);

    const handleSubmit = async () => {
        try {
            await api.put(`/holidaze/bookings/${booking.id}`, {
                dateFrom,
                dateTo,
                guests,
            });
            setSnackbarMessage('Update successful!');
            setSnackbarOpen(true);
            fetchBookings(); // Refresh bookings after update
            onClose(); // Close the modal
        } catch (err) {
            alert('Failed to update booking.');
            console.error('Update error:', err);
        }
    };

    if (!booking) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogContent>
                <TextField
                    label="From Date"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="To Date"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Guests"
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    );
};