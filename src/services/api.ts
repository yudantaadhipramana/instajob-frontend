/**
 * API Client Service
 * Handles all HTTP requests to backend API with JWT token management
 * Automatic token refresh on 401 responses
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// Token storage keys
const ACCESS_TOKEN_KEY = 'instajob_access_token';
const REFRESH_TOKEN_KEY = 'instajob_refresh_token';
const EXPIRY_KEY = 'instajob_token_expiry';

/**
 * Get access token from localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get refresh token from localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Store tokens in localStorage
 */
export function setTokens(accessToken: string, refreshToken: string, expiresIn: string): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  
  // Calculate expiry time (subtract 5 minutes as buffer)
  const expiryMs = expiresIn === '24h' ? 24 * 60 * 60 * 1000 - (5 * 60 * 1000) : 7 * 24 * 60 * 60 * 1000 - (5 * 60 * 1000);
  const expiryTime = new Date().getTime() + expiryMs;
  localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
}

/**
 * Clear tokens from localStorage
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

/**
 * Check if token is expired
 */
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') return true;
  
  const expiryTime = localStorage.getItem(EXPIRY_KEY);
  if (!expiryTime) return true;
  
  return new Date().getTime() > parseInt(expiryTime);
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(): Promise<boolean> {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return false;
    }

    const data = await response.json();
    if (data.data?.tokens) {
      setTokens(
        data.data.tokens.accessToken,
        data.data.tokens.refreshToken,
        data.data.tokens.expiresIn
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return false;
  }
}

/**
 * Generic fetch wrapper with JWT authentication & auto-refresh
 */
export async function apiFetch(
  endpoint: string,
  options: RequestInit & { skipAuth?: boolean } = {}
): Promise<Response> {
  const url = `${API_URL}${endpoint}`;
  const { skipAuth = false, ...fetchOptions } = options;

  // Add JWT token to Authorization header (if not skipped)
  if (!skipAuth) {
    const accessToken = getAccessToken();
    if (accessToken) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  // Add default headers
  fetchOptions.headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  let response = await fetch(url, fetchOptions);

  // Handle 401 Unauthorized (token expired)
  if (response.status === 401 && !skipAuth) {
    console.warn('Access token expired, attempting refresh...');
    
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry request with new token
      const newAccessToken = getAccessToken();
      if (newAccessToken) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        response = await fetch(url, fetchOptions);
      }
    } else {
      // Token refresh failed, clear tokens
      clearTokens();
    }
  }

  return response;
}

/**
 * Handle API error response
 */
function handleError(error: any): Error {
  if (error instanceof SyntaxError) {
    return new Error('Invalid response format from server');
  }
  return error instanceof Error ? error : new Error('An error occurred');
}

/**
 * Parse API response
 */
async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API Error: ${response.status} ${response.statusText}`);
  }

  return await response.json().catch(() => ({}));
}

// ============ AUTH ENDPOINTS ============

/**
 * Register new user
 */
export async function apiRegister(
  email: string,
  password: string,
  fullName: string
): Promise<{ user: any; tokens: any }> {
  try {
    const response = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
      skipAuth: true,
    });

    const data = await parseResponse<any>(response);
    
    if (data.data?.tokens) {
      setTokens(
        data.data.tokens.accessToken,
        data.data.tokens.refreshToken,
        data.data.tokens.expiresIn
      );
    }

    return data.data || {};
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Login user
 */
export async function apiLogin(
  email: string,
  password: string
): Promise<{ user: any; tokens: any }> {
  try {
    const response = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });

    const data = await parseResponse<any>(response);
    
    if (data.data?.tokens) {
      setTokens(
        data.data.tokens.accessToken,
        data.data.tokens.refreshToken,
        data.data.tokens.expiresIn
      );
    }

    return data.data || {};
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Get user profile
 */
export async function apiGetProfile(): Promise<any> {
  try {
    const response = await apiFetch('/api/auth/profile', {
      method: 'GET',
    });

    const data = await parseResponse<any>(response);
    return data.data?.user || null;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Update user profile
 */
export async function apiUpdateProfile(profileData: {
  fullName?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  education?: string;
}): Promise<any> {
  try {
    const response = await apiFetch('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    const data = await parseResponse<any>(response);
    return data.data?.user || null;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Change password
 */
export async function apiChangePassword(
  oldPassword: string,
  newPassword: string
): Promise<void> {
  try {
    const response = await apiFetch('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    await parseResponse<any>(response);
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Logout (clear tokens)
 */
export function apiLogout(): void {
  clearTokens();
}
