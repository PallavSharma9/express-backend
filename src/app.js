import express from "express";

const notes = [];

const app = express();

app.use(express.json());

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(200).json({
    message: "Note has been added to notes.",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

app.delete("/notes/:id", (req, res) => {
  const index = req.params.id;

  notes.splice(index, 1);

  res.status(200).json({
    message: "selected task has been deleted",
  });
});
export default app;
