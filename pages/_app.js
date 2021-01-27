import '../public/global.css';
import App from 'next/app';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import '../styles/index.css'
import Header from './header';
import { useAuth0 } from "@auth0/auth0-react";
const MyApp = ({ Component, pageProps }) => {

    return (

        <Auth0Provider
            domain="dev--9m720ah.us.auth0.com"
            clientId="X2d6xflpzZ7aA8gFoW8PA3SfmicV5c0J"
            redirectUri="http://localhost:3000/"
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
