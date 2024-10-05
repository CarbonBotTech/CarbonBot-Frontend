import axios from "axios";
import config from "../config";

/**
 * Classification stats
 */
export const search = async (query) => {
  try {
    let response = await axios({
      method: "get",
      url: `${config.SERVER_URL}/bots/search/${query}`,
    });
    return [null, response];
  } catch (error) {
    return [error];
  }
};