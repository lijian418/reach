import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/alert-endpoints',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/alert-endpoints",
    params: search
  })
}

const get = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/alert-endpoints/${entityId}`
  })
}

const update = async (entityId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-endpoints/${entityId}`,
    data: data
  })
}

const remove = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/alert-endpoints/${entityId}`
  })
}

export const alertEndpoint = {
  create,
  find,
  get,
  update,
  remove
}
