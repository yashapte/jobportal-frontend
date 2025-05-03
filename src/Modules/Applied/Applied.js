import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar.js'
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Applied() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentuser, setCurrentuser] = useState({ id: '', name: '', email: '', isAdmin: false });
  const [jobs, setJobs] = useState([]);


  useEffect(() => {
    const fetchdetails = async (e) => {
      try {

        const userdetails = await axios.post('/admin/profile/rc', { withCredentials: true });
        const { _id, name, email, profileImage, isAdmin } = userdetails.data.loggedinuser;
        console.log(_id, name, email, isAdmin)
        setCurrentuser({ id: _id, name, email, profileImage, isAdmin });

        const response = await axios.get('/user/allapplied');
        console.log("This is applied jobs data ",response)
        setJobs(response.data.appliedJobs)


      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchdetails();
  }, []);
  return (
    <>
      <NavBar data={currentuser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 10 }}>
        <Grid   sx={{ mb: 5,display: 'flex'
               
            }}>
          {jobs.map((items) => (
            <Card
              key={items._id}
              sx={{
                width: 320,
                height: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                backgroundColor: '#fff',
                mb: 2,
                mr: 5
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {items.jobname}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {items.jd}
                </Typography>
              </CardContent>

              <Box px={2} pb={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CheckCircleIcon sx={{ color: 'green' }} />
                  <Typography variant="body2" sx={{ color: 'green', fontWeight: 500 }}>
                    Applied
                  </Typography>
                </Stack>
              </Box>
            </Card>
          ))}

        </Grid>



      </Container>
    </>
  )
}

export default Applied