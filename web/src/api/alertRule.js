import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/alert-rules',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/alert-rules",
    params: search
  })
}

const get = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/alert-rules/${entityId}`
  })
}

const update = async (entityId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-rules/${entityId}`,
    data: data
  })
}

const remove = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/alert-rules/${entityId}`
  })
}

export const alertRule = {
  create,
  find,
  get,
  update,
  remove
}
