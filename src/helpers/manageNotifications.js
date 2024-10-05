import axios from "axios";
import config from "../config";

/**
 * Get current user's notifications
 */
export const getNotifications = async (token,query) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/notifications/?${query}`,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const markAsRead = async (token,id) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/notifications/${id}`,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const markAllAsRead = async (token) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/notifications/`,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const getUnreadCount = async (token) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/notifications/count`,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};