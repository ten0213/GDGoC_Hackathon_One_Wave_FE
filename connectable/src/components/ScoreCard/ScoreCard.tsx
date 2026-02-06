import styles from './ScoreCard.module.css'

const gradingResults = [
  { label: '반응형 레이아웃', status: 'pass' as const },
  { label: '버튼 상호작용', status: 'fail' as const },
  { label: '접근성', status: 'pass' as const },
]

export default function ScoreCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>구현과제 채점 결과</h3>
      </div>
      <div className={styles.resultsList}>
        {gradingResults.map((item) => (
          <div key={item.label} className={styles.resultItem}>
            <span className={styles.resultLabel}>{item.label}</span>
            <span
              className={`${styles.statusBadge} ${
                item.status === 'pass' ? styles.badgePass : styles.badgeFail
              }`}
            >
              {item.status === 'pass' ? '통과' : '실패'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
