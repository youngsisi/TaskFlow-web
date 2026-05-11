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