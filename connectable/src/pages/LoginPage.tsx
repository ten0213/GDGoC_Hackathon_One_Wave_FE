import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import './Auth.css';

const LoginPage: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { identifier, password });
    };

    return (
        <div className="auth-page-wrapper">
            <main className="auth-main">
                <div className="auth-content">
                    <h2 className="auth-title">로그인</h2>
                    <p className="auth-subtitle">티오피컴 계정으로 더 나은 서비스를 경험해 보세요</p>

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

                    <div className="divider">or continue with</div>

                    <div className="social-buttons">
                        <button className="social-btn google">
                            <FcGoogle size={20} />
                            Google
                        </button>
                        <button className="social-btn kakao">
                            <RiKakaoTalkFill size={20} />
                            Kakao
                        </button>
                        <button className="social-btn naver">
                            <SiNaver size={18} />
                            Naver
                        </button>
                    </div>

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
