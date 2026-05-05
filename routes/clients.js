const express = require('express');
const router = express.Router();
const {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
