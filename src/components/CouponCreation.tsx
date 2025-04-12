import React, { useState } from 'react';
import './CouponCreation.css';
import { createCoupon } from '../api/couponApi';

const CouponCreation: React.FC = () => {
  const [creatorId, setCreatorId] = useState<string>('');
  const [couponName, setCouponName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [createdCouponId, setCreatedCouponId] = useState<number | null>(null);

  const handleCreatorIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatorId(e.target.value);
  };

  const handleCouponNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponName(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!creatorId || !couponName || !quantity) {
      setMessage('모든 필드를 입력해주세요.');
      setMessageType('error');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      setMessageType('');
      setCreatedCouponId(null);

      // API 호출
      const response = await createCoupon({
        creatorId: Number(creatorId),
        couponName,
        quantity: Number(quantity)
      });

      setMessage('쿠폰이 성공적으로 생성되었습니다.');
      setMessageType('success');
      setCreatedCouponId(response.couponId);
      
      // 폼 초기화
      setCouponName('');
      setQuantity('');
    } catch (error) {
      console.error('쿠폰 생성 중 오류 발생:', error);
      // 서버에서 온 에러 메시지 그대로 표시
      setMessage(error instanceof Error ? error.message : '쿠폰 생성 중 오류가 발생했습니다.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="coupon-creation-container">
      <h2>쿠폰 생성</h2>
      <form onSubmit={handleSubmit} className="coupon-form">
        <div className="form-group">
          <label htmlFor="creatorId">생성자 ID:</label>
          <input
            type="number"
            id="creatorId"
            value={creatorId}
            onChange={handleCreatorIdChange}
            placeholder="생성자 ID를 입력하세요"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="couponName">쿠폰 이름:</label>
          <input
            type="text"
            id="couponName"
            value={couponName}
            onChange={handleCouponNameChange}
            placeholder="쿠폰 이름을 입력하세요"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">수량:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="생성할 쿠폰 수량을 입력하세요"
            min="1"
            disabled={isLoading}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? '처리 중...' : '쿠폰 생성하기'}
        </button>
      </form>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      {createdCouponId && (
        <div className="created-coupon">
          <h3>생성된 쿠폰 정보</h3>
          <p><strong>쿠폰 ID:</strong> {createdCouponId}</p>
        </div>
      )}
    </div>
  );
};

export default CouponCreation; 