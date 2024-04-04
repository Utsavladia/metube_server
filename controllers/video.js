import videoFiles from "../models/videoFiles.js";
import VideoFiles from "../models/videoFiles.js";
import mongoose, { MongooseError } from "mongoose";
import watchLater from "../models/watchLater.js";
import userLiked from "../models/userLiked.js";
import Comments from "../models/comments.js";

export const uplaodVideo = async (req, res, next) => {
  if (req.file === undefined) {
    res.status(404).json({ Message: "upload a .mp4 file only" });
  } else {
    try {
      const file = new VideoFiles({
        videoTitle: req.body.title,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        videoChanel: req.body.channel,
        Uploder: req.body.uploder,
        access: req.body.access,
      });
      await file.save();
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      rmSync.status(400).send(error.Message);
    }
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const files = await videoFiles.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(404).send(error.Message);
  }
};

export const viewController = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("video unavailable..");
  }
  try {
    const file = await videoFiles.findById(_id);
    const views = file.Views;
    const updatedViews = await videoFiles.findByIdAndUpdate(
      _id,
      {
        Views: views + 1,
      },
      { new: true }
    );
    res.status(200).json(updatedViews);
  } catch (error) {
    console.log(error);
  }
};

export const likeController = async (req, res) => {
  const { id: _id } = req.params;
  const { Like } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("video unavailable");
  }
  try {
    const updatedlike = await videoFiles.findByIdAndUpdate(
      _id,
      {
        Like: Like,
      },
      { new: true }
    );
    res.status(200).json(updatedlike);
  } catch (error) {
    res.status(404).json("erroe in liking: ", error);
    console.log(error);
  }
};

export const watchlaterController = async (req, res) => {
  const { videoId, userId } = req.body;
  console.log("data we got on save to watch later", videoId, userId);
  try {
    const existingWatchLater = await watchLater.findOne({ videoId, userId });
    console.log("existing watchlater ", existingWatchLater);
    if (existingWatchLater) {
      await watchLater.findOneAndDelete({ videoId, userId });
      res.status(200).json({ Message: "Removed watch later video" });
    } else {
      const addToWatchLater = new watchLater({ videoId, userId });
      await addToWatchLater.save();
      console.log("we got the watchlater saved new as ", addToWatchLater);
      res.status(200).json("Added to watch later");
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getAllWatchLaterController = async (req, res) => {
  try {
    const files = await watchLater.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(404).send("errro getting alll watch laters", error.Message);
  }
};

export const userLikedController = async (req, res) => {
  const { userId, videoId } = req.body;
  console.log("we called userliked controller as ", userId, videoId);
  try {
    const user = await userLiked.findOne({ userId });
    const likedvideosList = user?.likedVideos || [];

    if (user) {
      console.log("user we found on liked as ", user);
      console.log("we ggot the likded video list as ", likedvideosList);
      const index = likedvideosList.indexOf(videoId);
      if (index !== -1) {
        likedvideosList.splice(index, 1);

        console.log("removed the video id", videoId, index);
      } else {
        likedvideosList.push(videoId);
        console.log("added to the likedvide the id ", videoId);
      }
      const userupdate = await userLiked.findOneAndUpdate(
        { userId },
        { likedVideos: likedvideosList },
        { new: true }
      );
      console.log("user updated with the liked videos as ", userupdate);
      res.status(200).json({ message: "added the video to the user" });
    } else {
      const newUserLiked = userLiked.create({
        userId,
        likedVideos: [videoId],
      });
      await newUserLiked.save();
      console.log("user Id with the liked videos added", newUserLiked);
      res.status(200).json({ message: "added user and liked video in likes" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getAllLikesController = async (req, res) => {
  const { userId } = req.query;
  try {
    const likedVideos = await userLiked.findOne({ userId });
    res.status(200).send(likedVideos);
  } catch (error) {
    res.status(404).send("erroe finding alll likes", error);
  }
};

export const comment = async (req, res) => {
  const { userId, videoId, comment, name } = req.body;
  console.log("comment data we got on req ", userId, videoId, comment, name);
  try {
    const newcomment = await Comments.create({
      userId: userId,
      videoId: videoId,
      comment: comment,
      name: name,
    });
    await newcomment.save();
    console.log("new comment created ", newcomment);
    res.status(200).json({ message: "commented successfuly" });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getAllComments = async (req, res) => {
  const { vid } = req.query;
  console.log("data got on getall comment", vid);
  try {
    const comments = await Comments.find({ videoId: vid });
    console.log(comments);
    res.status(200).send(comments);
  } catch (error) {
    res.status(404).json({ message: "error fetching the alll comments " });
  }
};
