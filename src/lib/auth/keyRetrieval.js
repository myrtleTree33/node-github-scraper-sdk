import Axios from 'axios';

export async function genToken() {
  try {
    const url = process.env.BACKEND_TOKEN_URL;
    const response = await Axios.get(url);
    const { authToken } = response.data.token;
    return Promise.resolve(authToken);
  } catch (err) {
    // fail silently
    console.error('Unable to retrieve auth credentials!');
    return Promise.resolve(null);
  }
}

export function genTokenHeader(token) {
  return {
    headers: {
      Authorization: `token ${token}`
    }
  };
}
