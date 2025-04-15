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
        address: '',
        password: '',
      });

    const  handleRegister= async (e)=>{
      navigate('/')
        //const response = await axios.post('/register', formdata);
    }
     function handleChange(e){
        const { name, value } = e.target;
        setFormData((prevForm) => ({
                ...prevForm,
            [name]: value
            
    }),
   // console.log(e.target.value)
)}


const handleLoginRedirect =()=>{

}

const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({ name: '', email: '', address: '', password: '' });
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
              label="Address"
              name="address"
              margin="normal"
              value={formdata.address}
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
        // <Fragment>
        // <form  id="Register">
        // <div className="mb-3">
        // <label className="form-label">Email address</label>
        //             <input  name="email"
        //             type="email"
        //             className="form-control"
        //             id="email"
        //             placeholder="Enter your email"
        //             value={formdata.email}
        //             onChange={handleChange}
        //          />
        // </div>
        // <div className="mb-3">
        //          <label className="form-label">Full Name</label>
        //          <input name="name"
        //             type="text"
        //             className="form-control"
        //             id="name"
        //             placeholder="Enter your full name"
        //             value={formdata.name}
        //             onChange={handleChange}/>
                 
        // </div>
        // <div className="mb-3">
        //          <label className="form-label">Password</label>
        //          <input name="password"
        //             type="password"
        //             className="form-control"
        //             id="password"
        //             placeholder="Enter your password"
        //             value={formdata.password}
        //             onChange={handleChange}/>
        // </div>
        // <button onClick={handlesubmit} type="submit" className="btn btn-primary">Submit</button>
        // </form>
        // </Fragment>
    
      
    )
}

export default Register;

