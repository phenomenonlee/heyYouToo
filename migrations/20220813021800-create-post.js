"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Posts", {
            postId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: { type: Sequelize.INTEGER, require: true },
            title: {
                type: Sequelize.STRING,
                require: true,
            },
            content: {
                type: Sequelize.STRING,
                require: true,
            },
            nickname: {
                type: Sequelize.STRING,
                require: true,
            },
            secretkey: {
                type: Sequelize.STRING,
                require: true,
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
        await queryInterface.dropTable("Posts");
    },
};
