
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, DialogActions, IconButton, Button, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material';
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
      <Dialog
        open={openForm}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <label>
              <strong>Price</strong>
            </label>
            <TextField
              InputLabelProps={{ shrink: watch('price') !== '' }}
              margin="dense"
              id="price"
              label="Price"
              fullWidth
              required
              {...register('price', {
                required: 'Price is required.',
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: 'Invalid price format.',
                },
              })}
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ''}
            />
            <label>
              <strong>Category</strong>
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
              label="Updated_at"
              fullWidth
              required
              {...register('updated_at', { required: 'Updated at is required.' })}
              error={!!errors.updated_at}
              helperText={errors.updated_at ? errors.updated_at.message : ''}
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
