import React, { useState, useEffect } from 'react';
import { request } from '../../../config/request';
import { Typography, Stack, TextField, Button, Modal } from '@mui/material';
import { toast } from 'react-toastify';

export const EditMessage = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    request.get("/messages").then((res) => {
      setData(res.data);
    });
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
        toast.success("Item was saved!");
      })
      .catch(error => {
        toast.error("Something went wrong!");
      });
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    request.delete(`/messages/${deleteItemId}`)
      .then(() => {
        setData(prevData => prevData.filter(item => item.id !== deleteItemId));
        toast.info("Item was deleted!");
        setDeleteModalOpen(false);
      })
      .catch(error => {
        toast.error("Something went wrong!");
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
        Edit Messages
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
                  <Stack sx={{ width: "100px", height: "100px", overflow: "hidden" }}>
                    <div>
                      <img style={{ objectFit: "cover" }} width="80px" height="80px" src={item.img} alt="" />
                    </div>
                  </Stack>
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
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Stack
          sx={{
            position: 'absolute',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography id="delete-modal-description" marginBottom={'30px'} variant="body1" gutterBottom>
            Are you sure you want to delete this item?
          </Typography>
          <div style={{display: "flex"}}>
            <Button onClick={() => setDeleteModalOpen(false)} variant="contained" color="primary" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} variant="contained" color="error">
              Delete
            </Button>
          </div>
        </Stack>
      </Modal>
    </div>
  );
};
