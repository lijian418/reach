import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/destinations',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/destinations",
    params: search
  })
}

const get = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/destinations/${entityId}`
  })
}

const update = async (entityId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/destinations/${entityId}`,
    data: data
  })
}

const remove = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/destinations/${entityId}`
  })
}

export const destination = {
  create,
  find,
  get,
  update,
  remove,
}
