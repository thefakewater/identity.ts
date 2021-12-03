import axios from "axios";
/**
 * Gets a ramdom profile picture.
 * @example
 * ```typescript
 * getPfp().then((pfp) => {
 *  writeFileSync("profile.jpg", pfp);
 * });
 * ```
 * @returns Buffer containing all the bytes of the profile picture.
 */
export async function getPfp(): Promise<Buffer> {
  const bufs = [];
  const stream = await axios.get("https://thispersondoesnotexist.com/image", {
    responseType: "stream",
  });
  stream.data.on("data", (data) => {
    bufs.push(data);
  });
  const final = await new Promise<Buffer>((resolve, reject) => {
    stream.data.on("end", () => {
      resolve(Buffer.concat(bufs));
    });
    stream.data.on("error", (err) => {
      reject(err);
    });
  });
  return final;
}
