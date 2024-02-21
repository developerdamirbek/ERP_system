import React from 'react'
import { Button, Grid, Stack, Typography } from "@mui/material"
import { Link, Navigate, Outlet } from 'react-router-dom'
import { loadState } from '../lib/storage'

export const MainLayout = () => {

    const user = loadState('user')
    if (!user) return <Navigate to="/" replace />

    return (
        <Grid container sx={{height:"0"}} spacing={2}>
            <Grid item xs={3} sx={{ bgcolor: "#101418", height: '100vh' }} >
                <Stack height={'100%'} padding={'20px'}>
                    <Typography variant='h4' color={"#fff"} paddingBottom={'20px'} borderBottom={'1px solid #fff'} marginBottom={'30px'}>
                        ERP System
                    </Typography>
                    <div className='button-group'>
                        <Link to="/app">
                            <Button fullWidth variant='outlined' style={{ border: "1px solid #fff", color: "#fff", paddingTop: "10px", paddingBottom: "10px", fontSize: "18px" }}>
                                Messages List
                            </Button>
                        </Link>
                        <Link to="create">
                            <Button fullWidth variant='outlined' style={{ border: "1px solid #fff", color: "#fff", paddingTop: "10px", paddingBottom: "10px", fontSize: "18px" }}>
                                Create Messages
                            </Button>
                        </Link>
                        <Link to="edit">
                            <Button fullWidth variant='outlined' style={{ border: "1px solid #fff", color: "#fff", paddingTop: "10px", paddingBottom: "10px", fontSize: "18px" }}>
                                Edit Messages
                            </Button>
                        </Link>
                    </div>
                </Stack>
            </Grid>
            <Grid item xs={9} padding={'20px'} paddingTop={'40px'} sx={{ bgcolor: "#FFF" }} >
                <Stack height={'100%'}>
                    <Outlet />
                </Stack>
            </Grid>
        </Grid>
    )
}
