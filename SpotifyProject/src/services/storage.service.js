import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  try {
    const response = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: file.originalname,
      folder: "spotify-music/music",
    });
    return response.url;
  } catch (error) {
    console.log("Error uploading file: ", error.message);
    throw error;
  }
}

export { uploadFile };
