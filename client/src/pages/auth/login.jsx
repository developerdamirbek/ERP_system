import { Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { request } from '../../config/request'
import { toast } from 'react-toastify'
import { loadState, saveState } from '../../lib/storage'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const { reset, handleSubmit, register, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const submit = (data) => {
        request.post("/login", data).then((res) => {
            console.log(res.data);
            saveState('user', res.data)
            toast.success("User submitted successfully!")
        }).catch((error) => {
            toast.error(error?.message)
        }).finally(() => {
            if (loadState("user")) {
                navigate('/app', { replace: true })
            }
        })
        reset()
    }
    return (
        <Stack sx={{ position: "absolute", inset: 0, bgcolor: "#0F1924", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack width={'500px'} bgcolor={'#fff'} borderRadius={'15px'}>
                <Stack padding={'30px'}>
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            <TextField sx={{ mb: '30px' }} label="Email" variant="outlined" fullWidth {...register('email', { required: true })} type='email' />
                        </div>
                        <div>
                            <TextField sx={{ mb: '30px', color: "#fff" }} label="Password" variant="outlined" fullWidth {...register('password', { required: true })} type='password' />
                        </div>
                        <Button type='sumbit' fullWidth variant='contained' style={{ paddingBottom: "10px", paddingTop: "10px", fontSize: "19px" }}>
                            Login
                        </Button>
                    </form>
                </Stack>
            </Stack>
        </Stack>
    )
}
