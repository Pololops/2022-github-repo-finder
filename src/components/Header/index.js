// import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import imageSrc from 'src/assets/images/logo-github.png';

export default function HeaderComponent() {
    return (
        <Header>
            <img
                src={imageSrc}
                alt="le logo de Github"
            />
            <h1>Github Repo Finder</h1>
        </Header>
    );
}

// HeaderComponent.propTypes = {

// };
