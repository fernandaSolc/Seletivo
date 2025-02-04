export const verifyToken = (token: string) => {
  if (token.length === 6) {
    // Mock API call to verify token
    return true;
  } else {
    return false;
  }
};
