/**
 * 小程序热更新
 * @returns {void}
 */
export default function updateManager() {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: "更新提示",
          content: "发现新版本，是否重启应用?",
          success(res2) {
            if (res2.confirm) {
              uni.clearStorageSync();
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
    }
  });

  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
    uni.showModal({
      title: "提示",
      content: "检查到有新版本，但下载失败，请检查网络设置",
      success(res) {
        if (res.confirm) {
          uni.clearStorageSync();
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
}
