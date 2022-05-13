import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Repo from './Repo';

import './style.scss';

export default function ReposResults({ repos }) {
    return (
        <Card.Group itemsPerRow={3}>
            {repos.map((repo) => (
                <Repo
                    key={repo.id}
                    avatar={repo.owner.avatar_url}
                    name={repo.name}
                    company={repo.owner.login}
                    description={repo.description}
                    link={repo.html_url}
                />
            ))}
        </Card.Group>
    );
}

ReposResults.propTypes = {
    repos: PropTypes.arrayOf(
        PropTypes.shape({
            owner: PropTypes.shape({
                login: PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired,
            }).isRequired,
            description: PropTypes.string,
            html_url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};
