import styles from './ProcessCard.module.css'

interface ProcessCardProps {
  icon: string
  color: 'blue' | 'green' | 'purple' | 'yellow'
  title: string
  description: string
}

export default function ProcessCard({ icon, color, title, description }: ProcessCardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.icon} ${styles[color]}`}>
        <i className={icon}></i>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
