const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [20, 60]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-z0-9]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+[A-Za-z0-9]*$/
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 400],
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.ENUM,
        values: ['System Administrator', 'Normal User', 'Store Owner'],
        allowNull: false,
        defaultValue: 'Normal User'
    }
}, {
    tableName: 'users', 
    timestamps: true
});

User.associate = (models) => {
    User.hasMany(models.Rating, {
        foreignKey: 'userId',
        as: 'ratings'
    });
};

module.exports = User;

