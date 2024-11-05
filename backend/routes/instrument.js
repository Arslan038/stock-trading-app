module.exports = (app) => {
    const InstrumentController = require('../controllers/instrument');

    /**
 * @swagger
 * /instrument/{ticker}:
 *   get:
 *     summary: Retrieve stock information for a specific instrument.
 *     description: Returns data such as name, bid, ask, current price, change in value and percentage for the current day.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         schema:
 *           type: string
 *         required: true
 *         description: The stock ticker symbol (e.g., AAPL for Apple).
 *     responses:
 *       200:
 *         description: A JSON object containing stock information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 bid:
 *                   type: number
 *                 ask:
 *                   type: number
 *                 regularMarketPrice:
 *                   type: number
 *                 regularMarketChange:
 *                   type: number
 *                 regularMarketChangePercent:
 *                   type: number
 *       404:
 *         description: Stock not found.
 *       500:
 *         description: Server error.
 */
    app.get('/instrument/:ticker', InstrumentController.searchInstrument);
}