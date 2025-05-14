package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.dto.TaskRequestDTO;
import com.learnwithfranny.backend.model.Task;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    public Task createTask(TaskRequestDTO request) {
        User user = userService.getCurrentUser();
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDate(request.getDate());
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<Task> getTasksByDate(LocalDate date) {
        return taskRepository.findByUserAndDate(userService.getCurrentUser(), date);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().equals(userService.getCurrentUser())) {
            throw new RuntimeException("Unauthorized to delete this task");
        }

        taskRepository.delete(task);
    }

    // Retrieving all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAllByUser(userService.getCurrentUser());
    }

    // Retrieving tasks within a range
    public List<Task> getTasksInRange(LocalDate start, LocalDate end) {
        return taskRepository.findByUserAndDateBetween(
                userService.getCurrentUser(),
                start,
                end);
    }
    
    // Updating a task
    public void updateTask(Long taskId, TaskRequestDTO newTask) {
        // Update with the new information
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(newTask.getTitle());
        task.setDate(newTask.getDate());
        taskRepository.save(task);
    }

}
