import './style.scss';
import logo from 'src/assets/images/logo-github.png';

import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function Header() {
    return (
        <header className="app-header">
            <img src={logo} alt="Github" />
            <h1>Repo Finder</h1>

            <Menu className="menu">
                <Menu.Item
                    name="Recherche"
                    as={NavLink}
                    to="/"
                >
                    Recherche
                </Menu.Item>
                <Menu.Item
                    name="FAQ"
                    as={NavLink}
                    to="/faq"
                >
                    FAQ
                </Menu.Item>
            </Menu>
        </header>
    );
}
