import React, { useState } from 'react';
import { request } from '../../../config/request';
import { Typography, Stack, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

export const CreateMessage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [img, setImg] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImg(event.target.value);
  };

  const handleSave = () => {

    if (!firstName || !lastName || !img) {
      alert("Please fill in all fields");
      return;
    }

    const newMessage = {
      firstName: firstName,
      lastName: lastName,
      img: img
    };

    request.post("/messages", newMessage)
      .then(() => {
        setFirstName('');
        setLastName('');
        setImg('');
        toast.success("Item saved to Message List!")
      })
      .catch(error => {
        toast.error("Something went wrong!")
      });
  };

  return (
    <div>
      <Typography marginBottom={'30px'} variant='h4'>
        Create Message
      </Typography>
      <Stack spacing={2} width={'300px'}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <TextField
          label="Image URL"
          value={img}
          onChange={handleImageChange}
        />
        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </Stack>
    </div>
  );
};
