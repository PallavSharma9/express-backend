import { ImageKit } from "@imagekit/nodejs";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadFile(file) {
  const base64File = file.buffer.toString("base64");

  const result = await imageKit.files.upload({
    file: base64File,
    fileName: file.originalname,
  });

  return result;
}
