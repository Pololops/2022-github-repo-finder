import { useState, useEffect } from 'react';

import SearchBar from 'src/components/SearchBar';
import ReposResults from 'src/components/ReposResults';
import Message from 'src/components/Message';

import request from 'src/requestsAPI/reposRequests';

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

// Déclaration d'un regex pour vérifier la présence de caractère autre que un ou plusieurs espaces
const regexForInputValue = /^(?!^ +$).+$/;

// Reformate les data pour ne garder que les clés utilent
/**
 * Fonction de formatage de data
 * @param {array} arrayItems un tableau de données reçu lors d'un requête Axios
 * @param {number} pageNb le numéro de la page utilisé lors de la requête Axios
 * @returns {array} un tableau d'objets formatés
 */
function filteredData(arrayItems, pageNb) {
    return arrayItems.map((item) => {
        // Création d'un résumé si la description est trop longue
        const resume = item.description
            ? truncateDescription(item.description, 20)
            : 'no description';

        return {
            id: item.id + pageNb, // génère un id vraiment unique même en cas de doublons
            avatar: item.owner.avatar_url,
            name: item.name,
            owner: item.owner.login,
            description: resume,
            link: item.html_url,
        };
    });
}

export default function PageRepo() {
    // Initialisation de tous les états (states) de l'application
    const [errorMessage, setErrorMessage] = useState(''); // message du résultat
    const [totalCount, setTotalCount] = useState(0); // nombre de résultats
    const [inputValue, setInputValue] = useState(''); // valeur saisie dans l'input
    const [query, setQuery] = useState(''); // Récupération de la valeur de l'input lors du submit
    const [queryPageNb, setQueryPageNb] = useState(1); // le numéro de la page de la requête API
    const [reposResults, setSeposResults] = useState(null); // l'array des datas reçues
    const [isLoading, setIsLoading] = useState(false); // l'état de chargement

    // Double requête API : Nouvelle requête & requête pour charger plus de résultats
    const handleData = async () => {
        try {
            // Envoi et récupération de la requête à l'API
            const response = await request(query, queryPageNb, 15);

            if (response && response !== undefined) {
                if (response.items.length > 0) {
                    // Filtrage et formatage des data reçues
                    const newReposItems = await filteredData(
                        response.items, // Les données reçues
                        queryPageNb, // le numéro de la page pour formater une clé vraiment unique
                    );

                    if (queryPageNb > 1) {
                        // Ajout des data à la suite des anciennes dans le state reposResults
                        setSeposResults([...reposResults, ...newReposItems]);
                    } else {
                        // Stockage des premières data dans le state reposResults
                        setSeposResults(newReposItems);

                        // Stockage du nombre de résulats obtenu lors de la requête API
                        setTotalCount(response.total_count);
                    }
                }
            }
        } catch (err) {
            // Formatage du message en cas d'erreur
            setErrorMessage(
                `Une erreur ${
                    err.response.status ?? 'inconnue'
                } est survenu, veuillez renouveler votre recherche !`,
            );
        } finally {
            // Changement de l'état de chargement des data pour masquer le spinner
            setIsLoading(false);
        }
    };

    // Capture du scrolling pour déclencher une requête API au bas de la fenêtre
    const handleWindowScroll = () => {
        const isAtBottom = document.documentElement.scrollHeight
                - (document.documentElement.scrollTop + 200)
            <= document.documentElement.clientHeight;

        if (isAtBottom) {
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

        // Test pour vérifier si la valeur de l'input match avec une regex
        if (inputValue.match(regexForInputValue)) {
            // Reset des précédentes data contenu dans le state reposResults
            setSeposResults(null);
            // Reset du compteur de résultats contenu dans le state totalCount
            setTotalCount(0);
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
        // pas d'async sur useEffect => création d'une IIFE async dans le useEffect
        // ? IIFE = Immediately-Invoked Function Expression
        (async () => {
            if (queryPageNb >= 1 && query !== '') {
                // Changement de l'état de chargement des data pour afficher le spinner
                setIsLoading(true);

                // Appel de la fonction qui lance la requête auprès de l'API
                await handleData();
            }
        })();
    }, [query, queryPageNb]);

    // Active le listener sur le scoll de la fenêtre dès que reposResults est mis à jour
    useEffect(() => {
        window.addEventListener('scroll', handleWindowScroll);

        // Fonction de nettoyage de useEffect() qui reset son contenu avant sa réexécution
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        };
    }, [reposResults]);

    return (
        <>
            <SearchBar
                value={inputValue}
                onUpdateValue={handleInputChange}
                submitSearchForm={handleFormSubmit}
            />

            <Message
                errorMessage={errorMessage}
                isLoading={isLoading}
                queryTerm={query}
                totalCount={totalCount}
            />

            {reposResults && reposResults.length > 0 && (
                <ReposResults repos={reposResults} />
            )}
        </>
    );
}
