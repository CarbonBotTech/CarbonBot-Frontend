import axios from "axios";
import config from "../config";

export const createCollection= async (token,payload) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/collections`,
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

export const updateCollection = async (token,payload,id) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/collections/${id}`,
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

export const getCollection = async (query) => {
  try {
    let response = await axios({
      method: "get",
    url: `${config.SERVER_URL}/collections/?${query}`
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const addOrRemoveBot = async (token,bot_id,collection_id) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/collections/${collection_id}/${bot_id}`,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const getBotsFromCollection = async (query,collection_id) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/collections/${collection_id}/?${query}`
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const voteCollection = async (token,id) => {
  let query = {
    method: "post",
    url: `${config.SERVER_URL}/collections/${id}/vote`,
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

export const deleteCollection = async (token,id) => {
  let query = {
    method: "delete",
    url: `${config.SERVER_URL}/collections/${id}`,
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