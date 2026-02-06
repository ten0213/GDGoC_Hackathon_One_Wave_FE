import Header from '../../components/Header/Unlogin_Header'
import Footer from '../../layout/Footer/Footer'
import ProcessCard from '../../components/ProcessCard/ProcessCard'
import ScoreCard from '../../components/ScoreCard/ScoreCard'
import styles from './HomePage.module.css'

const processSteps = [
  {
    icon: 'fas fa-cloud-upload-alt',
    color: 'blue' as const,
    title: '1. 과제 업로드',
    description: '회사가 프론트엔드 구현과제를 업로드합니다.',
  },
  {
    icon: 'fas fa-file-export',
    color: 'green' as const,
    title: '2. 빌드 파일 제출',
    description: '구직자가 완성된 빌드 파일을 제출합니다.',
  },
  {
    icon: 'fas fa-robot',
    color: 'purple' as const,
    title: '3. AI 채점 실행',
    description: 'Playwright 기반 AI가 엔드투엔드 테스트로 채점을 시작합니다.',
  },
  {
    icon: 'fas fa-chart-bar',
    color: 'yellow' as const,
    title: '4. 결과 공개',
    description: '세부 과제별 채점 결과를 회사와 구직자가 확인합니다.',
  },
]

const featureItems = [
  '실제 브라우저 환경에서의 동작 검증',
  '구현과제별 Sub-task 상세 채점',
  '모든 구직자 점수 비교 대시보드',
  '회사 전용 관리자 페이지 제공',
]

export default function HomePage() {
  return (
    <div>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            프론트엔드 구현과제, <span className={styles.accent}>AI가 정확하게 <br/>채점합니다</span>
          </h1>
          <p className={styles.heroDescription}>
            구인 회사가 업로드한 구현과제를 구직자가 제출하면, Playwright 기반 AI가 자동으로
            채점합니다.
            <br />
            모든 과정이 투명하고, 세부 과제별 결과를 실시간으로 확인하세요.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnPrimary}>채험하기</button>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.processSection}>
          <h2 className={styles.processTitle}>간단한 4단계 프로세스</h2>
          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <ProcessCard key={step.title} {...step} />
            ))}
          </div>
        </section>

        {/* Feature Section */}
        <section className={styles.featureSection}>
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>
              프로그래머스, 백준을 참고한 직관적인 인터페이스
            </h3>
            <p className={styles.featureDescription}>
              익숙한 문제 해결 환경에서 AI 채점의 강력함을 경험하세요. 실시간 진행 상태, 세부 점수
              분석, 비교 차트까지
              <br />
              모든 데이터를 한눈에 확인할 수 있습니다.
            </p>
            <div className={styles.featureList}>
              {featureItems.map((item) => (
                <div key={item} className={styles.featureItem}>
                  <i className="fas fa-check-circle"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <ScoreCard />
        </section>
      </main>

      <Footer />
    </div>
  )
}
