import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Segment, Container } from 'semantic-ui-react';
import SearchSpinner from 'src/components/SearchSpinner';

import './style.scss';

export default function Message({
    errorMessage, isLoading, queryTerm, totalCount,
}) {
    const [counter, setCounter] = useState(undefined);

    useEffect(() => {
        if (!totalCount || counter >= totalCount) {
            return () => {};
        }

        const timeoutId = setTimeout(() => {
            // Passage d'une fonction au setState qui prend en argument l'ancienne valeur
            setCounter((oldCounter) => Math.ceil(oldCounter + ((totalCount - oldCounter) / 10)));
        }, 5);

        // Fonction de nettoyage exécuter lors du démontage du composant avant son refresh
        return () => {
            clearTimeout(timeoutId);
        };
    }, [counter]);

    useEffect(() => {
        if (totalCount) {
            setCounter(0);
        }
    }, [totalCount]);

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
                            {errorMessage !== '' && totalCount >= 0
                                ? 'Résultat de la recherche :'
                                : 'Faites une recherche !'}
                        </b>
                        <br />
                        {errorMessage !== '' && errorMessage}
                        {errorMessage === ''
                            && queryTerm !== ''
                            && totalCount === 0
                            && `Nous n'avons trouvé aucun repo avec le terme : ${queryTerm}`}
                        {errorMessage === ''
                            && queryTerm !== ''
                            && totalCount > 0
                            && `Nous avons trouvé ${counter} repo${
                                totalCount > 1 ? 's' : ''
                            } avec le terme : ${queryTerm}`}
                    </>
                )}
            </Container>
        </Segment>
    );
}

Message.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    queryTerm: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
};
