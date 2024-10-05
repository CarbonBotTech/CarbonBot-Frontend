import axios from "axios";
import config from "../config";

/**
 * Get current user
 */
export const getCurrentUser = async (token) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/users/me`,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

/**
 * Login
 */
export const loginUser = async (identifier,password) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/auth/local`,
      data: {
        identifier: identifier,
        password: password
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

/**
 * Signup
 */
export const signUp = async (username,email,password) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/auth/local/register`,
      data: {
        username: username,
        email: email,
        password: password
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

/**
 * Forgot password
 */
export const forgotPassword = async (email) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/auth/forgot-password`,
      data: {
        email: email
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

/**
 * Reset password
 */
export const resetPassword = async (code,password) => {
  try {
    let response = await axios({
      method: "post",
      url: `${config.SERVER_URL}/auth/reset-password`,
      data: {
        code: code,
        password: password,
        passwordConfirmation: password,
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const changePassword = async (id,token,password) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/users/${id}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: {
        password: password
      }
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const updateProfile = async (id,token,data) => {
  try {
    let response = await axios({
      method: "put",
      url: `${config.SERVER_URL}/profiles/${id}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: data
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};

export const getProfileByUsername = async (username) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/profiles/${username}`
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};