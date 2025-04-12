require("dotenv").config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/authRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const storeRoutes = require('./routes/storeRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/stores', storeRoutes);


app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Store Rating Application!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});