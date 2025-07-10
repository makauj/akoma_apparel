import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderSuccess: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 400 }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                    Order Successful!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Thank you for your purchase. Your order has been placed successfully.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                    sx={{ mr: 1 }}
                >
                    Go to Home
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/orders"
                >
                    View Orders
                </Button>
            </Paper>
        </Box>
    );
};

export default OrderSuccess;