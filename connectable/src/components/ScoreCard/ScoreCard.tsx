import styles from './ScoreCard.module.css'

interface ScoreItem {
  label: string
  score: number
  total: number
  color: 'green' | 'blue' | 'orange'
}

const scores: ScoreItem[] = [
  { label: '레이아웃 정확도', score: 95, total: 100, color: 'green' },
  { label: '반응형 동작', score: 88, total: 100, color: 'blue' },
  { label: '접근성', score: 76, total: 100, color: 'orange' },
]

export default function ScoreCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            <i className="fas fa-user"></i>
          </div>
          <div>
            <div className={styles.name}>회사 관리자</div>
            <div className={styles.task}>과제: 반응형 네비게이션 바</div>
          </div>
        </div>
        <div className={styles.badge}>채점 중</div>
      </div>
      <div className={styles.body}>
        {scores.map((item) => (
          <div key={item.label}>
            <div className={styles.scoreRow}>
              <span className={styles.scoreLabel}>{item.label}</span>
              <span className={styles.scoreValue}>
                {item.score}/{item.total}
              </span>
            </div>
            <div className={styles.bar}>
              <div
                className={`${styles.barFill} ${styles[item.color]}`}
                style={{ width: `${(item.score / item.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
