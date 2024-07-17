import axios, { AxiosResponse,AxiosError } from "axios";

export default class HttpClient {
   /**
   * @param {string} endpoint The string
   */
  get(endpoint: string,config:Object): Promise<any> {
    return new Promise(
      function (resolve, reject) {
        axios
          .get(endpoint, config)
          .then((result: AxiosResponse)=>{
            resolve(result.data);
          })
          .catch((error : AxiosError)=>{
            reject(error);
          });
      }
    );
  }
}