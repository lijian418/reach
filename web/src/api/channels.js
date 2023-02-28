import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/channels',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/channels",
    params: search
  })
}

export const channels = {
  create,
  find
}
