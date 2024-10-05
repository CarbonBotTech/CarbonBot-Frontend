import axios from "axios";
import config from "../config";

export const createBot = async (token,payload) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/bots`,
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

export const updateBot = async (token,payload,id) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/bots/${id}`,
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

/**
 * Get all entries
 */
export const getMyBots = async (token,start,limit) => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/bots/my/?_start=${start}&_limit=${limit}`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const getBots = async (query) => {
  try {
    let response = await axios({
      method: "get",
    url: `${config.SERVER_URL}/bots/?${query}`
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const findBotById = async (id) => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/bots/${id}`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const deleteBot = async (token,id) => {
  let query = {
    method: "delete",
    url: `${config.SERVER_URL}/bots/${id}`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};