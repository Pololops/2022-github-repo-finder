import { useState, useEffect } from 'react';

import axios from 'axios';

import Header from 'src/components/Header';
import SearchBar from 'src/components/SearchBar';
import ReposResults from 'src/components/ReposResults';
import Message from 'src/components/Message';

import 'semantic-ui-css/semantic.min.css'; // Semantic UI minified CSS
import './styles.scss';

// import data from 'src/data/repos';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [queryPageNb, setQueryPageNb] = useState(1);
    const [reposItems, setReposItems] = useState([]);
    const [isListeningScroll, setIsListeningScroll] = useState(true);

    // Double requête API : Nouvelle requête & requête pour charger plus de résultats
    const handleGithubData = async () => {
        try {
            const request = `https://api.github.com/search/repositories?q=${searchTerm}&page=${queryPageNb}&per_page=15`;

            const response = await axios.get(request);

            if (response.data !== undefined) {
                if (queryPageNb > 1) {
                    if (response.data.items.length > 1) {
                        setIsListeningScroll(true);
                    }

                    // Ajout du nouveaux résultat de la requête API
                    setReposItems([...reposItems, ...response.data.items]);
                } else {
                    setIsListeningScroll(true);
                    setReposItems(response.data.items);

                    if (response.data.items.length === 0) {
                        setMessage(
                            `Nous n'avons trouvé aucun repo avec le terme : ${searchTerm}`,
                        );
                    } else if (response.data.items.length === 1) {
                        setMessage(
                            `Nous avons trouvé 1 repo ave le terme : ${searchTerm}`,
                        );
                    } else {
                        setMessage(
                            `Nous avons trouvé ${response.data.total_count} repos avec le terme : ${searchTerm}`,
                        );
                    }
                }
            }
        } catch (error) {
            setMessage(
                'Une erreur est survenu, veuillez renouveler votre recherche !',
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Capture du scrolling pour déclencher une requête API au bas de la fenêtre
    const handleScroll = () => {
        if (isListeningScroll) {
            const isAtBottom = document.documentElement.scrollHeight
                    - (document.documentElement.scrollTop + 200)
                <= document.documentElement.clientHeight;

            if (isAtBottom) {
                //
                setIsListeningScroll(false);
                setQueryPageNb(queryPageNb + 1);
            }
        }
    };

    // Met à jour la valeur du champs controllé Input
    const updateInputValue = (event) => {
        setInputValue(event.target.value);
    };

    // Lancement d'une toute nouvelle requête à l'API de Github lors du submit du formulaire
    const handleSubmitSearch = (event) => {
        event.preventDefault();

        if (inputValue !== '') {
            // Passe l'état de chargement à true
            setIsLoading(true);
            // Sauvegarde le terme recherché pour les appels supplémentaires
            setSearchTerm(inputValue);
            // Réinitialisation de la valeur de champs de recherche
            setInputValue('');
            // Reset à 1 le numéro de la page de la requête fetch API
            setQueryPageNb(1);
        }
    };

    // Lancement d'une requête fetch API lors du changement de la valeur de queryString
    useEffect(() => {
        if (queryPageNb >= 1 && searchTerm !== '') {
            handleGithubData();
        }
    }, [searchTerm, queryPageNb]);

    // Active le listener sur le scoll de la fenêtre dès que reposItems est mis à jour
    useEffect(() => {
        if (isListeningScroll) {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }

        return null;
    }, [reposItems]);

    return (
        <div className="app">
            <Header />
            <SearchBar
                value={inputValue}
                onUpdateValue={updateInputValue}
                submitSearchForm={handleSubmitSearch}
            />

            <Message message={message} isLoading={isLoading} />

            {Object.keys(reposItems).length > 0 && (
                <ReposResults repos={reposItems} />
            )}
        </div>
    );
}

export default App;
