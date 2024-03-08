
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { FormValues, OpenFormProps } from '../Types/Products-types';

const EditProduct: React.FC<OpenFormProps> = ({
  openForm,
  selectedCellValue,
  handleCloseForm,
  handleSubmitForm,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: selectedCellValue,
  });

  const handleClose = () => {
    reset();
    handleCloseForm();
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    handleSubmitForm(data);
  };

  return (
    <>
      <Dialog open={openForm} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <label>
              <strong>Name:</strong>
            </label>
            <TextField
              InputLabelProps={{ shrink: watch('name') !== '' }}
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              required
              {...register('name', { required: 'Name is required.' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
            <label>
              <strong>Price:</strong>
            </label>
            <TextField
              InputLabelProps={{ shrink: watch('price') !== '' }}
              margin="dense"
              id="price"
              label="Price"
              fullWidth
              required
              type="number"
              {...register('price', {
                required: 'Price is required.',
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: 'Invalid price format.',
                },
                validate: (value: string) => parseFloat(value) > 0 || 'Price must be greater than zero.',
              })}
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ''}
            />
            <label>
              <strong>Category:</strong>
            </label>
            <TextField
              InputLabelProps={{ shrink: watch('category') !== '' }}
              margin="dense"
              id="category"
              label="Category"
              fullWidth
              required
              {...register('category', { required: 'Category is required.' })}
              error={!!errors.category}
              helperText={errors.category ? errors.category.message : ''}
            />
            <label>
              <strong>Updated_at:</strong>
            </label>
            <TextField
              InputLabelProps={{ shrink: watch('updated_at') !== '' }}
              margin="dense"
              id="updated_at"
              fullWidth
              required
              type="datetime-local"
              {...register('updated_at', { required: 'Updated at is required.' })}
              error={!!errors.updated_at}
              helperText={errors.updated_at ? errors.updated_at.message : ''}
            />
            <label>
              <strong>Description:</strong>
            </label>
            <TextField
              InputLabelProps={{ shrink: watch('description') !== '' }}
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              required
              {...register('description', { required: 'Description is required.' })}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
            <DialogActions>
              <Button type="submit" variant="contained">
                Edit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProduct;
