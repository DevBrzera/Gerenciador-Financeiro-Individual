import { useAuth } from './login/authContext';

import '../styles/navbar.css';
export default function Navbar() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    return (
        <nav className="navbar-container">
            <div className="navbar-title">
                <span>MONEY DEFENSE</span>
            </div>
            {user && (
                <a className='logout' onClick={handleLogout}>Deslogar?</a>
            )}
        </nav>
    )
}