import request from "./httpClient";
import {AxiosResponse} from "axios";

const create = async (data): Promise<AxiosResponse> => {
  return await request({
    method: 'POST',
    url: '/channels',
    data: data
  })
}

const find = async (search): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: "/channels",
    params: search
  })
}

const get = async (channelId): Promise<AxiosResponse> => {
  return await request({
    method: "GET",
    url: `/channels/${channelId}`
  })
}

const update = async (channelId, data): Promise<AxiosResponse> => {
  return await request({
    method: "PUT",
    url: `/channels/${channelId}`,
    data: data
  })
}

const remove = async (channelId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/channels/${channelId}`
  })
}

const addUsers = async (channelId, data): Promise<AxiosResponse> => {
  return await request({
    method: "POST",
    url: `/channels/${channelId}/users`,
    data: data
  })
}

const removeUser = async (channelId, userId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/channels/${channelId}/users/${userId}`
  })
}

const addTeams = async (channelId, data): Promise<AxiosResponse> => {
  return await request({
    method: "POST",
    url: `/channels/${channelId}/teams`,
    data: data
  })
}

const removeTeam = async (channelId, teamId): Promise<AxiosResponse> => {
  return await request({
    method: "DELETE",
    url: `/channels/${channelId}/teams/${teamId}`
  })
}

export const channel = {
  create,
  find,
  get,
  update,
  remove,
  addUsers,
  removeUser,
  addTeams,
  removeTeam
}
