import { Box, Typography } from '@mui/material';
import ProductDetailsTable from '../components/ProductDetailsTable';


function Dashboard() {
  return (

    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        p={'25px'}
        flexDirection='column'
      >
        <Typography variant='h6' mb={1} fontFamily= "Trebuchet MS" style={{ color: 'black' }}>
          Product-List
        </Typography>
        <ProductDetailsTable />
      </Box>
    </>
  );
}

export default Dashboard;
