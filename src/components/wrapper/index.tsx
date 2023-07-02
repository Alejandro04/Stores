import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import LoadingComponent from '../spinner/spinner';

const withAuth = (WrappedComponent: React.FC<any>) => {
  const RequiresAuth = (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      checkAuthState();
    }, []);

    const checkAuthState = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        router.push('/');
      }
    };

    if (!isAuthenticated) {
      return <LoadingComponent/>
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default withAuth;
