const express = require('express')
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
 
 
 
const ticketSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
}, {
    timestamps: true,
})

 
const Ticket = mongoose.model("Ticket", ticketSchema)
 

 
let app = express()
 
app.use(express.json())
 

 
app.get('/objects', async (req, res) => {
  try {
    const tickets = await Ticket.find({})
    res.json(tickets)
  }catch(err){
    return res.status(500).send("Failed to read data")
  }
})

app.get('/objects/:id', async (req,res) => {
  try{
    const id = req.params.id
    const ticketByID = await Ticket.findById(id)
    res.json(ticketByID)
  }catch(err){
    return res.status(500).send("Failed to read data")
  }
})
 
app.post('/objects', async (req, res) => {
  try {
    if (!req.body || !req.body.name) {
      return res.status(400).json({ Error: "The name is required" });
    }

    if (!req.body || !req.body.description) {
      return res.status(400).json({ Error: "The description is required" });
    }

    if (!req.body || !req.body.price) {
      return res.status(400).json({ Error: "The price is required" });
    }
 
    const ticket = await Ticket.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    });
    console.log('Created ticket:', ticket);
    res.status(201).json(ticket);
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/objects/:id', async (req,res) => {
  try{
    const id = req.params.id
    const ticket = await Ticket.findById(id)
    if (req.body.name) {
    ticket.name = req.body.name
    }
    if (req.body.description) {
      ticket.description = req.body.description
    }
    if (req.body.price){
      ticket.price = req.body.price
    }
    await ticket.save()
    res.json(ticket)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})

app.delete('/objects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
 
const startServer = async () => {
  await connectDB();
 
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
};
 
startServer();