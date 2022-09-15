import express from 'express';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  getOwnerRooms,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/room.js';
import { verifyOwner } from '../utils/verifyToken.js';

const router = express.Router();
//CREATE
router.post('/:homeid', verifyOwner, createRoom);

// Get owner Rooms
router.get('/ownerRooms', verifyOwner, getOwnerRooms);

//UPDATE
router.put('/availability/:id', updateRoomAvailability);
router.put('/:id', verifyOwner, updateRoom);
//DELETE
router.delete('/:id/:homeid', verifyOwner, deleteRoom);
//GET

router.get('/:id', getRoom);

//GET ALL
router.get('/', getRooms);

export default router;
