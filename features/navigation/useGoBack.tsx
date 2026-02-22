import { useCallback } from 'react';
import { router } from 'expo-router';

export function useGoBack() {
  return useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }, []);
}
