const AppError = require('../helpers/AppError');
const db = require('../models/index');
const TransactionServices = require('./transaction.services');

class AccountServices {
    transactionServices = TransactionServices;

    async findOneAccount({ attributes, next }) {
        try {
            const account = await db.Accounts.findOne({
                where: attributes,
                include: [
                    {
                        model: db.Cards,
                    },
                ],
            });
            return account;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createAccount(userId) {
        try {
            const createdAccount = await db.Accounts.create({
                userId,
                balance: 100,
                account_detail_stripe: {},
            });
            return createdAccount;
        } catch (error) {
            throw error;
        }
    }

    async rechargeAccount({ body, id, next }) {
        try {
            const { number, security_code, amount } = body;
            const attributes = { userId: id };

            //buscar cuenta//
            const account = await this.findOneAccount({ attributes, next });
            if (!account) {
                throw next(new AppError('user has no active account', 400));
            }
            //buscar tarjeta//
            const card = await db.Cards.findOne({
                where: {
                    number,
                    type: 'debito',
                    security_code,
                    AccountId: account.id,
                },
            });
            if (!card) {
                throw next(new AppError('this card is no register', 400));
            }

            //usar servicio de crear trabsaferencia//
            const transaction = await this.transactionServices.transfer({
                senderId: id,
                receivingId: id,
                AccountId: account.id,
                amount,
                method: 'recharge',
            });
            //ajustar balance de la cuenta
            const newAccountBalance = eval(account.balance + amount);
            await account.update({ balance: newAccountBalance });

            return transaction;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getBalance(accountNumber) {}
}

module.exports = AccountServices;
