import React, { Fragment, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Stack,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Profile() {


  const jobs = [
    { id: 1, name: 'Frontend Developer', jd: 'Develop responsive UI using React and MUI.' },
    { id: 2, name: 'Backend Engineer', jd: 'Build RESTful APIs using Node.js and Express.' },
    { id: 3, name: 'DevOps Specialist', jd: 'Manage CI/CD pipelines and infrastructure.' },
  ];

  const navigate = useNavigate();
  const [job, setJobs] = useState([])
  const [currentuser,setCurrentuser]=useState({
    id:"",
    name:"",
    email:"",
    applicants:[]
  })

  const handleapply= async (e)=>{
    e.preventDefault();
    console.log(currentuser.id)
    const applied = await axios.post('/apply/:{currentuser.id}')
  }

  const handleApply =()=>{

  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        
        const userdetails = await axios.post('/profile')
        const { _id, name, email,applicants } = userdetails.data.loggedinuser;
        setCurrentuser({ id: _id, name, email,applicants });


        console.log(currentuser)
        const response = await axios.get('/admin/alljobs');
        setJobs(response.data.alljobs);
        console.log(response.data)


      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);


  const handlelogout = async (e) => {
    // e.preventDefault();
    // await axios.post('/logout')
    navigate('/')
  }
  return (
    
    <>
      <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* User Info */}
      <Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  }}
>
  <Box>
    <Typography variant="h5">John</Typography>
    <Typography variant="subtitle1">john@gmail.com</Typography>
    <Typography variant="body2" color="text.secondary">
      Organization: ABC Corp
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Phone: +1 234 567 890
    </Typography>
  </Box>

  <Button
    variant="contained"
    color="error"
    onClick={handlelogout}
    sx={{ mt: { xs: 2, sm: 0 } }}
  >
    Logout
  </Button>
</Paper>


      {/* Jobs Cart */}
      <Typography variant="h6" gutterBottom>
        Jobs Cart
      </Typography>

      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {job.jd}
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Applicants: {job.applicants}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>


    </>

    // <Fragment>
    //   <nav className="navbar bg-primary" data-bs-theme="dark">
    //     <div className="container-fluid">
    //       <a className="navbar-brand" href="#"> Profile</a>
    //       <div>
    //         <a href="/logout" onClick={handlelogout} type="button" className="btn btn-light">Logout</a>
    //       </div>
    //     </div>
    //   </nav>

    //   <div className="main-header">
    //     <div className="card-header-main">
    //       <h3>Welcome {currentuser.name}</h3>
    //       <p>Below are the all active jobs</p>

    //     </div>
    //     {
    //       job.length == 0 ? (
    //         <p>No jobs available right now.</p>
    //       ) : (
    //         job.map((details,key) => (
    //           <div key={key} className="card">
    //             <h5 className="card-header">{details.jobname}</h5>
    //             <div className="card-body">
    //               <p className="card-title">{details.jd}</p>
    //               <p className="card-text">No. of applicants {details.applicants.length}</p>
    //               <button onClick={handleapply} className="btn btn-primary">Apply </button>
    //             </div>
    //           </div>
    //         ))
    //       )
    //     }
    //   </div>
    // </Fragment>
  )
}

export default Profile



