import express from "express";
import { noteModel } from "./models/note.model.js";

const notes = [];

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const body = req.body;

  const note = await noteModel.create({
    title: body.title,
    description: body.description,
  });

  res.status(201).json({
    message: "Note created successfully",
    data: note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

app.delete("/notes/:id", (req, res) => {
  const index = req.params.id;

  notes.splice(index, 1);

  res.status(200).json({
    message: "selected task has been deleted",
  });
});

app.patch("/notes/:id", (req, res) => {
  const description = req.body.description;

  const index = Number(req.params.id);

  if (index < 0 || index > notes.length) {
    return res.status(404).json({
      message: "data does not exist",
    });
  }

  notes[index].description = description;

  res.status(200).json("description has been updated");
});
export default app;
