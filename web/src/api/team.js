import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/teams',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/teams",
    params: search
  })
}

const get = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/teams/${entityId}`
  })
}

const update = async (entityId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/teams/${entityId}`,
    data: data
  })
}

const remove = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/teams/${entityId}`
  })
}

const addUsers = async (entityId, data): Promise<AxiosResponse> => {
  return await request({
    method: "POST",
    url: `/teams/${entityId}/users`,
    data: data
  })
}

const removeUser = async (entityId, userId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/teams/${entityId}/users/${userId}`
  })
}

export const team = {
  create,
  find,
  get,
  update,
  remove,
  addUsers,
  removeUser,
}
