import BaseApi from '../../framework/base.api';

export class ExampleApi extends BaseApi {
  getRoute(): string {
    return 'examples';
  }
}
