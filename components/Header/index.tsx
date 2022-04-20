import React from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <Menu style={{ marginTop: "10px" }}>
            <Link href="/">
                <a className="item">FETestTask</a>
            </Link>
            <Menu.Menu position="right">
                <Link href="/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
