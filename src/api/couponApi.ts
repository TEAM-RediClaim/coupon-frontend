import axios from 'axios';
import { 
  IssueCouponRequest, 
  CreateCouponRequest, 
  RegisterUserRequest, 
  RegisterCreatorRequest,
  BaseResponse,
  ValidCouponsResponse,
  IssuedCouponsResponse,
  CreateCouponResponse,
  RegisterUserResponse,
  RegisterCreatorResponse
} from '../types';

// 에러 처리 헬퍼 함수
const handleApiError = (error: any): never => {
  // axios 에러인 경우 서버에서 보낸 에러 메시지 추출
  if (axios.isAxiosError(error) && error.response?.data) {
    const serverError = error.response.data as BaseResponse<any>;
    // 서버 에러 메시지가 있으면 그대로 전달
    throw new Error(serverError.message || '서버 오류가 발생했습니다.');
  }
  // 그 외의 에러는 그대로 전달
  throw error;
};

// 쿠폰 발급 API
export const issueCoupon = async (couponId: number, request: IssueCouponRequest): Promise<void> => {
  try {
    const response = await axios.post<BaseResponse<void>>(`/api/coupons/${couponId}`, request);
    return response.data.result;
  } catch (error) {
    return handleApiError(error);
  }
};

// 유효한 쿠폰 목록 조회 API
export const getValidCoupons = async (): Promise<ValidCouponsResponse> => {
  try {
    const response = await axios.get<BaseResponse<ValidCouponsResponse>>('/api/coupons');
    return response.data.result;
  } catch (error) {
    return handleApiError(error);
  }
};

// 쿠폰 생성 API
export const createCoupon = async (request: CreateCouponRequest): Promise<CreateCouponResponse> => {
  try {
    const response = await axios.post<BaseResponse<CreateCouponResponse>>('/api/coupons', request);
    return response.data.result;
  } catch (error) {
    return handleApiError(error);
  }
};

// 사용자의 발급된 쿠폰 목록 조회 API
export const getUserCoupons = async (userId: number): Promise<IssuedCouponsResponse> => {
  try {
    const response = await axios.get<BaseResponse<IssuedCouponsResponse>>(`/api/users/${userId}/coupons`);
    return response.data.result;
  } catch (error) {
    return handleApiError(error);
  }
};

// 사용자 등록 API
export const registerUser = async (request: RegisterUserRequest): Promise<RegisterUserResponse> => {
  try {
    const response = await axios.post<BaseResponse<RegisterUserResponse>>('/api/users', request);
    return response.data.result;
  } catch (error) {
    return handleApiError(error);
  }
};

// 쿠폰 생성자 등록 API
export const registerCreator = async (request: RegisterCreatorRequest): Promise<RegisterCreatorResponse> => {
  try {
    const response = await axios.post<BaseResponse<RegisterCreatorResponse>>('/api/creators', request);
    return response.data.result;
  } catch (error) {
    return handleApiError(error);
  }
}; 