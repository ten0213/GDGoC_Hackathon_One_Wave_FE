import { useEffect, useState } from "react";

import './TaskCollection.css';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../layout/Footer/Footer";
import { getAssignments } from "../api/assignments";
import type { Assignment } from "../api/assignments";

export default function VinsignPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAssignments()
      .then((res) => setTasks(res.content))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSolveClick = (id: string) => {
    navigate(`/TaskDetail/${id}`);
  };

  return (
    <div className="vinsign-page">
      <Header/>

      <main className="vinsign-main">
        <div className="vinsign-heading">
          <h2 className="vinsign-title">과제 모아보기</h2>
          <p className="vinsign-subtitle">지원자가 제출한 다양한 포트폴리오 과제를 확인하세요.</p>
        </div>

        {/* Task Cards */}
        <div className="vinsign-cards">
          {loading && <p>로딩 중...</p>}
          {error && <p>오류: {error}</p>}
          {!loading && !error && tasks.length === 0 && <p>등록된 과제가 없습니다.</p>}
          {tasks.map((task) => (
            <div key={task.id} className="vinsign-card">
              <div className="vinsign-card-top">
                <h3 className="vinsign-card-title">{task.title}</h3>
                <p className="vinsign-card-meta">{task.createdAt ?? ''}</p>
              </div>
              <p className="vinsign-card-desc">{task.content}</p>
              <div className="vinsign-card-action">
                <button className="vinsign-card-btn" onClick={() => handleSolveClick(task.id)}>문제 풀기</button>
              </div>
            </div>
          ))}
        </div>

      </main>
      <Footer/>
    </div>
  );
}
