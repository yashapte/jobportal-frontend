import React,{ Fragment,useState } from 'react';
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

function Register () {
    
    // const [formdata, setform] = useState({
    //     email:"",
    //     name:"",
    //     password:""
    // });
      const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0)
    const [formdata, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });

    const  handleRegister= async (e)=>{
      console.log(formdata,activeTab)

     const response =  await (activeTab === 0
        ? axios.post('/register/user', formdata)
        : axios.post('/admin/register/rc', formdata));
        console.log(response)

        navigate('/')
    }
     function handleChange(e){
        const { name, value } = e.target;
        setFormData((prevForm) => ({
                ...prevForm,
            [name]: value
            
    }),
   //console.log(e.target.value)
)}


const handleLoginRedirect =()=>{
  
  navigate('/')
}

const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({ name: '', email: '', password: '' });
  };


    
    return(

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

