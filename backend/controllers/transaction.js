const db = require('../models');
const Transaction = db.Transaction;
const { fetchInstrumentData } = require('../services/instrument');
const logger = require('../logger');

class TransactionController {
    async buyShares(req, res) {
        const { ticker, quantity } = req.body;

        try {
            logger.info(`Initiating purchase for ticker: ${ticker}, quantity: ${quantity}`);

            if (quantity <= 0) {
                logger.warn(`Invalid Quantity. Quantity must be a valid number.`);
                return res.status(400).json({ message: 'Invalid Quantity. Quantity must be a valid number.' })
            }

            if (!ticker) {
                logger.warn(`Ticker is Required.`);
                return res.status(400).json({ message: 'Ticker is Required.' })
            }

            const data = await fetchInstrumentData(ticker);

            const result = data.quoteResponse.result;

            if (!result.length) {
                logger.warn(`Instrument not found for : ${ticker}`);
                return res.status(404).json({ message: 'Instrument not found.' });
            }

            const quote = result[0];

            const trx = await Transaction.create({
                instrumentSymbol: ticker,
                quantity,
                price: quote.regularMarketPrice,
                transactionType: 'BUY',
                transactionDate: new Date()
            });

            logger.info(`Shares purchased successfully for ticker: ${ticker}, quantity ${quantity}`);

            res.status(201).json({ success: true, message: 'Shares purchased successfully.', trx });
        } catch (error) {
            logger.error(`Error purchasing shares for ticker ${ticker}: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async sellShares(req, res) {
        try {
            const { ticker, quantity } = req.body;
            logger.info(`Initiating Shares Sell for ${ticker} with quantity ${quantity}.`);

            if (quantity <= 0) {
                logger.warn(`Invalid Quantity. Quantity must be a valid number.`);
                return res.status(400).json({ message: 'Invalid Quantity. Quantity must be a valid number.' })
            }

            if (!ticker) {
                logger.warn(`Ticker is Required.`);
                return res.status(400).json({ message: 'Ticker is Required.' })
            }

            // Fetch Owned Shares of the ticker

            const ownedShares = await Transaction.findAll({
                where: {
                    instrumentSymbol: ticker
                }
            })

            const transactions = await ownedShares.map(shares => shares.dataValues);

            if (!transactions.length) {
                logger.error(`You don't have enough shares to sell.`);
                return res.status(400).json({ message: `No Shares found for ${ticker}` })
            }

            const sold = await transactions.filter(tr => tr.transactionType === 'SELL').reduce((acc, trx) => acc + Number(trx.quantity), 0);
            const purchased = await transactions.filter(tr => tr.transactionType === 'BUY').reduce((acc, trx) => acc + Number(trx.quantity), 0);

            const available = purchased - sold;

            // If enough shares are available then sell shares
            if (available >= quantity) {
                // Fetch updated price of the intrument
                const data = await fetchInstrumentData(ticker);

                if (!data.quoteResponse.result.length) {
                    logger.warn(`Instrument not found for : ${ticker}`);
                    return res.status(404).json({ message: 'Instrument not found.' });
                }

                const result = data.quoteResponse.result[0];

                const trx = await Transaction.create({
                    instrumentSymbol: ticker,
                    quantity,
                    price: result.regularMarketPrice,
                    transactionType: 'SELL',
                    transactionDate: new Date()
                });

                logger.info(`Shares sold successfully for ticker: ${ticker} with quantity ${quantity}`);
                return res.status(201).json({ success: true, message: 'Shares sold successfully.', trx });
            }

            logger.error(`You don't have enough shares to sell.`);
            return res.status(500).json({ message: `You don't have enough shares to sell.` });
        } catch (error) {
            logger.error(`Error purchasing shares for ticker ${ticker}: ${error.message}`);
            res.status(500).json({ message: error.message || 'Something went wrong.' });
        }
    }

    async getTransacations(req, res) {
        const { ticker } = req.params;

        logger.info(`Initiating transactions fetching for ${ticker ? ticker: 'all instruments'}`);

        // Extract page and limit from query parameters
        const page = parseInt(req.query.page, 10) || 1; // default to page 1
        const limit = parseInt(req.query.limit, 10) || 10; // default to 10 items per page
        const offset = (page - 1) * limit;

        try {
            const query = ticker ? { instrumentSymbol: ticker } : {};

            const { rows: transactions, count: totalItems } = await Transaction.findAndCountAll({
                where: query,
                order: [['transactionDate', 'DESC']],
                limit,
                offset
            });

            res.status(200).json({
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
                transactions,
            });

            logger.info(`Transactions retrieved successfully for ${ticker ? ticker: 'all instruments'}`);
        } catch (error) {
            logger.error(`Error fetching transactions for ticker ${ticker ? ticker: 'all instruments'}: ${error.message}`);
            res.status(500).json({ message: error.message || 'Something went wrong.' });
        }
    }

    async portfolio(req, res) {
        const { ticker } = req.params;
        logger.info(`Initiating portfolio for ${ticker ? ticker: 'all instruments'}`);
        try {
            const query = {
                transactionType: 'BUY'
            };

            if (ticker) {
                query.instrumentSymbol = ticker;
            }

            const transactions = await Transaction.findAll({
                where: query
            })

            // Get total price of available shares and count of total shares
            const portfolio = transactions.reduce((acc, transaction) => {
                const { instrumentSymbol, price, quantity } = transaction;

                if (!acc[instrumentSymbol]) {
                    acc[instrumentSymbol] = { costBasis: 0, totalShares: 0, totalSpent: 0 };
                }

                const totalCost = price * quantity;
                acc[instrumentSymbol].costBasis += totalCost;
                acc[instrumentSymbol].totalShares += quantity;
                return acc;
            }, {});


            const enhancedPortfolio = await Promise.all(Object.keys(portfolio).map(async (instrumentSymbol) => {
                const data = await fetchInstrumentData(instrumentSymbol);

                const result = data.quoteResponse.result[0];

                const currentPrice = result.regularMarketPrice;

                const { costBasis, totalShares } = portfolio[instrumentSymbol];
                const marketValue = currentPrice * totalShares;
                const unrealizedPL = marketValue - costBasis;
                const unrealizedReturnRate = (unrealizedPL / costBasis) * 100;

                return {
                    instrumentSymbol,
                    costBasis,
                    marketValue,
                    unrealizedPL,
                    unrealizedReturnRate
                }
            }));

            logger.info(`Portfolio retrieved successfully for ticker ${ticker ? ticker: 'all instruments'}`);
            return res.status(200).json(enhancedPortfolio);
        } catch (error) {
            logger.error(`Error fetching portfolio for ticker ${ticker ? ticker: 'all instruments'}: ${error.message}`);
            res.status(500).json({ message: error.message || 'Error fetching portfolio' });
        }
    }
}

module.exports = new TransactionController();