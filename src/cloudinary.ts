import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

async function handleUpload(file: Express.Multer.File, imageName: string) {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    display_name: imageName,
  };

  const base64 = file.buffer.toString("base64");
  const image = "data:" + file.mimetype + ";base64," + base64;

  try {
    const result = await cloudinary.uploader.upload(image, options);
    return result;
  } catch (error) {
    return error;
  }
}

export default handleUpload;
