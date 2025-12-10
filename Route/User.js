import express from "express";
import { createstudents, deleteUser, getAllStudents, getUserById, loginUser, updateUser } from "../controller/user.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router()
router.post('/register', createstudents)  
router.get('/', protect, getAllStudents)
router.get('/:id', getUserById)
router.post('/login', loginUser)
router.put('/update/:id', updateUser )
router.delete('/:id', deleteUser)

export default router