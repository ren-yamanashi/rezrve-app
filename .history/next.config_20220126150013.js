const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/react",
]);

module.exports = {
  webpack: (config, options) => {
    const nextCssLoaders = config.module.rules.find(
      (rule) => typeof rule.oneOf === "object"
    );

    nextCssLoaders.oneOf.forEach((loader) => {
      if (
        loader.sideEffects &&
        loader.issuer &&
        loader.issuer.include &&
        loader.issuer.include.endsWith("_app.tsx")
      ) {
        delete loader.issuer;
      }
    });

    return config;
  },
};
