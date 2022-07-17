class Upgrade {
  /**
   * 对比版本 0: 不更新, 1: 大版本更新, 2: 热更新
   * @param {String} latest 最新版本号
   */
  compareVersion(latest) {
    if (!latest) throw new Error("latest version is must");
    return new Promise((resolve, reject) => {
      plus.runtime.getProperty(plus.runtime.appid, (widget) => {
        let version = widget.version;
        // 版本样本 1.0.0
        let _latest = latest.split(".");
        let _version = version.split(".");
        for (let i = 0; i < _latest.length; i++) {
          let l = +_latest[i];
          let v = +_version[i];
          if (l > v) return i == 2 ? resolve(2) : resolve(1);
        }
        resolve(0);
      });
    });
  }

  /**
   * 安装文件
   * @param {String} path 文件路径
   * @param {Object} options 额外参数
   */
  install(path) {
    uni.downloadFile({
      url: path,
      success: (res) => {
        plus.runtime.install(
          res.tempFilePath,
          { force: false },
          (success) => {
            plus.runtime.restart();
            plus.nativeUI.toast("已更新");
          },
          (err) => {
            plus.nativeUI.toast(JSON.stringify(err));
          }
        );
      },
      fail: (err) => {
        plus.nativeUI.toast(JSON.stringify(err));
      },
    });
  }
}

export default new Upgrade();
