import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaVial, FaCheckCircle, FaInbox } from "react-icons/fa";
import Header from "../components/Header";
import "./TaskDetail.css";
import { getAssignmentById } from "../api/assignments";
import type { Assignment } from "../api/assignments";

interface GradingResult {
  label: string;
  status: "pass" | "fail";
}

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 채점 상태: "idle" (제출 전) | "grading" (채점 중) | "done" (결과 수신)
  const [phase, setPhase] = useState<"idle" | "grading" | "done">("idle");
  const [gradingResults, setGradingResults] = useState<GradingResult[]>([]);
  const [totalScore, setTotalScore] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    getAssignmentById(id)
      .then((data) => setAssignment(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  /** zip 파일 검증 + 저장 */
  const handleFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".zip")) {
      alert("zip 파일만 업로드 가능합니다.");
      return;
    }
    setFile(file);
  };

  /** 드래그 드롭 */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  /** 드래그 중 기본 동작 방지 */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /** 클릭 시 파일 선택 */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  /** input 파일 선택 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  /** 제출 → 백엔드 연동 시 여기만 수정 */
  const handleSubmit = async () => {
    if (!file) return;
    setPhase("grading");

    // TODO: 실제 백엔드 API 호출로 교체
    setTimeout(() => {
      setGradingResults([
        { label: "반응형 레이아웃", status: "pass" },
        { label: "버튼 상호작용", status: "fail" },
        { label: "접근성", status: "pass" },
      ]);
      setTotalScore(80);
      setPhase("done");
    }, 3000);
  };

  if (loading) return <div className="td-page"><Header /><p style={{ padding: '2rem' }}>로딩 중...</p></div>;
  if (error) return <div className="td-page"><Header /><p style={{ padding: '2rem' }}>오류: {error}</p></div>;
  if (!assignment) return <div className="td-page"><Header /><p style={{ padding: '2rem' }}>과제를 찾을 수 없습니다.</p></div>;

  return (
    <div className="td-page">
      <Header />

      <div className="td-content-wrapper">
        <main className="td-main">
          {/* 페이지 헤더 */}
          <header className="header-section">
            <div className="page-title">
              <h1>구현과제 상세</h1>
              <p className="page-description">
                AI가 Playwright를 이용해 브라우저 엔드투엔드 테스트를 실행합니다.
              </p>
            </div>
          </header>

          <div className="td-grid">
            {/* 왼쪽 영역 */}
            <div className="td-column">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">{assignment.title}</h3>
                </div>

                <div className="td-content-box">
                  <h4 className="td-section-title">구현과제 내용</h4>
                  <p className="td-description">
                    {assignment.content}
                  </p>
                </div>

                <div className="td-content-box">
                  <h4 className="td-section-title">서브테스크 내용</h4>
                  <div className="td-subtask-lineup">
                    {(assignment.subTasks ?? []).map((st, i) => (
                      <span key={i}>-{st}<br/></span>
                    ))}
                  </div>
                </div>

                {/* 업로드 섹션 */}
                <div className="td-upload-section">
                  <h4 className="td-section-title">구현과제 업로드 섹션</h4>

                  <div
                    className="td-upload-area"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleClick}
                  >
                    <FaCloudUploadAlt className="td-upload-icon" />
                    <p className="td-upload-text">
                      {file ? file.name : "빌드 파일을 드래그 앤 드롭하세요"}
                    </p>
                    <p className="td-upload-hint">또는 클릭하여 파일 선택</p>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".zip"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="td-btn-wrap">
                  <button
                    className="td-submit-btn"
                    disabled={!file || phase !== "idle"}
                    onClick={handleSubmit}
                  >
                    {phase === "idle" ? "제출 하기" : phase === "grading" ? "채점 중..." : "제출 완료"}
                  </button>
                </div>
              </div>
            </div>

            {/* 오른쪽 영역 */}
            <div className="td-column">
              {/* ── 제출 전: 대기 안내 ── */}
              {phase === "idle" && (
                <div className="card">
                  <div className="td-idle-placeholder">
                    <FaInbox className="td-idle-icon" />
                    <p className="td-idle-title">아직 제출된 과제가 없습니다</p>
                    <p className="td-idle-desc">
                      파일을 업로드하고 제출하면 AI 채점이 시작됩니다.
                    </p>
                  </div>
                </div>
              )}

              {/* ── 채점 중: 스피너 + 진행 상황 ── */}
              {phase === "grading" && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">AI 채점 진행 상황</h3>
                  </div>
                  <div className="td-ai-list">
                    <div className="td-ai-item">
                      <div className="td-ai-left">
                        <div className="td-ai-icon td-ai-icon-blue">
                          <FaVial />
                        </div>
                        <div className="td-ai-info">
                          <span className="td-ai-name">Playwright 채점 진행 중</span>
                          <span className="td-ai-desc">브라우저 자동화 진행</span>
                        </div>
                      </div>
                      <div className="spinner" />
                    </div>
                    <div className="td-ai-item">
                      <div className="td-ai-left">
                        <div className="td-ai-icon td-ai-icon-purple">
                          <FaCheckCircle />
                        </div>
                        <div className="td-ai-info">
                          <span className="td-ai-name">Sub-task 평가</span>
                        </div>
                      </div>
                      <span className="td-badge td-badge-progress">진행 중</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── 결과 수신 후: 채점 결과 + 총점 ── */}
              {phase === "done" && (
                <>
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">AI 채점 진행 상황</h3>
                    </div>
                    <div className="td-ai-list">
                      <div className="td-ai-item">
                        <div className="td-ai-left">
                          <div className="td-ai-icon td-ai-icon-blue">
                            <FaVial />
                          </div>
                          <div className="td-ai-info">
                            <span className="td-ai-name">Playwright 채점</span>
                            <span className="td-ai-desc">채점 완료</span>
                          </div>
                        </div>
                        <span className="td-badge td-badge-pass">완료</span>
                      </div>
                      <div className="td-ai-item">
                        <div className="td-ai-left">
                          <div className="td-ai-icon td-ai-icon-purple">
                            <FaCheckCircle />
                          </div>
                          <div className="td-ai-info">
                            <span className="td-ai-name">Sub-task 평가</span>
                          </div>
                        </div>
                        <span className="td-badge td-badge-pass">완료</span>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">구현과제 채점 결과</h3>
                    </div>
                    <div className="td-results-list">
                      {gradingResults.map((item) => (
                        <div key={item.label} className="td-result-item">
                          <span className="td-result-label">{item.label}</span>
                          <span
                            className={`td-badge ${
                              item.status === "pass"
                                ? "td-badge-pass"
                                : "td-badge-fail"
                            }`}
                          >
                            {item.status === "pass" ? "통과" : "실패"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {totalScore !== null && (
                    <div className="card">
                      <div className="DetailResultForm">
                        <span className="DetailResultName">
                          총점:&nbsp;
                          <span className="DetailResultScore">{totalScore}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
