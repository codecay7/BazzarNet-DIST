import { useCallback } from 'react';

const useUtils = () => {
  // Simulate Loading - REMOVED
  // const simulateLoading = useCallback((delay = 1000) => {
  //   return new Promise(resolve => setTimeout(resolve, delay));
  // }, []);

  // Generate a 6-digit OTP
  const generateOtp = useCallback(() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }, []);

  return { /* simulateLoading, */ generateOtp };
};

export default useUtils;