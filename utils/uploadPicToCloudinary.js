import axios from "axios";

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "hit_me_up");
    form.append("cloud_name", "ishaks-cloudinary");

    const res = await axios.post(process.env.CLOUDINARY_URL, form);

    return res.data.url;
  } catch (error) {
    return;
  }
};

export default uploadPic;
