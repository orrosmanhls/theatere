import axios from 'axios';
import NetworkManager from './NetworkManager';

/**
 * This layer is responsible to interact with remote api
 */
export default abstract class BaseApi {
  protected route: string;

  abstract getRoute(): string;

  constructor() {
    NetworkManager.init();
    this.route = this.getRoute();
  }

  readById(id: string) {
    return axios.get(`/${this.route}/${id}`);
  }

  read() {
    return axios.get(`/${this.route}`);
  }

  create(data: unknown) {
    return axios.post(`/${this.route}`, data);
  }

  update(id: string, data: unknown) {
    return axios.put(`/${this.route}/${id}`, data);
  }

  delete(id: string) {
    return axios.delete(`/${this.route}/${id}`);
  }
}
