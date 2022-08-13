"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Post.init(
        {
            postId: { primaryKey: true, type: DataTypes.INTEGER },
            userId: { type: DataTypes.INTEGER, require: true },
            title: { type: DataTypes.STRING, require: true },
            content: { type: DataTypes.STRING, require: true },
            nickname: { type: DataTypes.STRING, require: true },
            secretkey: { type: DataTypes.STRING, require: true },
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
