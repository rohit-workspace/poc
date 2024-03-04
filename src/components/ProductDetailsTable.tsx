
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    fetchProductData,
    openCloseModal,
} from '../Redux/Reducers/ProductSlice';
import { Button, Modal, Box, Typography } from '@mui/material';
import { editValues } from '../Types/Products-types';
import DialogBox from './DialogBox';
import { Link, useNavigate } from 'react-router-dom';



const ProductDetailsTable: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const initialStateFormValue: editValues = {
        id: 0,
        price: '',
        category: '',
        updated_at: '',
        name: '',
        description: '',
        selectedCellValue: ''
    };
    const dispatch: AppDispatch = useDispatch();
    const productReducerState = useSelector((state: RootState) => state.productReducer);

    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

    const [selectedCellValue, setSelectedCellValue] = useState<editValues>(
        initialStateFormValue,
    );

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(
            fetchProductData({
                page: page,
                pageSize: pageSize,
            }),
        );
    }, [dispatch, page, pageSize]);

    const columns: GridColDef[] = [

        {
            field: 'price',
            headerName: 'Price',
            width: 100,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 100,
        },
        {
            field: 'updated_at',
            headerName: 'Updated_at',
            type: 'string',
            width: 80,
        },
        {
            field: 'name',
            headerName: 'Name',
            type: 'string',
            width: 122,
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            width: 400,
        },
        {
            field: 'id',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            width: 210,
            headerAlign: 'center',
            renderCell: (params) => (
                <Box
                    display='flex'
                    width={'100%'}
                    justifyContent='space-around'
                    height='100%'
                >
                    <Button
                        aria-label='details'
                        onClick={() => {

                            navigate(`/product-detail/${params.id}`);
                        }}
                    >
                        Details
                    </Button>


                    <Button onClick={handleOpen}
                    >edit</Button>

                    <Button
                        aria-label='delete'
                        color='error'
                        onClick={() => {
                            setSelectedCellValue(params.row);

                            dispatch(
                                openCloseModal({
                                    component: 'openDeleteDialog',
                                    action: true,
                                }),
                            );
                        }}
                    >
                        Delete
                    </Button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <Typography id="modal-title" variant="h6" component="h2">
                                Edit Products
                            </Typography>
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                This is the content of the modal. You can put any content here..
                            </Typography>
                            <Button onClick={handleClose} sx={{ mt: 15 }}>Close</Button>
                        </Box>
                    </Modal>

                </Box>

            ),
        },
    ];

    return (

        <Box sx={{ height: 371, width: { lg: '1160px', xl: '1200px' } }}>
            <DataGrid
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                        bgColor: 'red'
                    },
                }}

                onPaginationModelChange={({ page, pageSize }) => {
                    setPage(page);
                    setPageSize(pageSize);
                }}
                disableRowSelectionOnClick={true}
                rows={productReducerState.products}
                columns={columns}
                pagination
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                rowCount={productReducerState.total_products}
                paginationMode='server'
                pageSizeOptions={[5, 10, 20, 100]}
            />
            <DialogBox
                open={productReducerState.openDeleteDialog}
                selectedCellValue={selectedCellValue}
                handleClose={() => dispatch(
                    openCloseModal({ component: 'openDeleteDialog', action: false })
                )}
                handleDeleteConfirm={function (data: editValues): void {
                    console.log('product successfully deleted.');
                }}

            />
        </Box>
    );
};

export default ProductDetailsTable;







