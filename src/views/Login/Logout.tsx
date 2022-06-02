import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import Loader from '../../components/Loader';

function Logout() {
    const { setStoredUser } = useContext<any>(AppContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        setStoredUser({});
        navigate('/');
    }, [])  

    return <Loader/>
}

export default Logout;