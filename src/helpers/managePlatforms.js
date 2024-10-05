import axios from "axios";
import config from "../config";

export const getPlatforms = async () => {
  let query = {
    method: "get",
    url: `${config.SERVER_URL}/platforms`
  };
  try {
    let response = await axios(query);
    return [null, response];
  } catch (error) {
    return [error];
  }
};