import React, { Fragment, useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Tabs,
    Tab,
    Typography,
    Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [logindata, setlogindata] = useState({
        email: '',
        password: ''
    });


    const handlesubmit = async (e) => {
      try {
        e.preventDefault()
        const response = activeTab === 0 ? await axios.post('/user/login', logindata,{withCredentials: true})
        :await axios.post('/admin/login/rc', logindata,{withCredentials: true})
       console.log(response)
          console.log(logindata,activeTab)
        activeTab===0? 
        navigate('/user/profile')
        :navigate('/admin/profile')
      } catch (error) {
        alert("No Admin access")
      }
            

    }

    const handleRegister = async (e) => {
            navigate('/register');

    }
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setlogindata((prevForm) => ({
            ...prevForm,
            [name]: value

        })
            // console.log(e.target.value)
        )
    }

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
      };
    return (

        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
        <Card sx={{ width: 400, padding: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered>
            <Tab label="User" />
            <Tab label="Admin" />
          </Tabs>
  
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {activeTab === 0 ? 'User' : 'Admin'} Login
            </Typography>
  
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                name="email"
                value={logindata.email.value}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                value={logindata.password.value}
                onChange={handleChange}
              />
  
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handlesubmit}
              >
                Login
              </Button>
  
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mt: 1 }}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
}

export default Login;

