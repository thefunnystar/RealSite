import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

interface PrivateRouteProps {
    component: React.ComponentType;
    auth: {
        isAuthenticated: boolean;
        loading: boolean;
    };
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, auth }) => {
    const router = useRouter();

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.loading) {
            // Redirect to the login page if not authenticated
            router.replace('/login');
        }
    }, [auth.isAuthenticated, auth.loading, router]);

    // Render the component if authenticated
    return auth.isAuthenticated && !auth.loading ? <Component /> : null;
};

PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
    }).isRequired,
};

export default PrivateRoute;
