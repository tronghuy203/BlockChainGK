const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/items'); // Ensure the path is correct

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/api/items', itemRoutes);


mongoose.connect("mongodb://localhost:27017/ShopFruit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
