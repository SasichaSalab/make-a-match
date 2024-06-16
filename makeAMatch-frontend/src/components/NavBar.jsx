import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { AccountCircle, Favorite, ShoppingBag, Menu } from '@mui/icons-material';
import { Badge, IconButton, Button, Drawer, List, ListItem, ListItemText, Divider, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.primary.main,
    padding: '5px 20px 5px 20px',
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderColor: theme.palette.secondary.main,
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.contrastText,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
    },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
    fontSize: '0.7rem',
}));

const NavBar = ({ scrollToRef, headerRef, aboutUsRef, refundRef }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleFavorite = () => {
        navigate('/favorite');
    };

    const handleCart = () => {
        navigate('/order/cart');
    };

    const handleMenuClick = () => {
        setDrawerOpen(!drawerOpen);
    };

    const [alignment, setAlignment] = useState('home');

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            if (newAlignment === 'shop') {
                navigate('/products');
            } else if (newAlignment === 'match') {
                navigate('/matches');
            } else if (newAlignment === 'home') {
                scrollToRef(headerRef);
            } else if (newAlignment === 'aboutus') {
                scrollToRef(aboutUsRef);
            } else if (newAlignment === 'refund') {
                scrollToRef(refundRef);
            }
        }
    };

    const isSmallScreen = useMediaQuery('(max-width:850px)');

    if (isSmallScreen) {
        return (
            <>
                <IconButton aria-label="menu" onClick={handleMenuClick}>
                    <Menu />
                </IconButton>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <List>
                        <ListItem button onClick={() => handleAlignment(null, 'home')}>
                            <ListItemText primary="HOME" />
                        </ListItem>
                        <ListItem button onClick={() => handleAlignment(null, 'shop')}>
                            <ListItemText primary="SHOP" />
                        </ListItem>
                        <ListItem button onClick={() => handleAlignment(null, 'match')}>
                            <ListItemText primary="MATCH" />
                        </ListItem>
                        <ListItem button onClick={() => handleAlignment(null, 'aboutus')}>
                            <ListItemText primary="ABOUT US" />
                        </ListItem>
                        <ListItem button onClick={() => handleAlignment(null, 'refund')}>
                            <ListItemText primary="REFUND" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleFavorite}>
                            <ListItem>
                                <Favorite />
                            </ListItem>
                            <ListItemText primary="Favorite" />
                        </ListItem>
                        <ListItem button onClick={handleCart}>
                            <ListItem>
                                <ShoppingBag />
                            </ListItem>
                            <ListItemText primary="Cart" />
                        </ListItem>
                        <ListItem button onClick={logout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
            </>
        );
    }

    return (
        <div className="fixed top-0 left-0 w-full flex flex-row h-14 z-50">
            <div className="w-1/4 h-full"></div>
            <div className="w-2/4 h-full items-center flex flex-row justify-center">
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <CustomToggleButton value="home" aria-label="left aligned">
                        HOME
                    </CustomToggleButton>
                    <CustomToggleButton value="shop" aria-label="centered">
                        SHOP
                    </CustomToggleButton>
                    <CustomToggleButton value="match" aria-label="centered">
                        MATCH
                    </CustomToggleButton>
                    <CustomToggleButton value="aboutus" aria-label="centered">
                        ABOUT US
                    </CustomToggleButton>
                    <CustomToggleButton value="refund" aria-label="right aligned">
                        REFUND
                    </CustomToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="w-1/4 h-full items-center flex flex-row justify-end gap-4">
                <IconButton aria-label="favorite" onClick={handleFavorite}>
                    <Favorite sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton aria-label="cart" onClick={handleCart}>
                    <Badge badgeContent={4} color="primary">
                        <ShoppingBag sx={{ fontSize: 30 }} />
                    </Badge>
                </IconButton>
                <LogoutButton variant="contained" onClick={logout}>Logout</LogoutButton>
            </div>
        </div>
    );
};

export default NavBar;
