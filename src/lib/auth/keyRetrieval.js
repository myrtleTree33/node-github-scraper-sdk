import Axios from 'axios';

export async function auth() {
  try {
    const url = 'http://localhost:8080/token/available/github';
    const response = await Axios.get(url);
    const { id, secret } = response.data.token;
    const token = { id, secret };
    return Promise.resolve(token);
  } catch (err) {
    // fail silently
    console.error('Unable to retrieve auth credentials!');
    return Promise.resolve({ id: null, secret: null });
  }
}

export function genCredentials(auth) {
  const { id, secret } = auth;
  return `&client_id=${id}&client_secret=${secret}`;
}
