import { Button } from '@mui/material';
import React from 'react';
import './../styles/Nav.css'

const Nav = (props) => {
    return (
        <div className='container'>
            <div className='nav'>
                <h1>Hello, {props.userName}!</h1>
                <Button style={{backgroundColor: 'red' }} variant='contained' onClick={props.signOut}>Sign Out</Button>
            </div>
        </div>
    );
};

export default Nav;