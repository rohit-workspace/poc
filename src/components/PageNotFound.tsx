import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontFamily: 'Trebuchet MS' }}>something went wrong</h1>
            <p style={{ fontFamily: 'Trebuchet MS' }}>The page you are looking for does not exist.</p>
            <button onClick={handleRedirect}>Go to Home Page</button>
        </div>
    );
};

export default PageNotFound;
