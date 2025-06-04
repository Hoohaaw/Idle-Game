import { MissionModel } from "../models/MissionModel.js";

export class MissionController {

  
  async startMission(req, res) {
    const { missionId } = req.params;
    const { missionData } = req.body;

    if (!missionData || !missionData.description || !missionData.reward || !missionData.duration) {
      return res.status(400).json({ error: "Incomplete mission data provided." });
    }

    try {
      const mission = new MissionModel({
        user: req.user._id, 
        mission_id: missionId,
        description: missionData.description,
        reward: missionData.reward,
        duration: missionData.duration,
        isActive: true,
      });

      await mission.save();
      res.status(201).json({ message: `Mission ${missionId} started successfully.` });
    } catch (err) {
      console.error("Error starting mission:", err);
      res.status(500).json({ error: "Failed to start mission." });
    }
  }

  async completeMission(req, res) {
    const { missionId } = req.params; // This is the MongoDB _id, not mission template id

    try {
      const mission = await MissionModel.findById(missionId);
      if (!mission) {
        return res.status(404).json({ error: 'Mission not found' });
      }

      mission.isActive = false;
      mission.completedAt = new Date();
      await mission.save();

      res.status(200).json({ message: `Mission ${missionId} completed successfully.` });
    } catch (error) {
      console.error("Error completing mission:", error);
      res.status(500).json({ error: 'Failed to complete mission.' });
    }
  }

  async removeMission(req, res) {
    const { missionId } = req.params;

    try {
      const deletedMission = await MissionModel.findByIdAndDelete(missionId);
      if (!deletedMission) {
        return res.status(404).json({ error: 'Mission not found' });
      }

      res.status(200).json({ message: `Mission ${missionId} removed successfully.` });
    } catch (error) {
      console.error("Error removing mission:", error);
      res.status(500).json({ error: 'Failed to remove mission.' });
    }
  }

}