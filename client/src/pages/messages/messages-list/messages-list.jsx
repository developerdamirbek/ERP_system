import React from 'react'
import { request } from '../../../config/request'
import { Card, Stack, Typography } from '@mui/material'
import { loadState } from '../../../lib/storage'

export const MessagesList = () => {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    request.get("/messages").then((res) => {
      setData(res.data)
    })
  }, [])
  return (
    <div>
      <Typography marginBottom={'30px'} variant='h4'>
        Message List
      </Typography>
      <Stack sx={{ height: "500px", overflowY: "auto" }}>
        {data.map((item) => <Stack marginBottom={'20px'} display={'flex'} justifyContent={'space-between'} padding={"20px"} borderRadius={'10px'} border={'1px solid #444'} width={'95%'} key={item.id}>
          <Stack>
            <Typography variant='h6'>
              {item.firstName}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant='h6'>
              {item.lastName}
            </Typography>
          </Stack>
          <Stack sx={{width: '100px', height:"100px"}}>
              <img style={{objectFit: "cover", width:"100%"}} src={item.img} width="100px" height="100px" alt="" />
          </Stack>
        </Stack>)}
      </Stack>
    </div>
  )
}
