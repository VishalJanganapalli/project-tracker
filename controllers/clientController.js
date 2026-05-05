const Client = require('../models/Client');

exports.createClient = async (req, res) => {
  try {
    const clientData = {
      ...req.body,
      createdBy: req.user.id
    };

    const client = await Client.create(clientData);

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    console.error('Create client error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    console.error('Get all clients error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findOne({ 
      _id: req.params.id, 
      createdBy: req.user.id 
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOne({ 
      _id: req.params.id, 
      createdBy: req.user.id 
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedClient
    });
  } catch (error) {
    console.error('Update client error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOne({ 
      _id: req.params.id, 
      createdBy: req.user.id 
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ message: error.message });
  }
};
