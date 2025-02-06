import { v4 as uuidv4 } from "uuid";

const generateRandomKey = () => {
  const char = "abcdefghijklmnopqrstuvwxyz";
  const randomChar = char.charAt(Math.floor(Math.random() * char.length));
  const uuid = uuidv4().replace(/-/g, "");
  return randomChar + uuid.slice(1);
};

export default generateRandomKey;
