const getToken = () => localStorage.getItem('token');
const removeToken = () => localStorage.removeItem('token');
const setToken = token => localStorage.setItem('token', token);
const isUserLoggedIn = () => !!getToken();

export default {
  getToken,
  setToken,
  removeToken,
  isUserLoggedIn,
};
