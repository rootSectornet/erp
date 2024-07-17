

import { Article } from '../../models/article';
import HttpClient from '../httpClient';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class FreeApi extends HttpClient{

    constructor() {
        super();
    }

    fetchAll(): Promise<any> {
        return new Promise((resolve, reject) => {
          this.get('https://freetestapi.com/api/v1/posts',{})
            .then((result: Article[]) => {
              resolve(result);
            })
            .catch((err: any) => {
              reject(err);
            });
        });
      }
}
