const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  blockHosts: ['cdn.jsdelivr.net'],
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: 'test/*.spec.js',
    supportFile: false,
  },
})
