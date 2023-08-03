import { AppProps } from 'next/app';
import Layout from '../hocs/Layout';
import '../sass/main.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;
