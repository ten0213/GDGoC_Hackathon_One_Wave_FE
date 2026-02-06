import { FaCode, FaBell } from "react-icons/fa";
import './Header.css';

// Using a placeholder avatar if the asset path from Figma isn't directly usable or as a default
const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=random";

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="header-left">
                    <div className="brand-icon">
                        <FaCode />
                    </div>
                    <h1 className="brand-name">Connectable</h1>
                </div>

                {/* Navigation & Profile Section */}
                <nav className="header-nav">
                    <a href="#" className="header-link">구인자</a>
                    <a href="#" className="header-link">구직자</a>

                    <div className="header-profile">
                        <div className="notification-wrapper">
                            <div className="notification-icon"><FaBell /></div>
                            <div className="notification-badge" />
                        </div>

                        <div className="user-avatar">
                            <img src={DEFAULT_AVATAR} alt="User Avatar" />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
