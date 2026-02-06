import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import './Auth.css';

const LoginPage: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = loginUser(identifier, password);
        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate('/');
    };

    return (
        <div className="auth-page-wrapper">
            <main className="auth-main">
                <div className="auth-content">
                    <h2 className="auth-title">로그인</h2>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">사용자 이름</label>
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
                        <button type="submit" className="submit-btn">로그인</button>
                    </form>

                    <div className="auth-link">
                        계정이 없으신가요?
                        <Link to="/signup">회원가입</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
