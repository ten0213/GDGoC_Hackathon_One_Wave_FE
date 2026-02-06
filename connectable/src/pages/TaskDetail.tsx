import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaVial, FaCheckCircle } from "react-icons/fa";
import Header from "../components/Header";
import "./TaskDetail.css";

const gradingResults = [
  { label: "반응형 레이아웃", status: "pass" as const },
  { label: "버튼 상호작용", status: "fail" as const },
  { label: "접근성", status: "pass" as const },
];

export default function TaskDetail() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

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
                  <h3 className="card-title">구현과제 상세 페이지</h3>
                </div>

                <div className="td-content-box">
                  <h4 className="td-section-title">구현과제 내용</h4>
                  <p className="td-description">
                    Next.js 14와 Tailwind CSS를 사용하여 대시보드 페이지를 구현하세요.
                    사용자 프로필 카드, 최근 활동 테이블, 차트 컴포넌트가 포함되어야 합니다.
                  </p>
                </div>

                <div className="td-content-box">
                  <h4 className="td-section-title">서브테스크 내용</h4>
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
                  <button className="td-submit-btn" disabled={!file}>
                    제출 하기
                  </button>
                </div>
              </div>
            </div>

            {/* 오른쪽 영역 */}
            <div className="td-column">
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
                    <div className="td-progress-bar">
                      <div
                        className="td-progress-fill"
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>

                  <div className="td-ai-item">
                    <div className="td-ai-left">
                      <div className="td-ai-icon td-ai-icon-purple">
                        <FaCheckCircle />
                      </div>
                      <div className="td-ai-info">
                        <span className="td-ai-name">Sub-task 평가</span>
                        <span className="td-ai-desc">5/7 완료</span>
                      </div>
                    </div>
                    <span className="td-badge td-badge-progress">진행 중</span>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
