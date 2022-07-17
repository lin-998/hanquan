module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  extends: ["plugin:vue/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: "module",
  },
  globals: {
    plus: "readonly",
  },
  rules: {
    "no-alert": 0,
    semi: [2, "always"], // 自动补充分号
    "no-unused-vars": "warn", // 用let 代替var
    "no-var": "warn", // 使用var声明变量警告
    "no-unused-vars": 1, // 禁止出现未使用的变量
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ], // 统一使用两个字符缩进
  },
};
