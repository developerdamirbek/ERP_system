import React, { useState, useEffect } from 'react'
import { request } from '../../../config/request'
import { Typography, Stack, TextField, Button } from '@mui/material'
import { toast } from 'react-toastify';

export const EditMessage = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    request.get("/messages").then((res) => {
      setData(res.data)
    })
  }, []);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, newData) => {
    request.put(`/messages/${id}`, newData)
      .then(() => {
        setData(prevData => {
          const newDataArray = prevData.map(item => {
            if (item.id === id) {
              return newData;
            }
            return item;
          });
          return newDataArray;
        });
        setEditingId(null);
        toast.success("Items was saved!")
      })
      .catch(error => {
        toast.error("Something went wrong!")
      });
  };

  const handleDelete = (id) => {
    request.delete(`/messages/${id}`)
      .then(() => {
        setData(prevData => prevData.filter(item => item.id !== id));
        toast.info("Item was deleted!")

      })
      .catch(error => {
        toast.error("Something went wrong!")
      });
  };

  const handleInputChange = (id, field, value) => {
    setData(prevData => {
      const newDataArray = prevData.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return newDataArray;
    });
  };

  return (
    <div>
      <Typography marginBottom={'30px'} variant='h4'>
        Message List
      </Typography>
      <Stack sx={{ height: "500px", overflowY: "auto" }}>
        {data.map((item) => (
          <Stack
            key={item.id}
            marginBottom={'20px'}
            padding={"20px"}
            borderRadius={'10px'}
            border={'1px solid #444'}
            width={'95%'}
          >
            <Stack spacing={2}>
              {item.id === editingId ? (
                <>
                  <TextField
                    label="First Name"
                    value={item.firstName}
                    onChange={(e) => handleInputChange(item.id, 'firstName', e.target.value)}
                  />
                  <TextField
                    label="Last Name"
                    value={item.lastName}
                    onChange={(e) => handleInputChange(item.id, 'lastName', e.target.value)}
                  />
                  <TextField
                    label="New Image URL"
                    onChange={(e) => handleInputChange(item.id, 'img', e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleSave(item.id, item)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant='h6'>
                    {item.firstName}
                  </Typography>
                  <Typography variant='h6'>
                    {item.lastName}
                  </Typography>
                  <Typography variant='h6'>
                    Image URL
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </div>
  )
}
