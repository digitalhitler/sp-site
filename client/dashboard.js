const package = require("./package.json");
process.title = "lh-frontapp-dashboard"
if(package.settings && package.settings.environment) {
  if(package.settings.environment === "production") {
    console.error("FAILURE: this is not suitable to use in production.");
    console.log("Change settings.environment in package.json or switch to ");
    console.log("development server.");
    process.exit(1);
  }

  console.info("[i] Initializing dashboard...");
  const db = require("nodejs-dashboard");
  console.dir(db);
}
