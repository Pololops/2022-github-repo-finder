import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

export default function ReposResults({
    avatar, name, company, description, link,
}) {
    return (
        <Card
            href={link}
            image={avatar}
            header={name}
            meta={company}
            description={description}
        />
    );
}

ReposResults.defaultProps = {
    description: '',
};

ReposResults.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.string.isRequired,
};
