import React, { useState } from 'react';
import './App.css';
import CouponIssue from './components/CouponIssue';
import CouponCreation from './components/CouponCreation';
import UserRegistration from './components/UserRegistration';
import UserCoupons from './components/UserCoupons';

function App() {
  const [activeTab, setActiveTab] = useState<'issue' | 'create' | 'register' | 'mycoupons'>('issue');

  const handleTabChange = (tab: 'issue' | 'create' | 'register' | 'mycoupons') => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>쿠폰 발급 시스템</h1>
      </header>
      <div className="tab-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'issue' ? 'active' : ''}`}
            onClick={() => handleTabChange('issue')}
          >
            쿠폰 발급
          </button>
          <button 
            className={`tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => handleTabChange('create')}
          >
            쿠폰 생성
          </button>
          <button 
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            사용자 등록
          </button>
          <button 
            className={`tab ${activeTab === 'mycoupons' ? 'active' : ''}`}
            onClick={() => handleTabChange('mycoupons')}
          >
            내 쿠폰 조회
          </button>
        </div>
      </div>
      <main>
        {activeTab === 'issue' && <CouponIssue />}
        {activeTab === 'create' && <CouponCreation />}
        {activeTab === 'register' && <UserRegistration />}
        {activeTab === 'mycoupons' && <UserCoupons />}
      </main>
    </div>
  );
}

export default App; 