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

export const subscription = {
  create,
  remove,
}
