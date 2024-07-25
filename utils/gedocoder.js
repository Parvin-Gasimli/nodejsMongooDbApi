const nodeGeocoder = require("node-geocoder");
const options = {
  provider: "",
  httpAdapter: "https",
  apiKey: "",
  formatter: null,
};

const geoCoder = nodeGeocoder(options);
module.exports = geoCoder;
