import axios from "axios";
const KEY = "AIzaSyBfiEa10Uq5vOKaf_dxAWcBEnPc4cPb4fs";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 10,
    key: KEY,
  },
});
