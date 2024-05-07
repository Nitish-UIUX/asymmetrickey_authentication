import React, { useEffect, useState } from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async (e) => {
      try {
        const response = await axios.get('http://localhost:8800/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        // Handle error, such as invalid token or network issues
        console.error('Error fetching user:', error);
        // Optionally, redirect to login page if token is invalid
        navigate('/login');
      }
    };

    if (token) {
      fetchUser();
    } else {
      // Redirect to login page if token is not present
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Grid container spacing={2} justifyContent="center" style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
          {user && (
            <>
              <Typography variant="body1" gutterBottom>
                First Name: {user.firstName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Last Name: {user.lastName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: {user.email}
              </Typography>
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
