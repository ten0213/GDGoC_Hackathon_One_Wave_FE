import { FaCloudUploadAlt, FaVial, FaCheckCircle } from 'react-icons/fa';
import Header from '../components/Header';
import './TaskDetail.css';

const gradingResults = [
  { label: '반응형 레이아웃', status: 'pass' as const },
  { label: '버튼 상호작용', status: 'fail' as const },
  { label: '접근성', status: 'pass' as const },
];

export default function TaskDetail() {
  return (
    <div className="td-page">
      <Header />

      <div className="td-content-wrapper">
        <main className="td-main">
          <header className="header-section">
            <div className="page-title">
              <h1>구현과제 상세</h1>
              <p className="page-description">AI가 Playwright를 이용해 브라우저 엔드투엔드 테스트를 실행합니다.</p>
            </div>
          </header>

          <div className="td-grid">
            {/* 왼쪽: 과제 내용 + 업로드 + 버튼 */}
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

                <div className="td-upload-section">
                  <h4 className="td-section-title">구현과제 업로드 섹션</h4>
                  <div className="td-upload-area">
                    <FaCloudUploadAlt className="td-upload-icon" />
                    <p className="td-upload-text">빌드 파일을 드래그 앤 드롭하세요</p>
                    <p className="td-upload-hint">또는 클릭하여 파일 선택</p>
                  </div>
                </div>

                <div className="td-btn-wrap">
                  <button className="td-submit-btn">문제 풀기</button>
                </div>
              </div>
            </div>

            {/* 오른쪽: AI 채점 진행 + 채점 결과 */}
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
                        <span className="td-ai-name">Playwright 테스트 실행 중</span>
                        <span className="td-ai-desc">브라우저 자동화 진행</span>
                      </div>
                    </div>
                    <div className="td-progress-bar">
                      <div className="td-progress-fill" style={{ width: '75%' }} />
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
                      <span className={`td-badge ${item.status === 'pass' ? 'td-badge-pass' : 'td-badge-fail'}`}>
                        {item.status === 'pass' ? '통과' : '실패'}
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
