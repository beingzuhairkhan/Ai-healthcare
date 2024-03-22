import express from 'express';
import {getAllReview , createReview} from "../controllers/reviewcontroller.js"
import {authenticate , restrict} from "../auth/verifyoken.js"
const router = express.Router({mergeParams:true});

router.route('/').get(getAllReview).post(authenticate,restrict(['patient']), createReview)


export default router ;