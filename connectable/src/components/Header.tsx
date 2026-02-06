import { FaCode, FaBell } from "react-icons/fa";
import './Header.css';
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../utils/auth';

// Using a placeholder avatar if the asset path from Figma isn't directly usable or as a default
const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=random";


export default function Header() {


const navigate = useNavigate();
const user = getCurrentUser();

const ConstableClick2 = () =>{
    navigate('/')
}

const handleLogout = () => {
    if (window.confirm('정말로 로그아웃하시겠습니까?')) {
        logoutUser();
        navigate('/login');
    }
}



    return (
        <header className="header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="header-left" onClick={ConstableClick2}>
                    <div className="brand-icon">
                        <FaCode />
                    </div>
                    <h1 className="brand-name">Connectable</h1>
                </div>

                {/* Navigation & Profile Section */}
                <nav className="header-nav">


                    <div className="header-profile">


                        <div className="user-avatar">
                            <img src={DEFAULT_AVATAR} alt="User Avatar" />
                        </div>

                        {user && (
                            <span className="user-greeting">안녕하세요, {user.name} 님</span>
                        )}

                        <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
