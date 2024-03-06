import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../Redux/store';
import { Product } from '../Types/Products-types';
import { fetchProductById } from '../Redux/Reducers/ProductSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {

    useNavigate
} from 'react-router-dom';


const ProductDetailsPage: React.FC = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const product: Product | null = useSelector((state: RootState) => state.productReducer.selectedProduct);
    useEffect(() => {
        dispatch(fetchProductById({ productId: id || "1" }));
    }, [dispatch]);

    if (!product) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
            <CircularProgress />
        </Box>
    }
    return (
        <div>
            <button style={{ backgroundColor: 'darkgray', width: '89px', height: '40px', fontFamily: 'Trebuchet MS' }} onClick={() => navigate(-1)}>Go Back</button>
            <h2 style={{ marginLeft: '434px', marginTop: '45px', fontFamily: 'Trebuchet MS' }}>Product Details</h2>
            <img style={{ width: '320px', height: '300px', marginBottom: '8px' }} src={`${product.photo.url}`} />
            <p style={{ marginLeft: '436px', marginTop: '-306px', fontFamily: 'Trebuchet MS' }}><strong>Id:</strong> {product.photo.id}</p>
            <p style={{ marginLeft: '434px', fontFamily: 'Trebuchet MS' }}><strong>Title:</strong> {product.photo.title}</p>
            <p style={{ marginLeft: '431px', fontFamily: 'Trebuchet MS' }}><strong>Description:</strong> {product.photo.description}</p>
        </div >
    );

};

export default ProductDetailsPage;


