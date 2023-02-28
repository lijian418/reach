import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/tags',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/tags",
    params: search
  })
}

const get = async (tagId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/tags/${tagId}`
  })
}

const update = async (tagId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/tags/${tagId}`,
    data: data
  })
}

export const tag = {
  create,
  find,
  get,
  update
}
