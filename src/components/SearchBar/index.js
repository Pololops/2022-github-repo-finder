import PropTypes from 'prop-types';

import { useEffect, useRef } from 'react';

import { Segment, Form, Input } from 'semantic-ui-react';

export default function SearchBar({ value, onUpdateValue, submitSearchForm }) {
    // Création du ref appliqué ) l'input du formulaire du composant
    const inputRef = useRef('inputSearchFocuses');

    // Utilisation de la ref, pour établir un focus automatique au chargement du composant
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <Segment>
            <Form onSubmit={submitSearchForm}>
                <Input
                    type="text"
                    icon="search"
                    iconPosition="left"
                    fluid
                    placeholder="Recherchez un repo Github..."
                    value={value}
                    onChange={onUpdateValue}
                    ref={inputRef}
                />
            </Form>
        </Segment>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onUpdateValue: PropTypes.func.isRequired,
    submitSearchForm: PropTypes.func.isRequired,
};
