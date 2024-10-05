import axios from "axios";
import config from "../config";

/**
 * Get channels
 */
export const getChannels = async () => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/channels`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const getPosts = async (query) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/posts/?${query}`
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const getPostsByUserId = async (start,limit,user_id) => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/posts/?_sort=createdAt:desc&_start=${start}&_limit=${limit}&user=${user_id}`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const createPost = async (token,payload) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/posts`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: payload
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const getPostById = async (id) => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/posts/${id}`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const editPost = async (token,payload,id) => {
  let query = {
    method: "put",
    url: `${config.SERVER_URL}/posts/${id}`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    data: payload
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const castVote = async (token,id,weight) => {
  let query = {
    method: "post",
    url: `${config.SERVER_URL}/posts/${id}/vote`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    data: {
      weight: weight
    }
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const deletePost = async (token,id) => {
  let query = {
    method: "delete",
    url: `${config.SERVER_URL}/posts/${id}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};