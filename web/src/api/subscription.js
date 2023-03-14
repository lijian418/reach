import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/subscriptions',
    data: data
  })
}


const remove = async (id): Promise<AxiosResponse> => {
  return await request({
    method: 'DELETE',
    url: `/subscriptions/${id}`
  })
}

const get = async (id): Promise<AxiosResponse> => {
  return await request({
    method: 'GET',
    url: `/subscriptions/${id}`
  })
}

const find = async (params): Promise<AxiosResponse> => {
  return await request({
    method: 'GET',
    url: '/subscriptions',
    params: params
  })
}

export const subscription = {
  create,
  remove,
  get,
  find
}
