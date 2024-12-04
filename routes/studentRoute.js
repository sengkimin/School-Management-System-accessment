import express from "express";
import { createStudent, getAllStudent, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';
const router = express.Router();

router.post("/create",createStudent);
router.get("/all",getAllStudent);
router.get("/get/:id",getStudentById);
router.put("/update/:id",updateStudent);
router.delete("/delete/:id",deleteStudent);

export default router;