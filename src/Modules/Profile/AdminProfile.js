import React, { useState, useEffect, Fragment } from 'react';

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';


import NavBar from '../NavBar/NavBar.js'
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  Drawer,
  Card,
  CardContent,
  IconButton,
  Collapse,
  DialogContent,
  TextField,
  DialogActions,
  Divider
} from '@mui/material';
import axios from 'axios';

const AdminProfilePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [currentuser, setCurrentuser] = useState({ id: '', name: '', email: '', profileImage:'',userResumeURL:'' });
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);
  const [formData, setFormData] = useState({ id: 'null', jobname: '', jd: '', company: '', experience: '' });
  useEffect(() => {
    const fetchdetails = async (e) => {
      try {

        const userdetails = await axios.post('/admin/profile/rc', { withCredentials: true });
        const { _id, name, email, profileImage, userResumeURL } = userdetails.data.loggedinuser;
        console.log(_id, name, email)
        setCurrentuser({ id: _id, name, email, profileImage, userResumeURL });

        const response = await axios.get('/admin/alljobs');
        console.log("This is response on all jobs ",response.data.alljobs)
        setJobs(response.data.alljobs);
       


      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchdetails();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/job/delete/${id}`, {
        withCredentials: true,
      });
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (job) => {
    setFormData(job);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setFormData({ id: null, jobname: '', jd: '', experience: '', company: '' });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleSave = async () => {


    try {
      const data = {
        jobname: formData.jobname,
        jd: formData.jd,
      };

      let response;

      if (editMode) {

        response = await axios.put(`/admin/updatejob/${formData._id}`, data, {
          withCredentials: true,
        });


        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === formData._id ? response.data.job : job
          )
        );
      } else {

        response = await axios.post('/admin/createjob', data, {
          withCredentials: true,
        });


        setJobs((prevJobs) => [...prevJobs, response.data.job]);
      }

      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving job:', error);
    }

  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleExpand = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };
  return (
    <Fragment>
      <NavBar data={currentuser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 5 }}>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button variant="contained"

            sx={{
              backgroundColor: '#30668a',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#30668a',
                border: '1px solid #30668a',
              }
            }}
            onClick={handleCreate}>Create New Job</Button>
        </Box>

        <Grid sx={{ mt: 3 }}>
          {jobs.filter((job) =>
            job.jobname.toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (



              <Grid item xs={12} key={job._id}>
                <Card sx={{ mb: 5, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2b8687' }}>
                          {job.jobname}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <GroupIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            Applicants: {job.applicants.length}
                          </Typography>
                        </Stack>
                      </Box>
                      <IconButton onClick={() => toggleExpand(job._id)} color="primary">
                        {expandedJob === job._id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Stack>

                    <Collapse in={expandedJob === job._id}>
                      <Box mt={2} sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, padding: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Job Description:</Typography>
                        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>{job.jd}</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Applicants:</Typography>
                        

                        {job.applicants.map((applicant, idx) => (
                          
                          <Box key={idx} sx={{ pl: 2, py: 1, backgroundColor: '#c2c5ff', borderRadius: 1, mb: 1 }}>
                            {console.log(applicant.userid.name)}
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Name:</Typography>
                            <Typography variant="body2">{applicant.userid.name}</Typography>
                            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>Email:</Typography>
                            <Typography variant="body2">{applicant.userid.email}</Typography>
                      
                            {applicant.userid.userResumeURL && (
                              <>
                           
                                <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>Resume:</Typography>
                                <Typography
                                  variant="body2"
                                  component="a"
                                   href={applicant.userid.userResumeURL}
                                  target="_blank"
                                  download
                                  sx={{
                                    textDecoration: 'underline',
                                    color: 'primary.main',
                                    cursor: 'pointer',
                                    '&:hover': { color: 'primary.dark' }
                                  }}
                                >
                                  View/Download Resume
                                </Typography>
                              </>
                            )}

                            <Divider sx={{ my: 1 }} />
                          </Box>
                        ))}

                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                            onClick={() => handleEdit(job)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            sx={{ borderColor: 'error.main', '&:hover': { borderColor: 'error.dark' } }}
                            onClick={() => handleDelete(job._id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>




            ))}
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogTitle>{editMode ? 'Update Job' : 'Create Job'}</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Job Name" name="jobname" fullWidth value={formData.jobname || ''} onChange={handleChange} />
            <TextField margin="dense" label="Job Description" name="jd" fullWidth multiline rows={4} value={formData.jd || ''} onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">{editMode ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fragment>

  );
};

export default AdminProfilePage;
