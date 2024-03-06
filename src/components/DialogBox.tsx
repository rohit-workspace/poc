import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogBoxProps } from '../Types/Products-types';

const DialogBox: React.FC<DialogBoxProps> = ({
    open,
    selectedCellValue,
    handleClose,
    handleDeleteConfirm,
}) => {
    return (
        <>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby='alert-dialog-slide-description'
                maxWidth="xs"
            >
                <DialogTitle>
                    {'You want to delete this product ?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        {`${selectedCellValue.name} will be deleted from your list`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button style={{ color: 'red' }}
                        onClick={() => {
                            handleClose();
                            handleDeleteConfirm(selectedCellValue);
                        }}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogBox;
