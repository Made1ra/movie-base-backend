import express from "express";
import {
  postRatings,
  getRatings,
  patchRatings,
  deleteMovieFromRatings,
} from "../services/ratings.service";

const router = express.Router();

router.post("/user/:id/ratings", async (request, response) => {
  const { id, movieID, rating } = request.body;
  const userID = request.params.id;
  try {
    await postRatings(id, userID, movieID, rating);
    response.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error adding rating:", error);
    response
      .status(500)
      .json({ error: "An error occurred while adding the rating" });
  }
});

router.get("/user/:id/ratings", async (request, response) => {
  const id = request.params.id;
  try {
    const ratings = await getRatings(id);
    response.status(200).json(ratings);
  } catch (error) {
    console.error("Error getting the ratings:", error);
    response
      .status(500)
      .json({ error: "An error occurred while getting the ratings" });
  }
});

router.patch("/user/:id/ratings", async (request, response) => {
  const userID = request.params.id;
  const { id, rating } = request.body;
  try {
    const ratings = await patchRatings(id, userID, rating);
    response.status(200).json(ratings);
  } catch (error) {
    console.error("Error editing the ratings:", error);
    response
      .status(500)
      .json({ error: "An error occurred while editing the ratings" });
  }
});

router.delete("/user/:id/ratings", async (request, response) => {
  const userID = request.params.id;
  const { id } = request.body;
  try {
    await deleteMovieFromRatings(id, userID);
    response.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting the ratings:", error);
    response
      .status(500)
      .json({ error: "An error occurred while deleting the ratings" });
  }
});

export default router;
