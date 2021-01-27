import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'react-bootstrap';

const Header = (props) => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return (
        <div className="header-top" >
            { !isAuthenticated && (
                <div>
                    <Button onClick={() => loginWithRedirect()}>Log In</Button>
                </div>
            )}
            {  isAuthenticated && (
                <div>
                    <Button variant="secondary" onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
     </Button>
                </div>
            )
            }
        </div>
    );
}

export default Header;