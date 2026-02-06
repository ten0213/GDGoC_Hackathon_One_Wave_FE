export interface Assignment {
  id: string;
  title: string;
  content: string;
  subTasks: string[];
  userId: string;
  createdAt?: string;
}

interface PageResponse {
  content: Assignment[];
  page: { size: number; number: number; totalElements: number; totalPages: number };
}

interface ApiWrapper<T> {
  success: boolean;
  data: T;
  error: string | null;
}

export async function getAssignments(page = 0, size = 10): Promise<PageResponse> {
  const res = await fetch(`/api/assignments?page=${page}&size=${size}`);
  if (!res.ok) throw new Error(`Failed to fetch assignments: ${res.status}`);
  return res.json();
}

export async function getAssignmentById(id: string): Promise<Assignment> {
  const res = await fetch(`/api/assignments/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch assignment: ${res.status}`);
  const wrapper: ApiWrapper<Assignment> = await res.json();
  if (!wrapper.success) throw new Error(wrapper.error || 'Unknown error');
  return wrapper.data;
}

export interface GradingResult {
  taskName: string;
  isPassed: boolean;
}

export interface GradingSummary {
  passedCount: number;
  totalCount: number;
  passRate: string;
}

export interface SubmissionResponse {
  id: string;
  fileUrl: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  gradingResults: GradingResult[];
  summary: GradingSummary;
  createdAt: string;
}

export async function submitAssignment(
  assignmentId: string,
  userId: string,
  url: string,
): Promise<SubmissionResponse> {
  const res = await fetch(`/api/assignments/${assignmentId}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, url }),
  });
  if (!res.ok) throw new Error(`Failed to submit: ${res.status}`);
  const wrapper: ApiWrapper<SubmissionResponse> = await res.json();
  if (!wrapper.success) throw new Error(wrapper.error || 'Unknown error');
  return wrapper.data;
}

export async function createAssignment(body: {
  title: string;
  content: string;
  subTasks: string[];
  userId: string;
}): Promise<Assignment> {
  const res = await fetch(`/api/assignments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to create assignment: ${res.status}`);
  const wrapper: ApiWrapper<Assignment> = await res.json();
  if (!wrapper.success) throw new Error(wrapper.error || 'Unknown error');
  return wrapper.data;
}
