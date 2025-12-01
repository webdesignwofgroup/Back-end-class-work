import express, { Router } from "express";
import { createstudents, deleteUser, getAllStudents, getUserById, loginUser, updateUser } from "../controller/user.js";
const router = express.Router()
router.post('/resgister', createstudents)  
router.get('/', getAllStudents)
router.get('/:id', getUserById)
router.post('/login', loginUser)
router.put('/update/:id', updateUser )
router.delete('/:id', deleteUser)
export default router