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