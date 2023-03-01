import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/alert-routes',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/alert-routes",
    params: search
  })
}

const get = async (entityId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/alert-routes/${entityId}`
  })
}

const update = async (entityId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-routes/${entityId}`,
    data: data
  })
}

const assignToTag = async (entityId, tagId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/${entityId}/assign/tag/${tagId}`
  })
}

const assignToChannel = async (entityId, channelId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/${entityId}/assign/channel/${channelId}`
  })
}

const assignToUser = async (entityId, userId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/${entityId}/assign/user/${userId}`
  })
}

const unassignToTag = async (entityId, tagId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/${entityId}/unassign/tag/${tagId}`
  })
}

const unassignToChannel = async (entityId, channelId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/${entityId}/unassign/channel/${channelId}`
  })
}

const unassignToUser = async (entityId, userId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/${entityId}/unassign/user/${userId}`
  })
}

export const alertRoute = {
  create,
  find,
  get,
  update,
  assignToTag,
  assignToUser,
  assignToChannel,
  unassignToUser,
  unassignToChannel,
  unassignToTag
}
