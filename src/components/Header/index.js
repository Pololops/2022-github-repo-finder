// import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import './style.scss';
import imageSrc from 'src/assets/images/logo-github.png';

export default function HeaderComponent() {
    return (
        <Header>
            <img
                src={imageSrc}
                alt="Github"
                size="medium"
            />
            <h1>Repo Finder</h1>
        </Header>
    );
}

// HeaderComponent.propTypes = {

// };
