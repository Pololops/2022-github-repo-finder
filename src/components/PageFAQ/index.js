import { Segment } from 'semantic-ui-react';
import './style.scss';

export default function PageFAQ() {
    return (
        <main className="main">
            <h2>FAQ</h2>

            <Segment vertical>
                <h3>A quoi ça sert ?</h3>
                <p>Cette application permet de rechercher des dépôts Github</p>
            </Segment>

            <Segment vertical>
                <h3>Comment effectuer une recherche ?</h3>
                <p>
                    Sur la page Recherche, completez le champs de recherche et
                    valider en appuyant sur la touche Entrer
                </p>
            </Segment>
        </main>
    );
}
