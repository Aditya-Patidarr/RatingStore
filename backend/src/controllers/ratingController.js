const Rating = require('../models/ratingModel');
const User = require('../models/userModel');
const submitRating = async (req, res) => {
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).send({ message: "Rating must be between 1 and 5." });
    }

    try {
        const newRating = await Rating.create({
            userId: req.user.id,
            storeId,
            rating
        });

        res.status(201).send(newRating);
    } catch (error) {
        res.status(500).send({ message: "Error submitting rating.", error });
    }
};
const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.send(ratings);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving ratings.", error });
    }
}
const modifyRating = async (req, res) => {
    const { rating } = req.body;
    const { storeId } = req.params;
    if (rating < 1 || rating > 5) {
        return res.status(400).send({ message: "Rating must be between 1 and 5." });
    }

    try {
        const updatedRating = await Rating.update(
            { rating },
            { where: { userId: req.user.id, storeId } }
        );

        if (updatedRating[0] === 0) {
            return res.status(404).send({ message: "Rating not found." });
        }

        res.send({ message: "Rating updated successfully." });
    } catch (error) {
        res.status(500).send({ message: "Error modifying rating.", error });
    }
};

const getAllUsersByStore = async (req, res) => {
    const { storeId } = req.params;

    try {
        const ratings = await Rating.findAll({ where: { storeId } });
        if(!ratings || ratings.length === 0) {
            return res.status(404).send({ message: "No ratings found for this store." });
        }
        const userIds = ratings.map(rating => rating.userId);
        const users = await User.findAll({ where: { id: userIds } });
        if(!users || users.length === 0) {
            return res.status(404).send({ message: "No users found for this store." });
        }
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving users.", error });
    }
}
const ratingsUserNames = async (ratings) => {
    const userIds = ratings.map(rating => rating.userId);
    const users = await User.findAll({ where: { id: userIds } });
    if (!users || users.length === 0) {
        return res.status(404).send({ message: "No users found." });
    }
    
    const formattedRatings = ratings.map(rating => {
        let i=0;
        const username = users[i++];
        const newRating = {
        id: rating.id,
        storeId: rating.storeId,
        rating: rating.rating,
        comment: rating.comment,
        userId: rating.userId,
        userName: username.name
        }
        return newRating;
    });
    return formattedRatings;
}
const getStoreRatings = async (req, res) => {
    const { storeId } = req.params;

    try {
        const ratings = await Rating.findAll({
            where: { storeId },
        });
        const formattedRatings = await ratingsUserNames(ratings);
        if (!formattedRatings || formattedRatings.length === 0) {
            return res.status(404).send({ message: "No ratings found for this store." });
        }
        console.log(formattedRatings);
        res.status(200).send(formattedRatings);
    } catch (error) {
        console.error('Error retrieving ratings:', error);
        res.status(500).send({ message: "Error retrieving ratings.", error });
    }
};
const getAverageRating = async (req, res) => {
    const { storeId } = req.params;

    try {
        const averageRating = await Rating.findAll({
            attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
            where: { storeId }
        });

        res.send(averageRating);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving average rating.", error });
    }
};

const getUserRatings = async (req, res) => {
    const { userId } = req.params;

    try {
        const userRatings = await Rating.findAll({ where: { userId } });

        if (!userRatings || userRatings.length === 0) {
            return res.status(404).send({ message: "No ratings found for this user." });
        }

        res.send(userRatings);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving user ratings.", error });
    }
};

module.exports={getAllUsersByStore,getAllRatings,submitRating,modifyRating,getStoreRatings,getAverageRating,getUserRatings};