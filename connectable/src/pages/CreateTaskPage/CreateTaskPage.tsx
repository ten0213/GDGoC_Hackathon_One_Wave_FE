import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import styles from './CreateTaskPage.module.css'
import { createAssignment } from '../../api/assignments'
import { getUserId } from '../../utils/userId'

interface Subtask {
  id: number
  title: string
}

let nextId = 1

export default function CreateTaskPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subtasks, setSubtasks] = useState<Subtask[]>([])
  const [submitting, setSubmitting] = useState(false)

  const addSubtask = () => {
    if (subtasks.length >= 3) return
    setSubtasks([...subtasks, { id: nextId++, title: '' }])
  }

  const removeSubtask = (id: number) => {
    setSubtasks(subtasks.filter((s) => s.id !== id))
  }

  const updateSubtask = (id: number, field: 'title', value: string) => {
    setSubtasks(subtasks.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitting(true)
    try {
      const result = await createAssignment({
        title,
        content,
        subTasks: subtasks.map((s) => s.title),
        userId: getUserId(),
      })
      navigate(`/TaskDetail/${result.id}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : '과제 생성에 실패했습니다.')
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Header />

      <main className={styles.main}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>구현 과제 생성</h1>
          <p className={styles.pageDescription}>새로운 개발 과제의 세부 정보를 입력하세요.</p>
        </div>

        {/* Two Column Layout */}
        <div className={styles.formGrid}>
          {/* Left Column: 제목 + 내용 */}
          <div className={styles.leftColumn}>
            {/* Title Section */}
            <div className={`${styles.section} ${styles.titleSection}`}>
              <div className={styles.sectionHeader}>
                <div className={`${styles.sectionIcon} ${styles.iconBlue}`}>
                  <i className="fas fa-heading"></i>
                </div>
                <h3 className={styles.sectionTitle}>제목</h3>
              </div>
              <input
                type="text"
                className={styles.titleInput}
                placeholder="예: 사용자 인증 시스템 구현"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className={styles.titleHint}>과제의 주제를 명확하게 표현해주세요.</p>
            </div>

            {/* Content Section */}
            <div className={`${styles.section} ${styles.contentSection}`}>
              <div className={styles.sectionHeader}>
                <div className={`${styles.sectionIcon} ${styles.iconGreen}`}>
                  <i className="fas fa-align-left"></i>
                </div>
                <h3 className={styles.sectionTitle}>내용</h3>
              </div>
              <textarea
                className={styles.textarea}
                placeholder="과제의 상세 설명, 기술 스택, 구현해야 할 기능, 제약 조건 등을 작성하세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={2000}
              />
              <div className={styles.contentFooter}>
                <span className={styles.charCount}>{content.length} / 2000자</span>
              </div>
            </div>
          </div>

          {/* Right Column: 서브테스크 + 제출 */}
          <div className={styles.rightColumn}>
            {/* Subtask Section */}
            <div className={`${styles.section} ${styles.subtaskSection}`}>
              <div className={styles.subtaskHeader}>
                <div className={styles.subtaskHeaderLeft}>
                  <div className={`${styles.sectionIcon} ${styles.iconPurple}`}>
                    <i className="fas fa-list-ul"></i>
                  </div>
                  <h3 className={styles.sectionTitle}>서브테스크</h3>
                </div>
                <button
                  className={styles.addBtn}
                  onClick={addSubtask}
                  disabled={subtasks.length >= 3}
                >
                  <span className={styles.addBtnIcon}>+</span>
                  <span>추가</span>
                </button>
              </div>

              <div className={styles.subtaskList}>
                {subtasks.map((subtask, index) => (
                  <div key={subtask.id} className={styles.subtaskCard}>
                    <div className={styles.subtaskNumber}>{index + 1}</div>
                    <div className={styles.subtaskContent}>
                      <input
                        type="text"
                        className={styles.subtaskTitleInput}
                        placeholder="서브테스크 제목"
                        value={subtask.title}
                        onChange={(e) => updateSubtask(subtask.id, 'title', e.target.value)}
                      />
                    </div>
                    <button className={styles.deleteBtn} onClick={() => removeSubtask(subtask.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                ))}

                {/* Empty state */}
                <div className={styles.subtaskEmpty}>
                  <span className={styles.subtaskEmptyIcon}>+</span>
                  <span className={styles.subtaskEmptyText}>
                    새 서브테스크를 추가하려면 위의 '추가' 버튼을 클릭하세요
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.submitSection}>
              <button
                className={styles.submitBtn}
                disabled={
                  submitting ||
                  subtasks.length === 0 ||
                  !title.trim() ||
                  !content.trim() ||
                  subtasks.some((s) => !s.title.trim())
                }
                onClick={handleSubmit}
              >
                {submitting ? '제출 중...' : '제출하기'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
