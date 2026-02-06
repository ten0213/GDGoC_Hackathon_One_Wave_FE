import { FaArrowRight, FaCheckCircle, FaClock, FaBuilding, FaUserGraduate, FaChevronRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import './SubPage.css';

export default function MainPage() {
    const navigate = useNavigate();
    return (
        <div className="main-page">
            <Header />

            <div className="content-wrapper">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-heading">
                        <h2 className="sidebar-title">구현과제</h2>
                    </div>

                    <nav className="nav-menu">
                        <a href="#" className="nav-item active">
                            <div className="nav-icon"><FaArrowRight /></div>
                            <span className="nav-text">모든 과제</span>
                        </a>
                        <a href="#" className="nav-item">
                            <div className="nav-icon"><FaClock /></div>
                            <span className="nav-text">진행 중</span>
                        </a>
                        <a href="#" className="nav-item">
                            <div className="nav-icon"><FaCheckCircle /></div>
                            <span className="nav-text">채점 완료</span>
                        </a>
                        <a href="#" className="nav-item">
                            <div className="nav-icon"><PlusIcon /></div>
                            <span className="nav-text">새 과제 생성</span>
                        </a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <header className="header-section">
                        <div className="page-title">
                            <h1>구현 시작하기</h1>
                            <p className="page-description">구현과제를 생성하거나, 구현과제를 풀고 채점해보세요.</p>
                        </div>
                        <button className="create-task-btn" onClick={() => navigate('/create-task')}>
                            <span className="btn-icon">+</span>
                            <span className="btn-text">새 구현과제 생성</span>
                        </button>
                    </header>

                    <div className="content-grid">
                        {/* Employer Column */}
                        <div className="grid-column">
                            <div className="card">
                                <div className="card-header">
                                    <span className="card-icon"><FaBuilding /></span>
                                    <h3 className="card-title">구인자</h3>
                                </div>

                                <div className="card-actions">
                                    <button className="action-btn-primary" onClick={() => navigate('/create-task')}>
                                        <span className="icon"><PlusIcon /></span>
                                        <span className="text">구현과제 생성</span>
                                    </button>
                                </div>

                                <p className="card-description">
                                    업로드한 구현과제에 대한 모든 구직자의 채점 결과를 확인하세요.
                                </p>

                                <div className="list-container">
                                    <div className="list-item">
                                        <div className="list-content-row">
                                            <div className="item-info">
                                                <h4 className="item-title">반응형 네비게이션 바</h4>
                                                <p className="item-meta">제출자: 24명 • 마감: 2025.04.15</p>
                                            </div>
                                            <div className="item-arrow"><FaChevronRight /></div>
                                        </div>
                                    </div>

                                    <div className="list-item">
                                        <div className="list-content-row">
                                            <div className="item-info">
                                                <h4 className="item-title">상품 필터 UI</h4>
                                                <p className="item-meta">제출자: 18명 • 마감: 2025.04.10</p>
                                            </div>
                                            <div className="item-arrow"><FaChevronRight /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Seeker Column */}
                        <div className="grid-column">
                            <div className="card">
                                <div className="card-header">
                                    <span className="card-icon"><FaUserGraduate /></span>
                                    <h3 className="card-title">구직자</h3>
                                </div>

                                <button className="list-btn-view-all">
                                    모든 구현과제 리스트 보기
                                </button>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">구인자 채점 결과</h3>
                                </div>

                                <div className="list-container">
                                    <div className="seeker-item">
                                        <div className="seeker-row">
                                            <div className="seeker-info">
                                                <h4 className="seeker-name">TechCorp Inc.</h4>
                                                <p className="seeker-role">프론트엔드 개발자 포지션</p>

                                                <div className="seeker-stats">
                                                    <div className="score-badge">
                                                        <span className="star-icon"><FaStar /></span>
                                                        <span className="score-text">92점</span>
                                                    </div>
                                                    <span className="date-text">2025.03</span>
                                                </div>
                                            </div>
                                            <div className="item-arrow"><FaChevronRight /></div>
                                        </div>
                                    </div>

                                    <div className="seeker-item">
                                        <div className="seeker-row">
                                            <div className="seeker-info">
                                                <h4 className="seeker-name">디자인스튜디오</h4>
                                                <p className="seeker-role">UI/UX 엔지니어</p>

                                                <div className="seeker-stats">
                                                    <div className="score-badge">
                                                        <span className="star-icon"><FaStar /></span>
                                                        <span className="score-text">78점</span>
                                                    </div>
                                                    <span className="date-text">2025.02</span>
                                                </div>
                                            </div>
                                            <div className="item-arrow"><FaChevronRight /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <p className="info-text">결과를 클릭하면 구인자가 업로드한 파일의 배포 페이지로 이동합니다.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

// Helper component for the specific plus icon which might differ stylistically
function PlusIcon() {
    return <div style={{ fontSize: '14px', fontWeight: 'bold' }}>+</div>;
}
