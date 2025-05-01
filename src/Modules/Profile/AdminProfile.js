import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: 400,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: '100%',
}));




const AdminProfilePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentuser, setCurrentuser] = useState({ id: '', name: '', email: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);
  const [formData, setFormData] = useState({ id: 'null', name: '', jd: '', company: '', experience: '' });
  useEffect(() => {
    const fetchdetails = async (e) => {
      try {

        const userdetails = await axios.post('/admin/profile/rc', { withCredentials: true });
        const { _id, name, email, profileImage } = userdetails.data.loggedinuser;
        console.log(_id, name, email)
        setCurrentuser({ id: _id, name, email, profileImage });

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


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    const handleLogout = () => {
      // logout logic
      console.log("Logged out");
    };
  }
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
    setFormData({ id: null, name: '', jd: '', experience: '', company: '' });
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
    <Container sx={{ mt: 5 }}>

      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant="h6" color="primary" fontWeight={700}>
              naukri
            </Typography>
            <Button variant="text" color="inherit">Jobs</Button>
          </Box>

          {/* Center */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="action" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search jobs here"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>

          {/* Right: Avatar */}
          <IconButton onClick={toggleDrawer(true)}>
            <Avatar alt="Profile" src={currentuser.profileImage} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Profile
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Avatar
              src={currentuser.profileImage}
              alt="Profile"
              sx={{ width: 80, height: 80, margin: '0 auto' }}
            />
            <Typography variant="h6" mt={2}>{currentuser.name}</Typography>
            <Typography variant="body2" color="text.secondary">{currentuser.email}</Typography>
          </Box>
          <List>
            <ListItem button>
              <ListItemText primary="Update Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>Create New Job</Button>
      </Box>

      <Grid sx={{ mt: 3 }}>
        {jobs.filter((job) =>
          job.jobname.toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (
              <Grid item xs={12} key={job._id}>
                <Card sx={{ mb: 5 }} >
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
          <TextField margin="dense" label="Job Name" name="name" fullWidth value={formData.name || ''} onChange={handleChange} />
          <TextField margin="dense" label="Job Description" name="jd" fullWidth multiline rows={4} value={formData.jd || ''} onChange={handleChange} />
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
