module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  refs: {
    webComponents: {
      title: "web-components",
      url: 'http://localhost:8001'
    },
    webComponentsAngular: {
      title: "web-components-angular",
      url: 'http://localhost:8002'
    },
    angularApp: {
      title: "angular-app",
      url: 'http://localhost:8003'
    }
  }
}
