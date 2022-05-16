import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';
import SearchSpinner from 'src/components/SearchSpinner';

import './style.scss';

export default function Message({ message, isLoading }) {
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
                        <b>
                            {message
                                ? 'Résultat de la recherche :'
                                : 'Faites une recherche !'}
                        </b>
                        <br />
                        {message}
                    </>
                )}
            </Container>
        </Segment>
    );
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
};
