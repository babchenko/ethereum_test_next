import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from 'components/Header';
import { LayoutProps } from './types';


const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div>
            <Container>
                <Header />
                {props.children}
            </Container>
        </div>
    );
};

export default Layout;
