import axios from "axios";
import config from "../config";

/**
 * Create company
 */
export const createCompany = async (token,payload) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/companies`,
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

export const updateCompany = async (token,payload,id) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/companies/${id}`,
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

export const getCompany = async (query) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/companies/?${query}`
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};
