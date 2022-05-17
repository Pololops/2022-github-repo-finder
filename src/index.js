import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'src/components/App';

import 'semantic-ui-css/semantic.min.css'; // Semantic UI minified CSS

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
