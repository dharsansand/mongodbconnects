const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize app
const app = express();
const PORT = 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://dharsan2003:OAy3xu9mpyjV7u60@idurar-erp-crm.zjomffa.mongodb.net/?authMechanism=SCRAM-SHA-1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));

// Define Schema
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const DataModel = mongoose.model("Data", DataSchema);

// Routes
app.post("/api/data", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newData = new DataModel({ name, email });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: "Error saving data" });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
