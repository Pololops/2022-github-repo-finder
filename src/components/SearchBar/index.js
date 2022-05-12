import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';

export default function SearchBar({ value, onUpdateValue, submitSearchForm }) {
    return (
        <Form onSubmit={submitSearchForm}>
            <Input
                type="text"
                icon="search"
                iconPosition="left"
                fluid
                placeholder="Recherchez un repo Github..."
                value={value}
                onChange={onUpdateValue}
            />
        </Form>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onUpdateValue: PropTypes.func.isRequired,
    submitSearchForm: PropTypes.func.isRequired,
};
