import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (user): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/users',
    data: user
  })
}

const getByUsername = async (username): Promise<AxiosResponse> => {
  return await request({
    method: 'GET',
    url: `/users/username/${username}`,
  })
}

export const user = {
  create,
  getByUsername
}
