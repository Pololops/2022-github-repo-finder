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
    const [searchValue, setSearchValue] = useState('');
    const [pageQueryRequest, setPageQueryRequest] = useState(1);
    const [repos, setRepos] = useState({});
    const [nextRepos, setNextRepos] = useState({});
    const [offset, setOffset] = useState(0);

    const handleGithubData = async (queryString, pageNb) => {
        try {
            const response = await axios.get(
                `https://api.github.com/search/repositories?q=${queryString}&page=${pageNb}&per_page=99`,
            );

            if (response.data !== undefined) {
                if (pageNb === 1) {
                    console.log('page 1');
                    setRepos(response.data);

                    if (response.data.total_count === 0) {
                        setMessage(
                            `Nous n'avons trouvé aucun repo avec le terme : ${searchValue}`,
                        );
                    } else if (response.data.total_count === 1) {
                        setMessage(
                            `Nous avons trouvé 1 repo ave le terme : ${searchValue}`,
                        );
                    } else {
                        setMessage(
                            `Nous avons trouvé ${response.data.total_count} repos avec le terme : ${searchValue}`,
                        );
                    }
                } else {
                    console.log(`page suivante n°${pageNb}`);
                    const nextReposMoreAndMore = [
                        ...nextRepos,
                        ...response.data.items,
                    ];

                    setPageQueryRequest(pageQueryRequest + 1);
                    setNextRepos(nextReposMoreAndMore);
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

    const setScroll = () => {
        setOffset(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', setScroll);
        console.log('offset : ', offset);
        return () => {
            window.removeEventListener('scroll', setScroll);
        };
    });

    useEffect(() => {
        if (offset === 250) {
            handleGithubData(searchValue, pageQueryRequest);
        }
    }, [offset]);

    const updateSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault();

        if (searchValue !== '') {
            setIsLoading(true);

            handleGithubData(searchValue, pageQueryRequest);
        }
    };

    return (
        <div className="app">
            <Header />
            <SearchBar
                value={searchValue}
                onUpdateValue={updateSearchValue}
                submitSearchForm={handleSubmitSearch}
            />

            <Message message={message} isLoading={isLoading} />

            {!isLoading && Object.keys(repos).length > 0 && (
                <ReposResults repos={repos.items} />
            )}
            {nextRepos.length > 1 && <ReposResults repos={nextRepos.items} />}
        </div>
    );
}

export default App;
