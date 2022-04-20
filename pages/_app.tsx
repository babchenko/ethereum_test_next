import type { AppProps } from 'next/app'
import AppProvider from 'context/AppContext';

import 'semantic-ui-css/semantic.min.css';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <AppProvider>
            <Component { ...pageProps } />
        </AppProvider>
    );
}

export default MyApp
