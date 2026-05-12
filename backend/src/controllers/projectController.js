const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;

    const project = await Project.create({
      title,
      description,
      deadline,
      status,
      owner: req.user.id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find({ owner: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments({ owner: req.user.id });

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      projects
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, deadline, status } = req.body;

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (deadline !== undefined) project.deadline = deadline;
    if (status !== undefined) project.status = status;

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};