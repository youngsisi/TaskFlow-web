exports.createTask = async (req, res) => {
  const { title, description, priority, deadline, status, projectId, assignedTo } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      priority,
      status: status || 'a_faire',
      deadline,
      project: projectId,
      assignedTo: assignedTo || null,
      createdBy: req.user.userId
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTasksByProject = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;

    const filter = { project: req.params.id };

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      data: tasks,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, deadline, assignedTo } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, status, deadline, assignedTo },
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Tâche supprimée' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.userId
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
if (assignedTo) {
  await Notification.create({
    user: assignedTo,
    type: 'assignation',
    message: `Vous avez été assigné à la tâche "${title}"`,
    project: projectId,
    task: task._id
  });
}
await logActivity(
  'création_tâche',
  projectId,
  req.user.userId,
  `${req.user.name} a créé la tâche "${title}"`,
  task._id
);