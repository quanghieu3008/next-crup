import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from 'react-bootstrap';

const Comfirm = (props) => {
    const { loginWithRedirect } = useAuth0();
    return (
        <div className="not-data">

            <Alert variant="primary">
                You need to login{' '}
                <Alert.Link href="#" onClick={() => loginWithRedirect()}> a link</Alert.Link>
            </Alert>


        </div>
    );
}

export default Comfirm;