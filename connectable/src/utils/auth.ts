export interface User {
  name: string;
  identifier: string;
  email: string;
  password: string;
}

const USERS_KEY = 'connectable_users';
const CURRENT_USER_KEY = 'connectable_current_user';

export function getUsers(): User[] {
  const data = sessionStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function registerUser(user: User): { success: boolean; message: string } {
  const users = getUsers();
  if (users.some((u) => u.identifier === user.identifier)) {
    return { success: false, message: '이미 사용 중인 아이디입니다.' };
  }
  users.push(user);
  sessionStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true, message: '회원가입이 완료되었습니다.' };
}

export function loginUser(identifier: string, password: string): { success: boolean; message: string } {
  const users = getUsers();
  const user = users.find((u) => u.identifier === identifier);
  if (!user) {
    return { success: false, message: '존재하지 않는 아이디입니다.' };
  }
  if (user.password !== password) {
    return { success: false, message: '비밀번호가 일치하지 않습니다.' };
  }
  const { password: _, ...safeUser } = user;
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
  return { success: true, message: '로그인 성공!' };
}

export function getCurrentUser(): Omit<User, 'password'> | null {
  const data = sessionStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logoutUser(): void {
  sessionStorage.removeItem(CURRENT_USER_KEY);
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(CURRENT_USER_KEY) !== null;
}
