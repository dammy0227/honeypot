const axios = require("axios");

const getGeoInfo = async (ip) => {
  try {
    const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);
    return {
      city: data.city,
      country: data.country_name,
      org: data.org,
      latitude: data.latitude,
      longitude: data.longitude
    };
  } catch (err) {
    return null;
  }
};

module.exports = { getGeoInfo };
