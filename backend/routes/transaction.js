module.exports = (app) => {
   const TransactionController = require('../controllers/transaction');

   /**
* @swagger
* /transaction/buy:
*   post:
*     summary: Buy shares of a specific instrument.
*     description: Creates a purchase transaction for the specified stock.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               ticker:
*                 type: string
*                 description: The stock ticker symbol (e.g., AAPL) to purchase shares.
*               quantity:
*                 type: integer
*                 description: The number of shares to purchase.
*                 example: 10
*     responses:
*       201:
*         description: Transaction successfully recorded.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                 ticker:
*                   type: string
*                 quantity:
*                   type: integer
*                 price:
*                   type: number
*                 transactionDate:
*                   type: string
*                   format: date-time
*       400:
*         description: Invalid request.
*       500:
*         description: Server error.
*/
   app.post('/transaction/buy', TransactionController.buyShares);

   /**
* @swagger
* /transaction/sell:
*   post:
*     summary: Sell shares of a specific instrument.
*     description: Creates a Sale transaction for the specified stock.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               ticker:
*                 type: string
*                 description: The stock ticker symbol (e.g., AAPL) to purchase shares.
*               quantity:
*                 type: integer
*                 description: The number of shares to purchase.
*                 example: 10
*     responses:
*       201:
*         description: Transaction successfully recorded.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                 ticker:
*                   type: string
*                 quantity:
*                   type: integer
*                 price:
*                   type: number
*                 transactionDate:
*                   type: string
*                   format: date-time
*       400:
*         description: Invalid request.
*       500:
*         description: Server error.
*/
   app.post('/transaction/sell', TransactionController.sellShares);

   /**
    * @swagger
    * /transaction/portfolio/{ticker}:
    *   get:
    *     summary: Retrieve portfolio.
    *     description: Returns the portfolio of all holdings, with cost basis, market value, unrealized profit/loss.
    *     parameters:
    *       - in: query
    *         name: ticker
    *         schema:
    *           type: string
    *         required: false
    *         description: Retrieve portfolio details for a specific instrument.
    *     responses:
    *       200:
    *         description: Portfolio details.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 ticker:
    *                   type: string
    *                 costBasis:
    *                   type: number
    *                 marketValue:
    *                   type: number
    *                 unrealizedReturnRate:
    *                   type: number
    *                 unrealizedProfitLoss:
    *                   type: number
    *       500:
    *         description: Server error.
    */

   app.get('/transaction/portfolio/:ticker?', TransactionController.portfolio);

   /**
* @swagger
* /transactions/{ticker}:
*   get:
*     summary: Get all transactions.
*     description: Returns a list of all transactions, with optional filter by ticker symbol.
*     parameters:
*       - in: query
*         name: ticker
*         schema:
*           type: string
*         required: false
*         description: Filter transactions by stock ticker.
*     responses:
*       200:
*         description: List of transactions.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   ticker:
*                     type: string
*                   quantity:
*                     type: integer
*                   transactionType:
*                     type: string
*                   price:
*                     type: number
*                   transactionDate:
*                     type: string
*                     format: date-time
*       500:
*         description: Server error.
*/
   app.get('/transactions/:ticker?', TransactionController.getTransacations);
}