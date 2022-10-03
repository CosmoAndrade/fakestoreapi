import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from "../../assets/logo.svg"
import './style.css'




const pages = ["Página inicial ", "Vendas", "Produtos", "Clientes", "Marketing"];


const CustomMenu = () => {

  
    return (
                <AppBar position="static" color="inherit"    >
                    <Container maxWidth="xl">

                        <Toolbar disableGutters>
                            <img src={Logo} alt="logo" />
                            <Typography
                                variant="h1"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    ml: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    fontSize: '20px',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Lojinha Mime


                            </Typography>


                            <div className='container'>

                                {pages.map((item, index) => (
                                    <Button key={index} color="inherit"  >
                                        {item}
                                    </Button>

                                ))}
                            </div>



                        </Toolbar>

                    </Container>
                </AppBar>
    );
};
export default CustomMenu;
