import express from "express"
import {updateDoctor , deleteDoctor ,getSingleDoctor , allDoctor ,getDoctorProfile}  from "../controllers/doctorcontroller.js"
const router = express.Router();
import {authenticate , restrict} from "../auth/verifyoken.js"
import reviewRouter from "./review.js"

router.use('/:doctorId/reviews' , reviewRouter)
router.get('/:id' , getSingleDoctor);
router.get('/' , allDoctor);
router.put('/:id' ,authenticate,restrict(['doctor']), updateDoctor);
router.delete('/:id' ,authenticate,restrict(['doctor']), deleteDoctor);
router.get('/profile/me' ,authenticate,restrict(['doctor']), getDoctorProfile);
export default router ;