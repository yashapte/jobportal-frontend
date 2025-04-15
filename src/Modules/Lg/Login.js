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
        email: "",
        password: ""
    });


    const handlesubmit = async (e) => {
        // try {
        //     e.preventDefault()
        //     await axios.post('/login', logindata);
           activeTab ===0? navigate('/user/profile'):navigate('/admin/profile');
            console.log(activeTab)
        // } catch (error) {
        //     console.log(error.msg)
        // }

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
                value={logindata.email.value}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
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
        // <Fragment>
        //     <form id="Register">
        //         <div className="mb-3">
        //             <label className="form-label">Email address</label>
        //             <input name="email"
        //                 type="email"
        //                 className="form-control"
        //                 id="email"
        //                 placeholder="Enter your email"
        //                 value={logindata.email.value}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div className="mb-3">
        //             <label className="form-label">Password</label>
        //             <input name="password"
        //                 type="password"
        //                 className="form-control"
        //                 id="password"
        //                 placeholder="Enter your full password"
        //                 value={logindata.password.value}
        //                 onChange={handleChange} />
        //         </div>
        //         <button onClick={handlesubmit} type="submit" className="btn btn-primary">Submit</button>
        //     </form>
        // </Fragment>


    )
}

export default Login;

