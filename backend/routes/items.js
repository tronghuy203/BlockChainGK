const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });


router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      cost: req.body.cost,
      fromAddress: req.body.fromAddress,
      toAddress: req.body.toAddress,
      itemAddress: req.body.itemAddress,
      content: req.body.content,
      hash: req.body.hash,
      status: req.body.status,
      buyer: req.body.buyer,
      contractIndex: req.body.contractIndex,
      imagePath: `uploads/${req.file.filename}` 
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/update', async (req, res) => {
  try {
    const { index, status, rating, isRated, buyer } = req.body;
    const updateData = { status };
    if (rating !== undefined) {
      updateData.rating = rating;
    }
    if (isRated !== undefined) {
      updateData.isRated = isRated;
    }
    if (buyer !== undefined) {
      updateData.buyer = buyer;
    }
    const updatedItem = await Item.findByIdAndUpdate(index, updateData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
