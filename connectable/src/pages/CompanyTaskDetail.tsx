import { useState } from "react";
import { FaUsers, FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./CompanyTaskDetail.css";

interface Submitter {
  name: string;
  submittedAt: string;
  results: { label: string; status: "pass" | "fail" }[];
}

const taskInfo = {
  title: "반응형 네비게이션 바",
  description:
    "Next.js 14와 Tailwind CSS를 사용하여 반응형 네비게이션 바를 구현하세요. 모바일, 태블릿, 데스크톱 환경에서 모두 정상 동작해야 합니다.",
  totalSubmitters: 24,
};

const submitters: Submitter[] = [
  { name: "김지원", submittedAt: "2025.04.01", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "이민수", submittedAt: "2025.04.01", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "pass" }] },
  { name: "박서연", submittedAt: "2025.04.02", results: [{ label: "반응형 레이아웃", status: "fail" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "pass" }] },
  { name: "최준호", submittedAt: "2025.04.02", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "fail" }] },
  { name: "정하늘", submittedAt: "2025.04.03", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "한소희", submittedAt: "2025.04.03", results: [{ label: "반응형 레이아웃", status: "fail" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "오태양", submittedAt: "2025.04.04", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "fail" }] },
  { name: "윤서진", submittedAt: "2025.04.04", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "임도현", submittedAt: "2025.04.05", results: [{ label: "반응형 레이아웃", status: "fail" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "fail" }] },
  { name: "강예린", submittedAt: "2025.04.05", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "송민재", submittedAt: "2025.04.06", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "pass" }] },
  { name: "조은비", submittedAt: "2025.04.06", results: [{ label: "반응형 레이아웃", status: "fail" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "fail" }] },
  { name: "배주영", submittedAt: "2025.04.07", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "류시우", submittedAt: "2025.04.07", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "fail" }] },
  { name: "권나윤", submittedAt: "2025.04.08", results: [{ label: "반응형 레이아웃", status: "fail" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "장현우", submittedAt: "2025.04.08", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "pass" }] },
  { name: "신유진", submittedAt: "2025.04.09", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "홍승우", submittedAt: "2025.04.09", results: [{ label: "반응형 레이아웃", status: "fail" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "pass" }] },
  { name: "문지아", submittedAt: "2025.04.10", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "fail" }] },
  { name: "서동혁", submittedAt: "2025.04.10", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "fail" }] },
  { name: "안수빈", submittedAt: "2025.04.11", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "전예준", submittedAt: "2025.04.11", results: [{ label: "반응형 레이아웃", status: "fail" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "pass" }] },
  { name: "남지호", submittedAt: "2025.04.12", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "pass" }, { label: "접근성", status: "fail" }] },
  { name: "황채원", submittedAt: "2025.04.12", results: [{ label: "반응형 레이아웃", status: "pass" }, { label: "버튼 상호작용", status: "fail" }, { label: "접근성", status: "pass" }] },
];

const PAGE_SIZE = 5;

export default function CompanyTaskDetail() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(submitters.length / PAGE_SIZE);
  const paged = submitters.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="ct-page">
      <Header />

      <div className="ct-content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-heading">
            <h2 className="sidebar-title">구현과제</h2>
          </div>

          <nav className="nav-menu">
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/subpage'); }}>
              <div className="nav-icon"><FaArrowRight /></div>
              <span className="nav-text">구현 시작</span>
            </a>
            <a href="#" className="nav-item active">
              <div className="nav-icon"><FaArrowRight /></div>
              <span className="nav-text">과제 상세 관리</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/taskcollection'); }}>
              <div className="nav-icon"><FaArrowRight /></div>
              <span className="nav-text">모든 과제</span>
            </a>
          </nav>
        </aside>

        <main className="ct-main">
          {/* 페이지 헤더 */}
          <header className="header-section">
            <div className="page-title">
              <h1>과제 상세 관리</h1>
              <p className="page-description">
                채용을 위한 과제 제출 현황과 제출자별 채점 결과를 확인하세요.
              </p>
            </div>
          </header>

          <div className="ct-grid">
            {/* 왼쪽: 과제 정보 */}
            <div className="ct-column">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">과제 정보</h3>
                </div>

                <div className="ct-info-box">
                  <h4 className="ct-info-label">과제명</h4>
                  <p className="ct-info-value">{taskInfo.title}</p>
                </div>

                <div className="ct-info-box">
                  <h4 className="ct-info-label">과제 설명</h4>
                  <p className="ct-info-desc">{taskInfo.description}</p>
                </div>

                <div className="ct-stats-row">
                  <div className="ct-stat-item">
                    <div className="ct-stat-icon ct-stat-icon-blue">
                      <FaUsers />
                    </div>
                    <div className="ct-stat-info">
                      <span className="ct-stat-label">제출자</span>
                      <span className="ct-stat-value">
                        {taskInfo.totalSubmitters}명
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 제출자 목록 */}
            <div className="ct-column">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">제출자 목록</h3>
                  <span className="ct-count-badge">
                    {submitters.length}명
                  </span>
                </div>

                <div className="ct-submitter-list">
                  {paged.map((s) => {
                    const passCount = s.results.filter(
                      (r) => r.status === "pass"
                    ).length;
                    const allPass = passCount === s.results.length;

                    return (
                      <div key={s.name} className="ct-submitter-item">
                        <div className="ct-submitter-top">
                          <div className="ct-submitter-info">
                            <h4 className="ct-submitter-name">{s.name}</h4>
                            <p className="ct-submitter-date">
                              제출일: {s.submittedAt}
                            </p>
                          </div>
                          <span
                            className={`ct-badge ${
                              allPass ? "ct-badge-pass" : "ct-badge-fail"
                            }`}
                          >
                            {allPass ? "전체 통과" : `${passCount}/${s.results.length} 통과`}
                          </span>
                        </div>

                        <div className="ct-results-row">
                          {s.results.map((r) => (
                            <div key={r.label} className="ct-result-chip">
                              <span className="ct-result-label">{r.label}</span>
                              <span
                                className={`ct-badge-sm ${
                                  r.status === "pass"
                                    ? "ct-badge-sm-pass"
                                    : "ct-badge-sm-fail"
                                }`}
                              >
                                {r.status === "pass" ? "통과" : "실패"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="ct-pagination">
                  <button
                    className="ct-page-btn"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <button
                        key={n}
                        className={`ct-page-num ${n === page ? "ct-page-active" : ""}`}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    )
                  )}

                  <button
                    className="ct-page-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
