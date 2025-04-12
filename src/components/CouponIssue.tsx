import React, { useState, useEffect } from 'react';
import './CouponIssue.css';
import { issueCoupon, getValidCoupons } from '../api/couponApi';
import { ValidCoupon } from '../types';

const CouponIssue: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [couponId, setCouponId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [availableCoupons, setAvailableCoupons] = useState<ValidCoupon[]>([]);

  // 사용 가능한 쿠폰 목록 조회
  useEffect(() => {
    fetchAvailableCoupons();
  }, []);

  const fetchAvailableCoupons = async () => {
    try {
      const response = await getValidCoupons();
      setAvailableCoupons(response.validCoupons);
    } catch (error) {
      console.error('쿠폰 목록 조회 중 오류 발생:', error);
      // 에러 메시지 표시하지 않음
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleCouponIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponId(e.target.value);
  };

  const handleCouponSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCouponId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !couponId) {
      setMessage('사용자 ID와 쿠폰 ID를 모두 입력해주세요.');
      setMessageType('error');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      setMessageType('');

      // API 호출
      await issueCoupon(Number(couponId), {
        userId: Number(userId)
      });

      setMessage('쿠폰이 성공적으로 발급되었습니다.');
      setMessageType('success');
      
      // 폼 초기화
      setUserId('');
      setCouponId('');
      
      // 쿠폰 목록 새로고침
      fetchAvailableCoupons();
    } catch (error) {
      console.error('쿠폰 발급 중 오류 발생:', error);
      // 서버에서 온 에러 메시지 그대로 표시
      setMessage(error instanceof Error ? error.message : '쿠폰 발급 중 오류가 발생했습니다.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="coupon-issue-container">
      <h2>쿠폰 발급</h2>
      <form onSubmit={handleSubmit} className="coupon-form">
        <div className="form-group">
          <label htmlFor="userId">사용자 ID:</label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
            placeholder="사용자 ID를 입력하세요"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="couponSelect">쿠폰 선택:</label>
          <select
            id="couponSelect"
            value={couponId}
            onChange={handleCouponSelect}
            disabled={isLoading}
            required
          >
            <option value="">쿠폰을 선택하세요</option>
            {availableCoupons.map(coupon => (
              <option key={coupon.couponId} value={coupon.couponId}>
                쿠폰 ID: {coupon.couponId} (남은 수량: {coupon.remainingCount})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="couponId">쿠폰 ID 직접 입력:</label>
          <input
            type="number"
            id="couponId"
            value={couponId}
            onChange={handleCouponIdChange}
            placeholder="쿠폰 ID를 입력하세요"
            disabled={isLoading}
          />
          <small className="form-hint">쿠폰 선택 또는 ID 직접 입력 중 하나만 사용하세요.</small>
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? '처리 중...' : '쿠폰 발급하기'}
        </button>
      </form>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      
      <div className="available-coupons">
        <h3>사용 가능한 쿠폰 목록</h3>
        {availableCoupons.length > 0 ? (
          <ul className="coupon-list">
            {availableCoupons.map(coupon => (
              <li key={coupon.couponId} className="coupon-item">
                <span className="coupon-id">쿠폰 ID: {coupon.couponId}</span>
                <span className="coupon-count">남은 수량: {coupon.remainingCount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-coupons">사용 가능한 쿠폰이 없습니다.</p>
        )}
        <button 
          onClick={fetchAvailableCoupons} 
          className="refresh-button"
          disabled={isLoading}
        >
          새로고침
        </button>
      </div>
    </div>
  );
};

export default CouponIssue; 