import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
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

function Register() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0)
  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImageUrl: ''
  });

  const handleRegister = async (e) => {
    console.log(formdata, activeTab)

    const formDataToSend = new FormData();
    formDataToSend.append('name', formdata.name);
    formDataToSend.append('email', formdata.email);
    formDataToSend.append('password', formdata.password);
    formDataToSend.append('profileImage', formdata.profileImageUrl); 


    const url = activeTab === 0 ? '/register/user' : '/admin/register/rc';

    try {
      const response = await axios.post(url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value

    }),
      //console.log(e.target.value)
    )
  }


  const handleLoginRedirect = () => {
    navigate('/')
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImageUrl: file,
    }));
    console.log(file.name)
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({ name: '', email: '', password: '' });
  };



  return (

    <>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card>
          <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
            <Tab label="User" />
            <Tab label="Admin" />
          </Tabs>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {activeTab === 0 ? 'User' : 'Admin'} Registration
            </Typography>

            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                margin="normal"
                value={formdata.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                value={formdata.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                value={formdata.password}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Profile Image"
                name="profileImageUrl"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { accept: 'image/*' },
                  type: 'file',
                }}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleRegister}
              >
                Register
              </Button>

              <Button
                fullWidth
                color="primary"
                onClick={handleLoginRedirect}
                sx={{ mt: 2 }}
              >
                Already have an account? Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default Register;

