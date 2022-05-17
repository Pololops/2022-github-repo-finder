import axios from 'axios';

export default async function requestReposList(searchTerm, page = 1, perPage = 9) {
    try {
        const response = await axios.get('https://api.github.com/search/repositories', {
            params: {
                q: searchTerm,
                sort: 'stars',
                order: 'desc',
                page: page,
                per_page: perPage,
            },
        });

        return response.data;
    } catch (error) {
        return error.data.status;
    }
}
