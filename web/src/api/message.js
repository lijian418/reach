import request from "./httpClient";
import {AxiosResponse} from "axios";

const send = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/messages',
    data: data
  })
}

export const message = {
  send,
}
