import axios from "axios";

export const getSecretWord = async (setSecredWord) => {
  const response = await axios.get("http://localhost:3030");
  setSecredWord(response.data);
};

export default {
  getSecretWord,
};
