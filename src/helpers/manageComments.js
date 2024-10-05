import axios from "axios";
import config from "../config";

/**
 * Get comments by Post ID
 */
export const getComments = async (post_id) => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/comments/${post_id}/?_sort=createdAt:desc`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const postComment = async (token,payload) => {
  let query = {
    method: "post",
    url: `${config.SERVER_URL}/comments`,
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

export const postReply = async (token,payload) => {
  let query = {
    method: "post",
    url: `${config.SERVER_URL}/replies`,
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

export const editReply = async (token,id,payload) => {
  let query = {
    method: "put",
    url: `${config.SERVER_URL}/replies/${id}`,
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

export const editComment = async (token,id,payload) => {
  let query = {
    method: "put",
    url: `${config.SERVER_URL}/comments/${id}`,
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