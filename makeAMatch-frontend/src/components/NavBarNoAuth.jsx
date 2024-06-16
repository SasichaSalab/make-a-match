import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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


const NavBarNoAuth = ({ scrollToRef, headerRef, aboutUsRef, refundRef }) => {
    const navigate = useNavigate();


    const [alignment, setAlignment] = React.useState('home');

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            if (newAlignment === 'shop') {
                navigate('/products');
            } else if (newAlignment === 'match') {
                navigate('/matchs');
            } else if (newAlignment === 'home') {
                scrollToRef(headerRef);
            } else if (newAlignment === 'aboutus') {
                scrollToRef(aboutUsRef);
            } else if (newAlignment === 'refund') {
                scrollToRef(refundRef);
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full flex flex-row h-14 z-50 items-center justify-center">
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
                    <CustomToggleButton value="aboutus" aria-label="centered">
                        ABOUT US
                    </CustomToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
};

export default NavBarNoAuth;
