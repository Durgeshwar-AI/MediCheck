// auth.js
// Utility for handling authentication tokens

export const storeToken = (token,userName) => {
  if (!token) return;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  
  const data = {
    userName: userName,
    value: token,
    expiry: expirationDate.getTime(),
  };

  console.log(data)

  localStorage.setItem('authToken', JSON.stringify(data));
};

export const getToken = () => {
  const tokenData = localStorage.getItem('authToken');
  
  if (!tokenData) return null;
  
  try {
    const { value, expiry } = JSON.parse(tokenData);
    const now = new Date().getTime();
    if (now > expiry) {
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
export const removeToken = () => {
  localStorage.removeItem('authToken');
};
export const isLoggedIn = () => {
  return getToken() !== null;
};
export const getAuthHeader = () => {
  const token = getToken();
  
  return {
    headers: {
      ...token ? { Authorization: `Bearer ${token}` } : {}
    }
  };
};
export const initializeTokenCheck = () => {
  getToken();
  setInterval(() => {
    getToken();
  }, 60 * 60 * 1000);
};