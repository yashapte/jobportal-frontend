import React, { Fragment, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Stack
} from '@mui/material';
import NavBar from '../NavBar/NavBar.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserProfile = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [updateui, setUpdateui] = useState(false)

  const [jobs, setJobs] = useState([])
  const [currentuser, setCurrentuser] = useState({
    id: '',
    name: '',
    email: '',
    profileImage: '',
    userResumeURL:''
  })

  useEffect(() => {
    const fetchJobs = async (e) => {
      try { 

        const userdetails = await axios.post('/user/profile', {}, { withCredentials: true });
        const { _id, name, email, profileImage, userResumeURL, isAdmin } = userdetails.data.loggedinuser;
        
        setCurrentuser({ id: _id, name, email, profileImage,userResumeURL,isAdmin });

        const response = await axios.get('/admin/alljobs');
        setJobs(response.data.alljobs);


      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [updateui]);

  async function handleApply(jobid) {
    try {
      const userId = currentuser.id;
      const response = await axios.post(`/user/apply/${jobid}`,{userId});
      setUpdateui(!updateui)
      alert("Applied")
    } catch (err) {
      alert("Alredy applied")
      console.error('Error applying:', err.message);
    }
  }

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setCurrentuser((prevData) => ({
  //     ...prevData,
  //     userResumeURL: file,
  //   }));
  //   console.log("This is resume",file)

  // }

  const handlelogout = async (e) => {
    //e.preventDefault();
    await axios.post('/logout')
    navigate('/')
  }
  return (

    <Fragment>
      <NavBar data={currentuser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 5 }}>

        <Typography variant="h6" gutterBottom>
          Jobs Cart
        </Typography>

        <Grid>
          {jobs.filter((job) =>
            job.jobname.toLowerCase().includes(searchQuery.toLowerCase())).map((job, key) => (
              <Grid item xs={12} key={job._id} sx={{ mb: 4 }} >
                <Card>
                  <CardContent>
                    <Typography variant="h6">{job.jobname}</Typography>
                    <Typography variant="p">ID {key + 1}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {job.jd}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Applicants: {job.applicants.length}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={()=>handleApply(job._id)}
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


    </Fragment>
  )
}

export default UserProfile;



