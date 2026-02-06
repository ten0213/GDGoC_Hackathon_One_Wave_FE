import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import './Auth.css';

const SignupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const result = registerUser({ name, identifier, email, password });
        if (!result.success) {
            setError(result.message);
            return;
        }

        setSuccess(result.message);
        setTimeout(() => navigate('/login'), 1000);
    };

    return (
        <div className="auth-page-wrapper">
            <main className="auth-main">
                <div className="auth-content">
                    <h2 className="auth-title">회원가입</h2>
                    <p className="auth-subtitle">티오피컴의 회원이 되어 다양한 혜택을 누려보세요</p>

                    {error && <div className="auth-error">{error}</div>}
                    {success && <div className="auth-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">이름</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="이름을 입력해 주세요"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">사용자 ID</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="아이디를 입력해 주세요"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">이메일</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="이메일을 입력해 주세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">비밀번호</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="비밀번호를 입력해 주세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">비밀번호 확인</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="비밀번호를 다시 입력해 주세요"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">회원가입</button>
                    </form>

                    <div className="auth-link">
                        이미 계정이 있으신가요?
                        <Link to="/login">로그인</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignupPage;
