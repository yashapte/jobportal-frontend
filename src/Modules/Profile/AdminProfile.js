import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Collapse,
  IconButton,
  Divider
} from '@mui/material';
import axios from 'axios'; 

const AdminProfilePage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentuser, setCurrentuser] = useState({ id: '', name: '', email: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);
  const [formData, setFormData] = useState({ id: 'null', name: '', jd: '', company: '', experience: '' });
  useEffect(() => {
    const fetchdetails = async (e) => {
      try {
        
        const userdetails = await axios.post('/admin/profile/rc', {}, { withCredentials: true });
        const { _id, name, email } = userdetails.data.loggedinuser;
        console.log(_id, name, email)
        setCurrentuser({ id: _id, name, email});

        const response = await axios.get('/admin/alljobs');
        setJobs(response.data.alljobs);
        console.log(response.data.alljobs)
        
        
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchdetails();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    await axios.post('/logout')
    navigate('/')
    console.log('Admin logged out');
  };

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
    setFormData({ id: null, name: '', jd: '' ,experience:'',company:''});
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleSave = async () => {


    try {
      const data = {
        jobname: formData.name,
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
    <Container maxWidth="md" sx={{ mt: 5 }}>
    <Paper elevation={3} sx={{ p: 3, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h5">{currentuser.name}</Typography>
        <Typography variant="subtitle1">{currentuser.email}</Typography>
      </Box>
      <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
    </Paper>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <Button variant="contained" color="primary" onClick={handleCreate}>Create New Job</Button>
    </Box>

    <Grid >
      {jobs.map((job) => (
        <Grid sx={{mt: 4}} item xs={12} key={job._id}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                <Typography variant="h6">{job.jobname}</Typography>
                  <Typography variant="body2" color="text.secondary">Applicants: {job.applicants.length}</Typography>

                </Box>
                <IconButton onClick={() => toggleExpand(job._id)}>
                  {expandedJob === job._id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Stack>
              <Collapse in={expandedJob === job._id}>
                <Box mt={2}>
                  <Typography variant="subtitle2">Job Description:</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>{job.jd}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2">Applicants:</Typography>
                  {job.applicants.map((applicant, idx) => (
                    <Box key={idx} sx={{ pl: 2, py: 1 }}>
                      <Typography variant="body2">Name: {applicant.name} </Typography>
                      <Typography variant="body2">Email: {applicant.email}</Typography>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  ))}
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="outlined" size="small" onClick={() => handleEdit(job)}>Update</Button>
                    <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(job._id)}>Delete</Button>
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
        <TextField margin="dense" label="Job Name" name="name" fullWidth  value={formData.name || ''} onChange={handleChange} />
        <TextField margin="dense" label="Job Description" name="jd" fullWidth multiline rows={4}value={formData.jd || ''}  onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">{editMode ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  </Container>

  );
};

export default AdminProfilePage;
