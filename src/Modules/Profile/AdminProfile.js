import React, { useState } from 'react';
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

const initialJobs = [
  {
    id: 1,
    name: 'React Developer',
    jd: 'Build and maintain frontend applications.',
    applicants: 10,
  },
  {
    id: 2,
    name: 'Node.js Backend',
    jd: 'Develop server-side APIs and services.',
    applicants: 7,
  },
];

const AdminProfilePage = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);const [formData, setFormData] = useState({
    id: null,
    name: '',
    jd: '',
    company: '',
    experience: '',
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')
    console.log('Admin logged out');
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
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

  const handleSave = () => {
    if (editMode) {
      // Update existing job
      setJobs(jobs.map((job) => (job.id === formData.id ? formData : job)));
    } else {
      // Add new job
      const newJob = {
        ...formData,
        id: Date.now(),
        applicants: 0,
      };
      setJobs([...jobs, newJob]);
    }
    setOpenDialog(false);
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
          <Typography variant="h5">Admin</Typography>
          <Typography variant="subtitle1">admin@example.com</Typography>
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
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {job.jd}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Applicants: {job.applicants}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(job)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(job.id)}
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
            label="Years of experience"
            name="experience"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
          margin="dense"
          label="Company"
          name="company"
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
