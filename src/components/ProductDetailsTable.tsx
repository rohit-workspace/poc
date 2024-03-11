
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppDispatch, RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    fetchProductData,
    openCloseModal,
} from '../Redux/Reducers/ProductSlice';
import { Button, Box } from '@mui/material';
import { FormValues } from '../Types/Products-types';
import DialogBox from './DialogBox';
import { useNavigate } from 'react-router-dom';
import EditProduct from './EditProduct';


const ProductDetailsTable: React.FC = () => {
    const [updateField, setUpdateField] = useState<boolean>(false);
    const navigate = useNavigate();

    const initialFormValue: FormValues = {
        price: '',
        category: '',
        updated_at: '',
        name: '',
        description: '',
        id: '',
    };
    const dispatch: AppDispatch = useDispatch();
    const productReducerState = useSelector((state: RootState) => state.productReducer);

    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

    const [selectedCellValue, setSelectedCellValue] = useState<FormValues>(
        initialFormValue,
    );

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
            width: 150,
        },
        {
            field: 'name',
            headerName: 'Product Name',
            type: 'string',
            width: 150,
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
                        aria-label='edit'
                        onClick={(e) => {
                            setSelectedCellValue(params.row.id);
                            setUpdateField(true);
                            e.stopPropagation();
                            dispatch(
                                openCloseModal({
                                    component: 'openDeletePopup',
                                    action: true,
                                }),
                            );
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        color='error'
                        onClick={(e) => {
                            setSelectedCellValue(params.row);
                            console.log('Data deleted',params.row);
                            e.stopPropagation();
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


                </Box>

            ),
        },
    ];

    return (

        <Box sx={{ height: 371, width: { lg: '1160px', xl: '1200px' } }}>
            <EditProduct
                updateField={updateField}
                openForm={productReducerState.openDeletePopup}
                selectedCellValue={selectedCellValue}
                handleCloseForm={() =>
                    dispatch(openCloseModal({ component: 'openDeletePopup', action: false }))
                }
                handleSubmitForm={(data) => {
                    console.log('Data Edited Successfully ', data);
                }}
            />
            <DataGrid
                sx={{
                    boxShadow: 2,
                    border: 1,
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
                onRowClick={(params) => {
                    navigate(`/product-detail/${params.id}`);
                }}
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
                handleDeleteConfirm={function (data: FormValues): void {
                    console.log('product successfully deleted.');
                }}
            />
        </Box>
    );
};

export default ProductDetailsTable;







