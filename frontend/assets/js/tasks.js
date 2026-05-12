function autoSaveDraft(projectId) {
  const form = document.getElementById('task-form');
  if (!form) return;

  form.addEventListener('input', () => {
    const draft = {
      title: form.querySelector('[name="title"]').value,
      description: form.querySelector('[name="description"]').value,
      priority: form.querySelector('[name="priority"]').value,
      deadline: form.querySelector('[name="deadline"]').value,
      assignedTo: form.querySelector('[name="assignedTo"]').value
    };
    
    localStorage.setItem(`draft_task_${projectId}`, JSON.stringify(draft));
  });
}


function restoreDraft(projectId) {
  const draft = localStorage.getItem(`draft_task_${projectId}`);
  const form = document.getElementById('task-form');
  
  if (draft && form) {
    const data = JSON.parse(draft);
    
   
    if (confirm('Un brouillon non sauvegardé existe. Voulez-vous le restaurer ?')) {
      form.querySelector('[name="title"]').value = data.title || '';
      form.querySelector('[name="description"]').value = data.description || '';
      form.querySelector('[name="priority"]').value = data.priority || 'moyenne';
      form.querySelector('[name="deadline"]').value = data.deadline || '';
      form.querySelector('[name="assignedTo"]').value = data.assignedTo || '';
    } else {
      localStorage.removeItem(`draft_task_${projectId}`);
    }
  }
}


function clearDraft(projectId) {
  localStorage.removeItem(`draft_task_${projectId}`);
}


async function submitTaskForm(projectId) {
  const form = document.getElementById('task-form');
  const formData = new FormData(form);
  
  try {
    await axios.post(`${API_URL}/tasks`, {
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      deadline: formData.get('deadline'),
      projectId: projectId,
      assignedTo: formData.get('assignedTo')
    });
    
    clearDraft(projectId);
    alert('Tâche créée avec succès !');
    form.reset();
  } catch (error) {
    alert('Erreur lors de la création');
  }
}