import axios, {AxiosRequestConfig} from "axios";

const httpClient = axios.create(
  {
    baseURL: process.env.REACT_APP_API_URL,
  }
);


const request = async function (options: AxiosRequestConfig) {
  if (options === undefined) {
    console.error("[request] Options are undefined");
    return;
  }

  // success handler
  const onSuccess = function (response) {
    return response;
  };

  // error handler
  const onError = function (error) {
    console.error('[request] Error:', error);
    return Promise.reject(error.response);
  };

  // adding success and error handlers to client
  return httpClient(options).then(onSuccess).catch(onError);
};

export default request;
