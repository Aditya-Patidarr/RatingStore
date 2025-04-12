const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Store = sequelize.define('Store', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 400]
        }
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    ownerId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});

Store.associate = (models) => {
    Store.hasMany(models.Rating, {
        foreignKey: 'storeId',
        as: 'ratings'
    });

    Store.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner'
    });
};

module.exports = Store;