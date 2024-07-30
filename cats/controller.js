const Cat = require('./model');
const fs = require('fs');
const path = require('path');

module.exports.getCats = async (req, res) => {
    try {
        const { generate, sex, age, shipment, page = 1 } = req.query;

        const limit = 12;

        const filter = {};
        if (generate && generate.length > 0) {
            filter.generate = { $in: generate.split(',') };
        }
        if (sex && sex.length > 0) {
            filter.sex = { $in: sex.split(',') };
        }
        if (age && age.length > 0) {
            filter.age = { $in: age.split(',') };
        }
        if (shipment && shipment.length > 0) {
            filter.shipment = { $in: shipment.split(',') };
        }

        const skip = (page - 1) * limit;
        const sort = { _id: -1 };

        const totalCount = await Cat.countDocuments(filter);
        const cats = await Cat.find(filter).sort(sort).skip(skip).limit(limit);

        res.status(200).send({ cats, totalCount });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

//?generate=Ф2,Ф3,Ф4&sex=самец,самка&age=взрослые,котята&shipment=готов%20к%20отправке,ожидание,продан
//http://localhost:8000?generate&sex&age&shipment

module.exports.saveCat = async (req, res) => {
    const cat = req.body;
    try {
        const newCat = await Cat.create(cat);
        res.status(201).send(newCat);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.updatedCat = async (req, res) => {
    const { id } = req.params;
    const cat = req.body;
    try {
        const updatedCat = await Cat.findByIdAndUpdate(
            id,
            cat,
            { new: true }
        );
        if (!updatedCat) {
            return res.status(404).send({ error: 'Cat not found' });
        }
        res.status(200).send(updatedCat);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.deleteCat = async (req, res) => {
    const { id } = req.params;
    try {
        const cat = await Cat.findById(id);

        if (cat && cat.image) {
            fs.unlink(path.join(__dirname, '..', 'uploads', cat.image), err => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                }
            });
        }

        await Cat.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports.uploadFile = (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
}
