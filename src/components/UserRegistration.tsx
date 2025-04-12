import React, { useState } from 'react';
import './UserRegistration.css';
import { registerUser, registerCreator } from '../api/couponApi';

const UserRegistration: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [registrationType, setRegistrationType] = useState<'user' | 'creator'>('user');
  const [registeredId, setRegisteredId] = useState<number | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRegistrationTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationType(e.target.value as 'user' | 'creator');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      setMessage('이름을 입력해주세요.');
      setMessageType('error');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      setMessageType('');
      setRegisteredId(null);

      // API 호출
      if (registrationType === 'user') {
        const response = await registerUser({ name });
        setRegisteredId(response.userId);
        setMessage('사용자가 성공적으로 등록되었습니다.');
      } else {
        const response = await registerCreator({ name });
        setRegisteredId(response.creatorId);
        setMessage('쿠폰 생성자가 성공적으로 등록되었습니다.');
      }
      
      setMessageType('success');
      
      // 폼 초기화
      setName('');
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      // 서버에서 온 에러 메시지 그대로 표시
      setMessage(error instanceof Error ? error.message : '등록 중 오류가 발생했습니다.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-registration-container">
      <h2>사용자 등록</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
            disabled={isLoading}
            required
          />
        </div>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="user"
              name="registrationType"
              value="user"
              checked={registrationType === 'user'}
              onChange={handleRegistrationTypeChange}
              disabled={isLoading}
            />
            <label htmlFor="user">일반 사용자</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="creator"
              name="registrationType"
              value="creator"
              checked={registrationType === 'creator'}
              onChange={handleRegistrationTypeChange}
              disabled={isLoading}
            />
            <label htmlFor="creator">쿠폰 생성자</label>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? '처리 중...' : '등록하기'}
        </button>
      </form>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      {registeredId && (
        <div className="registration-result">
          <h3>등록 결과</h3>
          <p>
            <strong>{registrationType === 'user' ? '사용자 ID' : '생성자 ID'}:</strong> {registeredId}
          </p>
          <div className="id-reminder">
            이 ID를 꼭 기억해주세요. 쿠폰 발급 및 생성에 필요합니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration; 