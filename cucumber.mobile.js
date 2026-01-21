module.exports = {
  default: {
    paths: ["mobile/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["mobile/steps/**/*.ts", "mobile/support/**/*.ts"],
    publishQuiet: true,
    format: ["progress", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results/mobile"
    }
  }
};
