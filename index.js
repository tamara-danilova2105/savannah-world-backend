const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const catRoutes = require('./cats/routes');
const authRoutes = require('./login/routes');

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(catRoutes);
app.use(authRoutes);
app.use('/uploads', express.static('uploads'));

mongoose
    .connect(process.env.MONGODB_LINK)
    .then(() => console.log('WE WERE CONNECTED TO MONGO'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`I AM LISTENING ON PORT ${PORT}`);
});