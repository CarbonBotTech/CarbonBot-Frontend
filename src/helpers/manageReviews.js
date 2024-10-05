import axios from "axios";
import config from "../config";

export const postReview = async (token,payload) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/reviews`,
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

export const findReviews = async (query) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/reviews/?${query}`,
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const upvoteReview = async (token,id) => {
  let query = {
    method: "post",
    url: `${config.SERVER_URL}/reviews/${id}/upvote`,
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

export const getReviewById = async (id) => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/reviews/${id}`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const updateReview = async (token,id,payload) => {
  let query = {
    method: "put",
    url: `${config.SERVER_URL}/reviews/${id}`,
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