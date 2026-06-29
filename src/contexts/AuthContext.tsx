'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  apiLogin,
  apiRegister,
  apiLogout,
  apiGetProfile,
  getAccessToken,
  isTokenExpired,
  clearTokens,
} from '@/services/api';

/**
 * Auth Context Type Definition
 */
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  subscriptionType: string;
  profile?: {
    bio?: string;
    location?: string;
    skills?: string;
    experience?: string;
    education?: string;
  };
  createdAt?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

/**
 * Create Auth Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!user && !!getAccessToken();

  /**
   * Fetch user profile from API
   */
  const fetchProfile = useCallback(async () => {
    try {
      const profile = await apiGetProfile();
      if (profile) {
        setUser(profile);
      } else {
        setUser(null);
        clearTokens();
      }
    } catch (err: any) {
      console.error('Failed to fetch profile:', err);
      setUser(null);
      clearTokens();
    }
  }, []);

  /**
   * Initialize auth on component mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          // Token exists, fetch user profile
          await fetchProfile();
        } else {
          // No token, user not authenticated
          setUser(null);
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        setUser(null);
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [fetchProfile]);

  /**
   * Login handler
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user: userData } = await apiLogin(email, password);
      setUser(userData);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  /**
   * Register handler
   */
  const register = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user: userData } = await apiRegister(email, password, fullName);
      setUser(userData);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  /**
   * Logout handler
   */
  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    setError(null);
    router.push('/login');
  }, [router]);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Auth context value
   */
  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    fetchProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth hook — consume auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
