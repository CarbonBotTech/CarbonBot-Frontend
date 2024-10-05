import axios from "axios";
import config from "../config";

/**
 * Get platforms & categories together
 */
export const getAssets = async () => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/assets`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};
