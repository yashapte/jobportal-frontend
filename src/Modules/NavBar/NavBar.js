import React from 'react'
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState, Fragment } from 'react';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';

import {
    Typography,
    Box,
    Button,
    IconButton,
    Divider,
    Stack
} from '@mui/material';

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

const NavBar = ({ data, searchQuery, setSearchQuery }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();
    
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);

    }
    const handleLogout = async (e) => {
        await axios.post('/logout')
        navigate('/')
        console.log('Admin logged out');
    };

    const handleJobs = (e) => {
        e.preventDefault();
        navigate('/Applied')
    }
    return (
        <Fragment>
            <AppBar position="static" color="inherit" elevation={1}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography variant="h6" color="primary" fontWeight={700}>
                            फुलेरा naukri
                        </Typography>
                        {/* {data.isAdmin ? "" : <Button onClick={handleJobs} variant="text" color="inherit">Applied</Button>} */}
                        <Button onClick={handleJobs} variant="text" color="inherit">Applied</Button>
                    </Box>

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


                    <IconButton onClick={toggleDrawer(true)}>
                        <Avatar alt="Profile" src={data.profileImage} />
                    </IconButton>
                </Toolbar>
            </AppBar>


            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                        Profile
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Avatar
                            src={data.profileImage}
                            alt="Profile"
                            sx={{ width: 80, height: 80, margin: '0 auto' }}
                        />
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={2}>
                            <PersonIcon fontSize="small" color="action" />
                            <Typography variant="h6">{data.name}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={1}>
                            <EmailIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">{data.email}</Typography>
                        </Stack>
                    </Box>

                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                            <DescriptionIcon fontSize="small" color="action" />
                            <Typography
                                component="a"
                                href={data.
                                    userResumeURL}
                                target="_blank"
                                download
                                sx={{
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                    cursor: 'pointer',
                                    '&:hover': { color: 'primary.dark' }
                                }}
                            >
                                {data.name} Resume
                            </Typography>
                        </Stack>
                    </Box>
                    {/* )} */}

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

        </Fragment>
    )
}

export default NavBar;