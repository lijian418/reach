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

const get = async (channelId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/channels/${channelId}`
  })
}

const update = async (channelId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/channels/${channelId}`,
    data: data
  })
}

export const channel = {
  create,
  find,
  get,
  update
}
