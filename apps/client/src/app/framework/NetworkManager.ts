import axios from 'axios';
import { Auth } from 'aws-amplify';

export interface ApiErrorResponse {
  status: number;
  error_custom_code: number;
  message: string;
}

export interface ApiSuccessResponse {
  status: 'OK';
}

export default class NetworkManager {
  static isInitiate = false;

  static init() {
    if (NetworkManager.isInitiate) return;
    NetworkManager.isInitiate = true;
    const baseUrl = createBaseUrl(process.env.NX_APP_API_BASE_URL as string);
    axios.defaults.baseURL = baseUrl;
    console.log(`####### base url: ${baseUrl}   #############`);
  }
}

const createBaseUrl = (url: string) => {
  return /(http(s?)):\/\//i.test(url) ? `${url}/api/v1` : `https://${url}/api/v1`;
};

export const axiosRequestInterceptor = async (config: any) => {
  try {
    const session = await Auth.currentSession();
    const accessToken = session.getAccessToken().getJwtToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  } catch (e) {
    console.log('idle mode check- got an error when trying to find currentSession: ', e);
    Auth.signOut();
  }
};

axios.interceptors.request.use(axiosRequestInterceptor, (e) => Promise.reject(e));
