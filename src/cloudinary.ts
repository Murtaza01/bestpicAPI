import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbgjiu7vg",
  api_key: "212236898979148",
  api_secret: "qwU3vv3r6uUkBArtPPk5XCUIb-U",
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
