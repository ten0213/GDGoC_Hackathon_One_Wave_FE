import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <i className="fas fa-code"></i>
          <span>CodeJudge</span>
        </div>
        <p className={styles.copyright}>
          © 2025 CodeJudge. B2B 프론트엔드 구현과제 AI 채점 서비스.
        </p>
        <div className={styles.socials}>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-github"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  )
}
