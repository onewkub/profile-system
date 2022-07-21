import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface RequiredAuthProps {
    children: any;
}

const RequiredAuth = (props: RequiredAuthProps) => {
    const { children } = props;
    const authState = useAppSelector(state => state.auth);
    const location = useLocation();
    if (!authState.isAuthenticate)
        return <Navigate to="/login" state={{ from: location }} />;

    return children;
};

export default RequiredAuth;