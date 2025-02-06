import CryptoJS from "crypto-js";

export function encryptData(message, nonce) {
  const key = CryptoJS.SHA256(String(nonce));
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv });

  return {
    ed: encrypted.toString(),
    iv: iv.toString(CryptoJS.enc.Hex),
  };
}

export function decryptData(encryptedData, nonce, iv) {
  const key = CryptoJS.SHA256(String(nonce));
  const ivBytes = CryptoJS.enc.Hex.parse(iv);

  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: ivBytes });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
