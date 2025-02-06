import crypto from "crypto";

function decryptDataClient(encryptedData, nonce, iv) {
  const key = crypto.createHash("sha256").update(String(nonce)).digest();

  const ivBuffer = Buffer.from(iv, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuffer);

  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export default decryptDataClient;
