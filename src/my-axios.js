import axios from "axios";

const URL = "https://simple-auth.yna.co.il/v1/";

const instance = axios.create({
  baseURL: URL,
});

export default instance;
