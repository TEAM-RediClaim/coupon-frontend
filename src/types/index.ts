// API 요청 타입
// 쿠폰 발급 요청
export interface IssueCouponRequest {
  userId: number;
}

// 쿠폰 생성 요청
export interface CreateCouponRequest {
  creatorId: number;
  couponName: string;
  quantity: number;
}

// 사용자 등록 요청
export interface RegisterUserRequest {
  name: string;
}

// 쿠폰 생성자 등록 요청
export interface RegisterCreatorRequest {
  name: string;
}

// API 응답 타입
// 기본 응답 타입
export interface BaseResponse<T> {
  code: number;
  status: string;
  message: string;
  result: T;
}

// 쿠폰 생성 응답
export interface CreateCouponResponse {
  couponId: number;
}

// 유효한 쿠폰 정보
export interface ValidCoupon {
  couponId: number;
  remainingCount: number;
}

// 유효한 쿠폰 목록 응답
export interface ValidCouponsResponse {
  validCoupons: ValidCoupon[];
}

// 발급된 쿠폰 정보
export interface IssuedCoupon {
  couponId: number;
  couponName: string;
}

// 발급된 쿠폰 목록 응답
export interface IssuedCouponsResponse {
  issuedCoupons: IssuedCoupon[];
}

// 사용자 등록 응답
export interface RegisterUserResponse {
  userId: number;
}

// 쿠폰 생성자 등록 응답
export interface RegisterCreatorResponse {
  creatorId: number;
} 