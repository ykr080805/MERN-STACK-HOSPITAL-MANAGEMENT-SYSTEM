import express from "express";
import { addNewAdmin, login, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js"; // make sure this path is correct

const router = express.Router();

// Patient registration and login
router.post("/patient/register", patientRegister);
router.post("/login", login);

// ✅ Protect admin route with middleware
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);

export default router;
