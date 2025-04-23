import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import axios from 'axios'; 

const AdminProfilePage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentuser,setCurrentuser] = useState({
    id:'',
    name:'',
    email:''
  })
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: 'null',
    name: '',
    jd: '',
    company: '',
    experience: '',
  });

  useEffect(() => {
    const fetchdetails = async (e) => {
      try {
        
        const userdetails = await axios.post('/admin/profile/rc', {}, { withCredentials: true });
        const { _id, name, email } = userdetails.data.loggedinuser;
        console.log(_id, name, email)
        setCurrentuser({ id: _id, name, email});

        const response = await axios.get('/admin/alljobs');
        setJobs(response.data.alljobs);
        console.log(response.data)


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
  
      // Remove job from state
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

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* Admin Info */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h5">{currentuser.name}</Typography>
          <Typography variant="subtitle1">{currentuser.email}</Typography>
        </Box>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>

      {/* Create New Job */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New Job
        </Button>
      </Box>

      {/* Job Cards */}
      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {job.jd}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Applicants: {job.applicants.length}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(job._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Create / Update */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editMode ? 'Update Job' : 'Create Job'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Job Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Job Description"
            name="jd"
            fullWidth
            multiline
            rows={4}
            value={formData.jd}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminProfilePage;
