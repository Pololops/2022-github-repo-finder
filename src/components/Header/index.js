import './style.scss';
import logo from 'src/assets/images/logo-github.png';

export default function HeaderComponent() {
    return (
        <div className="app-header">
            <img src={logo} alt="Github" />
            <h1>Repo Finder</h1>
        </div>
    );
}
