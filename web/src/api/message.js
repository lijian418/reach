import request from "./httpClient";
import {AxiosResponse} from "axios";

const send = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/messages',
    data: data
  })
}


const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/messages",
    params: search
  })
}

export const message = {
  send,
  find
}
