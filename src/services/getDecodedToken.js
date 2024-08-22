import { jwtDecode } from "jwt-decode";

const getDecodedToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null; // or handle the absence of a token as required
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export default getDecodedToken;
