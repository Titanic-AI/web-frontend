// cypress.config.js – minimal but production-ready
const { defineConfig } = require("cypress");

const BASE_URL =
  process.env.CYPRESS_baseUrl || process.env.BASE_URL || "http://localhost:4173";

module.exports = defineConfig({
  video: false,                          // flip on in CI if you want
  retries: { runMode: 2, openMode: 0 },  // 2 automatic retries in pipelines
  env: {
    API_URL: process.env.API_URL || "http://web-backend:8000",
  },
  e2e: {
    baseUrl: BASE_URL,
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: "cypress/support/e2e.{js,ts}",
    setupNodeEvents(on, config) {
      return config;                     // hook for reporters/plugins later
    },
  },
});
