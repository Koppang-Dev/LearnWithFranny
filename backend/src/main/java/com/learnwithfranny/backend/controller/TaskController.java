package com.learnwithfranny.backend.controller;

import com.learnwithfranny.backend.dto.TaskRequestDTO;
import com.learnwithfranny.backend.model.Task;
import com.learnwithfranny.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Creating new task
    @PostMapping
    public Task createTask(@RequestBody TaskRequestDTO request) {
        return taskService.createTask(request);
    }
    
    // Retrieving tasks by date
    @GetMapping
    public List<Task> getTasksByDate(
        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return taskService.getTasksByDate(date);
    }

    // Retrieving all tasks

    @GetMapping("/all")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Deleting specific task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
