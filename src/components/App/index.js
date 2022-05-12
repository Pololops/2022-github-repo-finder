import { useState } from 'react';

import axios from 'axios';

import Header from 'src/components/Header';
import SearchBar from 'src/components/SearchBar';
import ReposResults from 'src/components/ReposResults';
import Message from 'src/components/Message';
import 'semantic-ui-css/semantic.min.css'; // Semantic UI minified CSS
import './styles.css';

// import data from 'src/data/repos';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [repos, setRepos] = useState({});
    const [message, setMessage] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const updateSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmitSearch = async (event) => {
        event.preventDefault();

        if (searchValue !== '') {
            setIsLoading(true);

            try {
                const response = await axios.get(
                    `https://api.github.com/search/repositories?q=${searchValue}`,
                );

                if (response.data !== undefined) {
                    setRepos(response.data);
                    setMessage(
                        `Nous avons trouvé ${response.data.total_count} repos`,
                    );
                }
            } catch (error) {
            // setMessage(
            //     'Une erreur est survenu, veuillez renouveler votre recherche !'
            // );
            } finally {
                setIsLoading(false);
            }
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

            {message !== '' && (
                <Message message={message} isLoading={isLoading} />
            )}

            {Object.keys(repos).length > 0 && (
                <ReposResults repos={repos.items} />
            )}
        </div>
    );
}

export default App;
