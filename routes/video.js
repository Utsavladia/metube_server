import express from "express";
import upload from "../Helpers/fileHelpers.js";
import { uplaodVideo } from "../controllers/video.js";
import { getAllVideos } from "../controllers/video.js";
import { viewController } from "../controllers/video.js";
import { likeController } from "../controllers/video.js";
import { userLikedController } from "../controllers/video.js";
import auth from "../middleware/auth.js";
import { watchlaterController } from "../controllers/video.js";
import { getAllWatchLaterController } from "../controllers/video.js";
import { getAllLikesController } from "../controllers/video.js";
import { historyController } from "../controllers/historycontrol.js";
import { getHistoryController } from "../controllers/historycontrol.js";
import { subscribe } from "../controllers/subscribe.js";
import { comment } from "../controllers/video.js";
import { getAllComments } from "../controllers/video.js";

const routes = express.Router();

routes.post("/uploadVideo", upload.single("video"), uplaodVideo);
routes.get("/getvideos", getAllVideos);

routes.patch("/view/:id", viewController);

routes.patch("/like/:id", auth, likeController);

routes.post("/watchlater", auth, watchlaterController);

routes.get("/getallwatchlater", getAllWatchLaterController);

routes.post("/userliked", auth, userLikedController);

routes.get("/getalllikes", auth, getAllLikesController);

routes.post("/history", auth, historyController);

routes.get("/gethistory", auth, getHistoryController);

routes.post("/subscribe", auth, subscribe);

routes.post("/comment", auth, comment);

routes.get("/getallcomments", getAllComments);

export default routes;
