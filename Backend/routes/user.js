import express from "express"
import {updateUser , deleteUser ,getSingleUser , allUser  ,getUserProfile , getMyAppointment}  from "../controllers/usercontroller.js"
const router = express.Router();
import {authenticate , restrict} from "../auth/verifyoken.js"

router.get('/:id' ,authenticate,restrict(["patient"]), getSingleUser);
router.get('/' ,authenticate,restrict(["admin"]), allUser);
router.put('/:id' ,authenticate,restrict(["patient"]), updateUser);
router.delete('/:id' ,authenticate,restrict(["patient"]), deleteUser);
router.get('/profile/me' ,authenticate,restrict(["patient"]), getUserProfile);
router.get('/appointment/my-appointments' ,authenticate,restrict(["patient"]), getMyAppointment);

export default router ;