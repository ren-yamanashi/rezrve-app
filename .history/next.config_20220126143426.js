/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@fullcalendar"]);
module.exports = withTM({
  reactStrictMode: true,
});
