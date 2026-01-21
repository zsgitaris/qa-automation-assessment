module.exports = {
  default: {
    paths: ["web/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["web/steps/**/*.ts", "web/support/**/*.ts"],
    publishQuiet: true,
    format: ["progress", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results/web"
    }
  }
};
