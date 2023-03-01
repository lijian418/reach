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
    url: `/alert-routes/${entityId}/assign/tag/${tagId}`
  })
}

const assignToChannel = async (entityId, channelId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-routes/${entityId}/assign/channel/${channelId}`
  })
}

const assignToUser = async (entityId, userId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-routes/${entityId}/assign/user/${userId}`
  })
}

const unassignFromTag = async (entityId, tagId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-routes/${entityId}/unassign/tag/${tagId}`
  })
}

const unassignFromChannel = async (entityId, channelId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-routes/${entityId}/unassign/channel/${channelId}`
  })
}

const unassignFromUser = async (entityId, userId): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/alert-routes/${entityId}/unassign/user/${userId}`
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
  unassignFromUser,
  unassignFromChannel,
  unassignFromTag
}
