const BASE_URL = 'http://34.22.80.216:8080';

export interface Assignment {
  id: string;
  title: string;
  content: string;
  subtasks: string[];
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
  const res = await fetch(`${BASE_URL}/api/assignments?page=${page}&size=${size}`);
  if (!res.ok) throw new Error(`Failed to fetch assignments: ${res.status}`);
  return res.json();
}

export async function getAssignmentById(id: string): Promise<Assignment> {
  const res = await fetch(`${BASE_URL}/api/assignments/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch assignment: ${res.status}`);
  const wrapper: ApiWrapper<Assignment> = await res.json();
  if (!wrapper.success) throw new Error(wrapper.error || 'Unknown error');
  return wrapper.data;
}

export async function createAssignment(body: {
  title: string;
  content: string;
  subtasks: string[];
  userId: string;
}): Promise<Assignment> {
  const res = await fetch(`${BASE_URL}/api/assignments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to create assignment: ${res.status}`);
  const wrapper: ApiWrapper<Assignment> = await res.json();
  if (!wrapper.success) throw new Error(wrapper.error || 'Unknown error');
  return wrapper.data;
}
