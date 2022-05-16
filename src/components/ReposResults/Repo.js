import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

export default function ReposResults({
    avatar, name, owner, description, link,
}) {
    return (
        <Card
            href={link}
            target="_blank"
            image={avatar}
            header={name}
            meta={owner}
            description={description}
        />
    );
}

ReposResults.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};
