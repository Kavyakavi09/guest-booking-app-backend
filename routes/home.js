import express from 'express';
import {
  countByCity,
  countByType,
  createHome,
  deleteHome,
  getHome,
  getHomeRooms,
  getHomes,
  getOwnerHomes,
  updateHome,
} from '../controllers/home.js';
import { verifyOwner } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post('/', verifyOwner, createHome);

//UPDATE
router.put('/:id', verifyOwner, updateHome);
//DELETE
router.delete('/:id', verifyOwner, deleteHome);
//GET

router.get('/find/:id', getHome);

// Get Owner Homes
router.get('/ownerHomes', verifyOwner, getOwnerHomes);

//GET ALL

router.get('/', getHomes);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHomeRooms);

export default router;
