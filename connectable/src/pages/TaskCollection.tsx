import { FaSearch, FaFile, FaClock, FaCode, FaChartBar, FaCog, FaClipboardList, FaUsers, FaArrowRight } from "react-icons/fa";
import './TaskCollection.css';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../layout/Footer/Footer";



const userAvatar = "https://ui-avatars.com/api/?name=User&background=random";

const tasks = [
  {
    title: "UI/UX 디자인 리뉴얼",
    author: "김지원",
    date: "2025.03",
    description: "기존 이커머스 앱의 사용자 경험을 분석하고 전체적인 인터페이스를 재설계한 프로젝트입니다.",
    techIcon: "file" as const,
  },
  {
    title: "백엔드 API 설계",
    author: "이민수",
    date: "2025.02",
    description: "사용자 관리 및 결제 시스템을 위한 RESTful API 설계 및 구현 코드 리뷰 과제입니다.",
    techIcon: "code" as const,
  },
  {
    title: "데이터 시각화 대시보드",
    author: "박서연",
    date: "2025.01",
    description: "실시간 판매 데이터를 시각화하고 인사이트를 제공하는 관리자 대시보드 프로토타입입니다.",
    techIcon: "code" as const,
  },
];

function TechIcon({ type }: { type: "file" | "code" }) {
  if (type === "file") return <FaFile />;
  return <FaCode />;
}

export default function VinsignPage() {

  const navigate = useNavigate();

const handleSolveClick = () => {
  navigate('/TaskDetail');
};
  return (
    <div className="vinsign-page">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="vinsign-main">
        <div className="vinsign-heading">
          <h2 className="vinsign-title">과제 모아보기</h2>
          <p className="vinsign-subtitle">지원자가 제출한 다양한 포트폴리오 과제를 확인하세요.</p>
        </div>

        {/* Task Cards */}
        <div className="vinsign-cards">
          {tasks.map((task) => (
            <div key={task.title} className="vinsign-card">
              <div className="vinsign-card-top">
                <h3 className="vinsign-card-title">{task.title}</h3>
                <p className="vinsign-card-meta">{task.author} · {task.date}</p>
              </div>
              <p className="vinsign-card-desc">{task.description}</p>
              <div className="vinsign-card-action">
                <button className="vinsign-card-btn" onClick={handleSolveClick}>문제 풀기</button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="vinsign-cta">
          <div className="vinsign-cta-text">
            <h3 className="vinsign-cta-title">과제가 더 필요하신가요?</h3>
            <p className="vinsign-cta-subtitle">다른 기업이 만든 추가 과제를 풀어보세요.</p>
          </div>
          <button className="vinsign-cta-btn">
            <span>더보기</span>
            <FaArrowRight />
          </button>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
