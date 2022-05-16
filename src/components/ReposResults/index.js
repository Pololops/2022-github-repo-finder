import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import Repo from './Repo';

import './style.scss';

export default function ReposResults({ repos }) {
    return (
        <Card.Group itemsPerRow={3} stackable>
            {repos.map((repo) => (
                <Repo
                    key={repo.id}
                    {...repo}
                />
            ))}
        </Card.Group>
    );
}

ReposResults.propTypes = {
    // ? Validation simple
    // repos: PropTypes.array.isRequired,

    // ? Validation simple un peu plus profonde
    // repos: PropTypes.arrayOf(PropTypes.object).isRequired,

    // ? validation complête
    repos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};
