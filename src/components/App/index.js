import { useState, useEffect } from 'react';

import axios from 'axios';

import Header from 'src/components/Header';
import SearchBar from 'src/components/SearchBar';
import ReposResults from 'src/components/ReposResults';
import Message from 'src/components/Message';

import './style.scss';

// Fonction pour créer un résumer d'une string
function truncateDescription(string, wordsNumber) {
    let truncateString;

    if (string.replaceAll('、', ' ').split(' ').length > wordsNumber) {
        truncateString = string
            .replaceAll('、', ' ')
            .split(' ')
            .splice(0, wordsNumber)
            .join(' ');
        truncateString += '…';
    } else {
        truncateString = string;
    }

    return truncateString;
}

export default function App() {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');
    const [queryPageNb, setQueryPageNb] = useState(1);
    const [reposItems, setReposItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Reformate les data pour ne garder que les clés utilent
    const filteredData = (items) => items
        .map((item) => {
            const resume = (item.description) ? truncateDescription(item.description, 20)
                : 'no description';

            return {
                id: item.id + queryPageNb, // génère un id vraiment unique même en cas de doublons
                avatar: item.owner.avatar_url,
                name: item.name,
                owner: item.owner.login,
                description: resume,
                link: item.html_url,
            };
        });

    // Double requête API : Nouvelle requête & requête pour charger plus de résultats
    const handleGithubData = async () => {
        try {
            const request = `https://api.github.com/search/repositories?q=${query}&sort=starts&order=desc&page=${queryPageNb}&per_page=15`;

            const response = await axios.get(request);

            if (response.data !== undefined && response.data.items.length > 0) {
                const newReposItems = await filteredData(response.data.items);

                if (queryPageNb > 1) {
                    if (newReposItems.length > 1) {
                        // setIsListeningScroll(true);
                    }

                    // Ajout du nouveaux résultat de la requête API en filtrant les id en doublon
                    setReposItems([...reposItems, ...newReposItems]);
                } else {
                    // setIsListeningScroll(true);
                    setReposItems(newReposItems);

                    if (newReposItems.length === 0) {
                        setMessage(
                            `Nous n'avons trouvé aucun repo avec le terme : ${query}`,
                        );
                    } else if (newReposItems.length === 1) {
                        setMessage(
                            `Nous avons trouvé 1 repo avec le terme : ${query}`,
                        );
                    } else {
                        setMessage(
                            `Nous avons trouvé ${response.data.total_count} repos avec le terme : ${query}`,
                        );
                    }
                }
            }
        } catch (err) {
            console.log(err);
            setMessage(
                `Une erreur ${err.response.status} est survenu, veuillez renouveler votre recherche !`,
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Capture du scrolling pour déclencher une requête API au bas de la fenêtre
    const handleWindowScroll = () => {
        const isAtBottom = document.documentElement.scrollHeight
                - (document.documentElement.scrollTop + 200)
            <= document.documentElement.clientHeight;

        if (isAtBottom) {
            // setIsListeningScroll(false);
            setQueryPageNb(queryPageNb + 1);
        }
    };

    // Met à jour la valeur du champs controllé Input
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Lancement d'une toute nouvelle requête à l'API de Github lors du submit du formulaire
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (inputValue !== '') {
            // Sauvegarde le terme recherché pour les appels supplémentaires
            setQuery(inputValue);
            // Réinitialisation de la valeur de champs de recherche
            setInputValue('');
            // Reset à 1 le numéro de la page de la requête fetch API
            setQueryPageNb(1);
        }
    };

    // Lancement d'une requête fetch API lors du changement de la valeur de queryString
    useEffect(() => {
        if (queryPageNb >= 1 && query !== '') {
            // Passe l'état de chargement à true
            setIsLoading(true);

            // Appel de la requête de l'API
            handleGithubData();
        }
    }, [query, queryPageNb]);

    // Active le listener sur le scoll de la fenêtre dès que reposItems est mis à jour
    useEffect(() => {
        window.addEventListener('scroll', handleWindowScroll);

        // Fonction de nettoyage de useEffect() qui reset son contenu avant sa réexécution
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        };
    }, [reposItems]);

    return (
        <div className="app">
            <Header />
            <SearchBar
                value={inputValue}
                onUpdateValue={handleInputChange}
                submitSearchForm={handleFormSubmit}
            />

            <Message message={message} isLoading={isLoading} />

            {reposItems.length > 0 && (
                <ReposResults repos={reposItems} />
            )}
        </div>
    );
}
