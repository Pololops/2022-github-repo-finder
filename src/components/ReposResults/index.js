import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Repo from './Repo';

export default function ReposResults({ repos }) {
    return (
        <Card.Group>
            {repos.map((repo) => (
                <Repo
                    key={repo.id}
                    avatar={repo.owner.avatar_url}
                    name={repo.name}
                    owner={repo.owner.login}
                    description={repo.description}
                    onClick={() => { window.open(repo.html_url, '_blank'); }}
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
