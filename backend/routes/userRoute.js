import express from "express";
import {
    allBookings,
    bookVisit,
    cancelBooking,
    createUser,
    getAllFav,
    getAllUsers,
    toFav,
} from "../controllers/userCntrl.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", allBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFav);
router.get("/allUsers", getAllUsers)

export { router as userRoute };