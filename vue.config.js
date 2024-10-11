// FOR DEBUGGIN - ENABLES THE APP TO RUN EVEN IF THERE ARE OBJS/VARS NOT USED

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false  // Add this line to disable ESLint on save
// })

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
