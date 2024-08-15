export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.userType === 'admin';
};

export const isClient = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.userType === 'client';
};
