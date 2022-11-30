import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import './../styles/Nav.css'

const Nav = (props) => {
    return (
        <div className='navContainer'>
            <div className='nav'>
                <h3>Hello, {props.userName}!</h3>
                <IconButton>
                        <LogoutIcon style={{color: 'red' }} onClick={props.signOut} />
                </IconButton>
                {/* <Button style={{backgroundColor: 'red' }} variant='contained' onClick={props.signOut}>Sign Out</Button> */}
            </div>
        </div>
    );
};

export default Nav;