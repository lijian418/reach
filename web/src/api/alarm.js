import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/alarms',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/alarms",
    params: search
  })
}

const get = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/alarms/${entityId}`
  })
}

const update = async (entityId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alarms/${entityId}`,
    data: data
  })
}

const remove = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/alarms/${entityId}`
  })
}

export const alarm = {
  create,
  find,
  get,
  update,
  remove
}
