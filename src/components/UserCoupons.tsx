import React, { useState, useEffect } from 'react';
import './UserCoupons.css';
import { getUserCoupons } from '../api/couponApi';
import { IssuedCoupon } from '../types';

const UserCoupons: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | ''>('');
  const [userCoupons, setUserCoupons] = useState<IssuedCoupon[]>([]);
  const [searched, setSearched] = useState<boolean>(false);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const fetchUserCoupons = async () => {
    if (!userId) {
      setMessage('사용자 ID를 입력해주세요.');
      setMessageType('error');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      setMessageType('');
      setSearched(true);

      const response = await getUserCoupons(Number(userId));
      setUserCoupons(response.issuedCoupons);

      if (response.issuedCoupons.length === 0) {
        setMessage('발급받은 쿠폰이 없습니다.');
        setMessageType('info');
      }
    } catch (error) {
      console.error('쿠폰 목록 조회 중 오류 발생:', error);
      // 서버에서 온 에러 메시지 그대로 표시
      setMessage(error instanceof Error ? error.message : '쿠폰 목록 조회 중 오류가 발생했습니다.');
      setMessageType('error');
      setUserCoupons([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserCoupons();
  };

  return (
    <div className="user-coupons-container">
      <h2>내 쿠폰 목록</h2>
      <form onSubmit={handleSubmit} className="user-coupons-form">
        <div className="form-group">
          <label htmlFor="userId">사용자 ID:</label>
          <div className="search-input-container">
            <input
              type="number"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="사용자 ID를 입력하세요"
              disabled={isLoading}
              required
            />
            <button type="submit" disabled={isLoading} className="search-button">
              {isLoading ? '조회 중...' : '조회하기'}
            </button>
          </div>
        </div>
      </form>
      
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      
      {searched && userCoupons.length > 0 && (
        <div className="coupon-list-container">
          <h3>발급 받은 쿠폰 목록</h3>
          <ul className="user-coupon-list">
            {userCoupons.map(coupon => (
              <li key={coupon.couponId} className="user-coupon-item">
                <div className="coupon-details">
                  <span className="coupon-id">쿠폰 ID: {coupon.couponId}</span>
                  <span className="coupon-name">쿠폰 이름: {coupon.couponName}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserCoupons; 