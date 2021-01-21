import '../public/global.css';
import App from 'next/app';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
 import 'bootstrap/dist/css/bootstrap.min.css';
class MyApp extends App {
  componentDidMount = () => {

  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }

}
const makestore = () => store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);
