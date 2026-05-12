const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const validateTask = require('../middlewares/validateTask');
const taskController = require('../controllers/taskController');


router.post('/',authMiddleware,validateTask,taskController.createTask);
router.get('/my-tasks',authMiddleware,taskController.getMyTasks);
router.get('/project/:id',authMiddleware,taskController.getTasksByProject);
router.get('/:id',authMiddleware,taskController.getTaskById);
router.put('/:id',authMiddleware,validateTask,taskController.updateTask);
router.patch('/:id/status',authMiddleware,taskController.updateTaskStatus);
router.delete('/:id',authMiddleware,taskController.deleteTask);

module.exports = router;