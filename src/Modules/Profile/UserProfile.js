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


const UserProfile = () => {
  const navigate = useNavigate();
  const [updateui, setUpdateui] = useState(false)
  const [job, setJobs] = useState([])
  const [currentuser, setCurrentuser] = useState({
    id: '',
    name: '',
    email: ''
  })

  useEffect(() => {
    const fetchJobs = async (e) => {
      try {

        const userdetails = await axios.post('/user/profile', {}, { withCredentials: true });
        const { _id, name, email } = userdetails.data.loggedinuser;
        console.log(_id, name, email)
        setCurrentuser({ id: _id, name, email });

        const response = await axios.get('/admin/alljobs');
        setJobs(response.data.alljobs);


      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [updateui]);

  async function handleApply(jobid) {
    setUpdateui(!updateui)
    const userId = currentuser.id;
    console.log("Button clicked")
    console.log(jobid,userId)

    try {
      const response = await axios.post(`/user/apply/${jobid}`, { userId });
      console.log(response.data);
    } catch (err) {
      console.error('Error applying:', err);
    }
  }


  const handlelogout = async (e) => {
    //e.preventDefault();
    await axios.post('/logout')
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
            <Typography variant="h5">{currentuser.name}</Typography>
            <Typography variant="subtitle1">{currentuser.email}</Typography>
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
          {job.map((job,key) => (
            <Grid item xs={12} key={job.id}>
              <Card>
                <CardContent>
                <Typography variant="p">ID {key+1}</Typography>
                <Typography variant="h6">{job.name}</Typography>
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
                      onClick={() => handleApply(job._id)}
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
  )
}

export default UserProfile;



