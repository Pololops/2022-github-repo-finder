import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

export default function ReposResults({
    avatar, name, owner, description,
}) {
    return (
        <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className="company">{owner.login}</span>
                </Card.Meta>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
        </Card>
    );
}

ReposResults.defaultProps = {
    description: '',
};

ReposResults.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    description: PropTypes.string,
};
