const { fetchInstrumentData } = require('../services/instrument');
const logger = require('../logger');

class InstrumentController {
    
    /**
     * Handles the request to fetch instrument data.
     * 
     * This function receives instrument ticker symbol parameter in the request, for example AAPL,MSFT.
     * For multiple instrument symbols each ticker symbol should be comma separated and max 10 symbols can be passed in request.
     *
     * @param {Object} req - Express request object.
     * @param {Object} req.params - Contains parameters passed in the request ticker as Symbol.
     * @param {Object} res - Express response object used to send back the response to the client.
     *
     * @returns {void}
    */

    async searchInstrument(req, res) {
        const { ticker } = req.params;
        try {
            logger.info(`Fetching data for ticker: ${ticker}`);
            const data = await fetchInstrumentData(ticker);

            const result = data.quoteResponse.result;

            if (!result.length) {
                logger.warn(`Instrument not found for : ${ticker}`);
            }

            logger.info(`Data retrieved successfully for ticker: ${ticker}`);
            return res.status(200).json({ result })

        } catch (error) {
            logger.error(`Error fetching data for ticker ${ticker}: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new InstrumentController();