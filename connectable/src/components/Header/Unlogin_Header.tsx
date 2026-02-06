import { useNavigate } from 'react-router-dom'
import styles from './Unlogin_Header.module.css'

export default function Header() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <i className="fas fa-code"></i>
        <span>Connectable</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.loginBtn} onClick={handleLoginClick}>
          로그인
        </button>
        <button className={styles.startBtn}>무료로 시작하기</button>
      </div>
    </header>
  )
}

