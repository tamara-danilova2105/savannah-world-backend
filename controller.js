const Cat = require('./model');

module.exports.getCats = async (_, res) => {
    try {
        const cats = await Cat.find();
        res.status(200).send(cats);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.saveCat = async (req, res) => {
    const cat = req.body;
    try {
        const newCat = await Cat.create(cat);
        res.status(201).send(newCat);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

