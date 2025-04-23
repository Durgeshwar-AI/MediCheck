import goals from "../models/goal.model.js";

export const addGoal = async (req, res) => {
  const user = req.user.id;
  const { name, unit, target, current, percent } = req.body;

  try {
    const goal = new goals({
      user,
      name,
      unit,
      target,
      current,
      percent
    });

    await goal.save();
    res.status(200).json({ message: "Goal added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goal = await goals.find({ user: req.user.id });
    res.json(goal);
  } catch (err) {
    console.error("Retrieval error:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const updatedGoal = await goals.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(updatedGoal);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error updating patient", error });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await goals.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    res.json({ message: "Goal deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete" });
  }
};
