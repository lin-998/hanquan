// 节流
export function throttle(fn, interval, option) {
  let last = 0;
  let timer = null;
  if (!option) option = {};

  let trailing = option.trailing || false;

  return function () {
    // this和argument
    let _this = this;
    let _arguments = arguments;

    let now = new Date().getTime();
    if (now - last > interval) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(_this, _arguments);
      last = now;
    } else if (timer === null && trailing) {
      // 只是最后一次
      timer = setTimeout(function () {
        timer = null;
        fn.apply(_this, _arguments);
      }, interval);
    }
  };
}

// 防抖
export function debounce(fn, time = 50, immediate) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(this, args);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

function h5tobase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

function mptobase64(file) {
  return new Promise((resolve) => {
    uni.getFileSystemManager().readFile({
      filePath: file.path,
      encoding: "base64",
      success: (r) => {
        let paths = file.path.split(".");
        let suffx = paths[paths.length - 1];
        resolve(`data:image/${suffx};base64,${r.data}`);
      },
      fail: (err) => {
        console.log("err:", err);
      },
    });
  });
}

function apptobase64(file) {
  return new Promise((resolve) => {
    plus.io.resolveLocalFileSystemURL(file.path, (f) => {
      const reader = new plus.io.FileReader();
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.readAsDataURL(f);
    });
  });
}

export function toBase64(file) {
  // #ifdef APP-PLUS
  return apptobase64(file);
  // #endif
  // #ifdef H5
  return h5tobase64(file);
  // #endif
  // #ifdef MP-WEIXIN
  return mptobase64(file);
  // #endif
}

export function multiFileToBase64(files) {
  return Promise.all(files.map((f) => toBase64(f)));
}
