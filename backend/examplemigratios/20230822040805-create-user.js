'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            lastName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            nickName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            idBillingdata: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            idAccount: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            idCard: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            balance: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM('active', 'disabled'),
                allowNull: false,
                defaultValue: 'active',
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
