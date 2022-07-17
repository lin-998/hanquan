const { VUE_APP_API } = require("@/config/index");

export async function uploadImage() {
  let chooseImageRes = await uni.chooseImage();
  const [tempFilePaths] = chooseImageRes.tempFilePaths;

  let url = await upFileCurrency(tempFilePaths);
  return url;
}

export async function upFileCurrency(filePath) {
  uni.showLoading({
    mask: true,
    title: "上传中...",
  });
  const baseURL =
    process.env.NODE_ENV === "development" &&
    process.env.VUE_APP_PLATFORM === "h5"
      ? ""
      : VUE_APP_API;

  let res = await uni.uploadFile({
    url: baseURL + "/api/upload/upFileCurrency",
    filePath: filePath,
    name: "file",
    header: {
      token: uni.getStorageSync("token"),
    },
  });
  uni.hideLoading();
  let data = JSON.parse(res.data).data;
  return VUE_APP_API + data;
}
