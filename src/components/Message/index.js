import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import SearchSpinner from 'src/components/SearchSpinner';

import './style.scss';

export default function MessageComponent({ isLoading, message }) {
    return (
        <Message>
            {isLoading && <SearchSpinner />}
            <Message.Content>
                {isLoading ? (
                    <>
                        <Message.Header>Une petite seconde</Message.Header>
                        Nous recherchons sur Githut...
                    </>
                ) : (
                    <>
                        <Message.Header>
                            Résultat de la recherche :
                        </Message.Header>
                        {message}
                    </>
                )}
            </Message.Content>
        </Message>
    );
}

MessageComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
};
