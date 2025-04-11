// auth.js
// Utility for handling authentication tokens

/**
 * Store the authentication token in localStorage with expiration
 * @param {string} token - JWT token from the server
 */
export const storeToken = (token) => {
  if (!token) return;
  
  // Calculate expiration (7 days from now)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  
  const tokenData = {
    value: token,
    expiry: expirationDate.getTime(),
  };
  
  // Store token with expiration
  localStorage.setItem('authToken', JSON.stringify(tokenData));
};

/**
 * Retrieve the token if it exists and is not expired
 * @returns {string|null} The token or null if expired/not found
 */
export const getToken = () => {
  const tokenData = localStorage.getItem('authToken');
  
  if (!tokenData) return null;
  
  try {
    const { value, expiry } = JSON.parse(tokenData);
    const now = new Date().getTime();
    
    // Check if token has expired
    if (now > expiry) {
      // Token expired, remove it
      localStorage.removeItem('authToken');
      return null;
    }
    
    return value;
  } catch (error) {
    console.error('Error parsing token:', error);
    localStorage.removeItem('authToken');
    return null;
  }
};

/**
 * Remove the token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Check if user is logged in (has a valid token)
 * @returns {boolean} 
 */
export const isLoggedIn = () => {
  return getToken() !== null;
};

/**
 * Get authentication headers for API requests
 * @returns {Object} Headers object with Authorization token if available
 */
export const getAuthHeader = () => {
  const token = getToken();
  
  return {
    headers: {
      ...token ? { Authorization: `Bearer ${token}` } : {}
    }
  };
};

/**
 * Initialize token cleanup on application load
 * Should be called when the app initializes
 */
export const initializeTokenCheck = () => {
  // Check token validity immediately
  getToken();
  
  // Set up a periodic check every hour
  setInterval(() => {
    getToken();
  }, 60 * 60 * 1000); // Check every hour
};