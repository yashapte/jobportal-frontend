import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar.js'
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    Alert,
    CircularProgress,
} from '@mui/material';


const UserUpdateProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        id:''
    });

    const [profileImage, setprofileImage] = useState(null);
    const [userResumeURL, setuserResumeURL] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentuser, setCurrentuser] = useState({ id:'', name: '', profileImage: '', userResumeURL: '', isAdmin:false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {

                
                const userdetails = await axios.post('/admin/profile/rc', { withCredentials: true });
                const { _id, name, email, profileImage, userResumeURL,isAdmin } = userdetails.data.loggedinuser;
                setCurrentuser({
                    name: name,
                    isAdmin:isAdmin,
                    id: _id,
                    profileImage: profileImage ,
                    userResumeURL: userResumeURL

                });
            } catch (err) {
                console.error(err);
                setError('Failed to fetch user data');
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('_id', formData.id);

            if (profileImage) {
                data.append('profileImage', profileImage);
            }
            if (userResumeURL) {
                data.append('userResumeURL', userResumeURL);
            }

            const resposne = await axios.put(`/admin/adminupdateuser/${currentuser.id}`, data,{
                withCredentials: true
              ,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/admin/profile')
        } catch (err) {
            console.error(err);
            setError('Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar data={currentuser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Update User
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            placeholder={currentuser.name}
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                            Profile Image:
                        </Typography>
                        <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
                            Upload Profile Image
                            <input
                                type="file"
                                name="profileImage"
                                accept="image/*"
                                hidden
                                onChange={(e) => setprofileImage(e.target.files[0])}
                            />
                        </Button>

                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                            Resume (PDF):
                        </Typography>
                        <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
                            Upload Resume
                            <input
                                type="file"
                                name="userResumeURL"
                                accept="application/pdf"
                                hidden
                                onChange={(e) => setuserResumeURL(e.target.files[0])}
                            />
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </>
    );
};

export default UserUpdateProfile;
