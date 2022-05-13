import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';
import SearchSpinner from 'src/components/SearchSpinner';

import './style.scss';

export default function MessageComponent({ isLoading, message }) {
    return (
        <Segment className="message">
            {isLoading && <SearchSpinner />}
            <Container className="content">
                {isLoading ? (
                    <>
                        <b>Une petite seconde</b>
                        <br />
                        Nous recherchons sur Githut...
                    </>
                ) : (
                    <>
                        <b>Résultat de la recherche :</b>
                        <br />
                        {message}
                    </>
                )}
            </Container>
        </Segment>
    );
}

MessageComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
};
