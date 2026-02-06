# Assignment API 연동 변경 보고서

## 개요
백엔드 Assignment API 3개(목록 조회, 상세 조회, 생성)를 프론트엔드에 연동하였습니다.

**Base URL:** `http://34.22.80.216:8080`

---

## 신규 파일

### `connectable/src/utils/userId.ts`
- `getUserId()` 함수: localStorage에서 UUID를 가져오거나, 없으면 `crypto.randomUUID()`로 생성 후 저장
- 키: `connectable_user_id`

### `connectable/src/api/assignments.ts`
- `Assignment` 인터페이스 정의 (id, title, content, subtasks, userId, createdAt)
- `getAssignments(page, size)`: `GET /api/assignments` — 페이지네이션된 목록 조회 (래퍼 없이 직접 반환)
- `getAssignmentById(id)`: `GET /api/assignments/{id}` — `{success, data, error}` 래퍼에서 `data` 추출
- `createAssignment(body)`: `POST /api/assignments` — `{success, data, error}` 래퍼에서 `data` 추출
- 모든 ID는 UUID `string` 타입

---

## 수정 파일

### `connectable/src/App.tsx`
- 중복 import `TaskColletion` (오타 포함) 제거
- `path="tasks"` → `path="/tasks"` (앞에 `/` 추가)
- `path="TaskDetail"` → `path="/TaskDetail/:id"` (`:id` 파라미터 추가)

### `connectable/src/pages/TaskCollection.tsx`
- 하드코딩된 `tasks` 배열 제거
- `useEffect` + `getAssignments()`로 API에서 과제 목록 로드
- 로딩 중 / 오류 / 빈 목록 상태 처리 추가
- `handleSolveClick(id: string)` → `navigate(/TaskDetail/${id})`로 ID 기반 네비게이션
- 사용하지 않는 아이콘 import 정리 (`FaSearch`, `FaFile`, `FaClock`, `FaCode`, `FaChartBar`, `FaCog`, `FaClipboardList`, `FaUsers` 제거)

### `connectable/src/pages/CreateTaskPage/CreateTaskPage.tsx`
- `handleSubmit` 추가: `createAssignment()` API 호출
- `getUserId()`로 userId 자동 생성/전달
- `subtasks.map(s => s.title)`로 서브테스크를 `string[]`로 변환하여 전송
- 성공 시 `/TaskDetail/${result.id}`로 자동 이동
- `submitting` 상태로 중복 제출 방지
- 초기 서브테스크 목록을 빈 배열(`[]`)로 변경

### `connectable/src/pages/TaskDetail.tsx`
- `useParams<{id: string}>()`로 URL에서 과제 ID 추출
- `useEffect` + `getAssignmentById(id)`로 API에서 과제 상세 데이터 로드
- 하드코딩된 제목(`[제목란]`), 내용, 서브테스크를 API 데이터로 대체
- 로딩/오류/404 상태 처리 추가
- 우측 영역(채점/업로드)은 기존 동작 유지

---

## API 응답 형식

| 엔드포인트 | 응답 형식 | 비고 |
|-----------|----------|------|
| `GET /api/assignments` | `{content: [], page: {...}}` | 래퍼 없이 직접 반환 |
| `GET /api/assignments/{id}` | `{success, data, error}` | data에서 Assignment 추출 |
| `POST /api/assignments` | `{success, data, error}` | data에서 생성된 Assignment 추출 |
