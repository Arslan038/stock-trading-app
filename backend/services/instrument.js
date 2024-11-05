const axios = require('axios');

/**
 * Fetches instrument data from Finance API.
 * @param {string} symbols - The symbols of the instruments.
 * @returns {Promise<Object>} - Returns an object with instrument details.
 */
async function fetchInstrumentData(symbols) {
  try {
    const response = await axios.get(`${process.env.YH_BASE_URL}/v6/finance/quote?symbols=${symbols}&region=US&lang=en`, {
      headers: { 'X-API-KEY': process.env.YH_API_KEY }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.hint || 'Error fetching instrument data');
  }
}

module.exports = { fetchInstrumentData };
