import React from 'react';
import '../public/global.css';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
// import '../styles/index.css';
import Header from './header';

const MyApp = ({ Component, pageProps }) => {

    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    console.log(hostname, "showW", origin);
    return (

        <Auth0Provider
            domain="dev--9m720ah.us.auth0.com"
            clientId="X2d6xflpzZ7aA8gFoW8PA3SfmicV5c0J"
            redirectUri={origin}
        >
            <div>
                <Header />
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </div>
        </Auth0Provider>

    )
}

// }
const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
