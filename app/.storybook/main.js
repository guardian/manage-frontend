module.exports = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
};
