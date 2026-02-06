import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaVial, FaCheckCircle, FaInbox } from "react-icons/fa";
import Header from "../components/Header";
import "./TaskDetail.css";
import { getAssignmentById, submitAssignment } from "../api/assignments";
import type { Assignment, SubmissionResponse } from "../api/assignments";
import { getUserId } from "../utils/userId";

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [phase, setPhase] = useState<"idle" | "grading" | "done">("idle");

  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);


  const [submitError, setSubmitError] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    getAssignmentById(id)
      .then((data) => setAssignment(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    if (!url.trim() || !id) return;
    setPhase("grading");
    setSubmitError(null);
    try {
      const result = await submitAssignment(id, getUserId(), url);
      if (!result) throw new Error("서버에서 잘못된 응답을 받았습니다.");
      setSubmission(result);
      setPhase("done");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "채점에 실패했습니다.");
      setPhase("idle");
    }
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
                  <p className="td-description">{assignment.content}</p>
                </div>

                <div className="td-content-box">
                  <h4 className="td-section-title">서브테스크 내용</h4>
                  <div className="td-subtask-lineup">
                    {(assignment.subTasks ?? []).map((st, i) => (
                      <span key={i}>-{st}<br /></span>
                    ))}
                  </div>
                </div>

                {/* URL 입력 섹션 */}
                <div className="td-upload-section">
                  <h4 className="td-section-title">구현과제 제출</h4>
                  <div className="URLinput">
                    <input
                      className="URL"
                      placeholder="url을 입력해주세요"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                {submitError && (
                  <p style={{ color: "red", padding: "0.5rem 1rem" }}>오류: {submitError}</p>
                )}

                <div className="td-btn-wrap">
                  <button
                    className="td-submit-btn"
                    disabled={!url.trim() || phase !== "idle"}
                    onClick={handleSubmit}
                  >
                    {phase === "idle" ? "제출 하기" : phase === "grading" ? "채점 중..." : "제출 완료"}
                  </button>
                </div>
              </div>
            </div>

            {/* 오른쪽 영역 */}
            <div className="td-column">
              {/* 제출 전 */}
              {phase === "idle" && (
                <div className="card">
                  <div className="td-idle-placeholder">
                    <FaInbox className="td-idle-icon" />
                    <p className="td-idle-title">아직 제출된 과제가 없습니다</p>
                    <p className="td-idle-desc">파일을 업로드하고 제출하면 AI 채점이 시작됩니다.</p>
                  </div>
                </div>
              )}

              {/* 채점 중 */}
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

              {/* 결과 수신 후 */}
              {phase === "done" && submission && (
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
                        <span
                          className={`td-badge ${
                            submission.status === "COMPLETED" ? "td-badge-pass" : "td-badge-fail"
                          }`}
                        >
                          {submission.status === "COMPLETED" ? "완료" : "실패"}
                        </span>
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
                      {(submission?.gradingResults ?? []).map((item) => (
                        <div key={item.taskName} className="td-result-item">
                          <span className="td-result-label">{item.taskName}</span>
                          <span
                            className={`td-badge ${
                              item.isPassed ? "td-badge-pass" : "td-badge-fail"
                            }`}
                          >
                            {item.isPassed ? "통과" : "실패"}
                          </span>
                        </div>
                      ))}
                      {(submission?.gradingResults?.length ?? 0) === 0 && (
                        <p style={{ padding: "1rem", color: "#888" }}>0점입니다.</p>
                      )}
                    </div>
                  </div>

                  {submission?.summary && (
                    <div className="card">
                      <div className="DetailResultForm">
                        <span className="DetailResultName">
                          통과율:&nbsp;
                          <span className="DetailResultScore">{submission.summary.passRate}</span>
                          &nbsp;({submission.summary.passedCount}/{submission.summary.totalCount})
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
