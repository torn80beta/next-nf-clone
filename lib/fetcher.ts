import axios from "axios";

const fetcher = (url: string) => {
  const data = axios.get(url).then((res) => res.data);

  return data;
};

export default fetcher;
