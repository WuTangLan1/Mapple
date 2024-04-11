const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: {
        warnings: true, // Show warnings
        errors: false // Set to false to disable the error overlay
      },
    },
  },
});