package com.learnwithfranny.backend.controller;

import com.learnwithfranny.backend.dto.TaskRequestDTO;
import com.learnwithfranny.backend.model.Task;
import com.learnwithfranny.backend.service.TaskService;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createTask(@RequestBody TaskRequestDTO request) {
        try {
            System.out.println("REQUEST DATE: " + request.getDate()); 
            System.out.println("REQUEST TITLE: " + request.getTitle());

            taskService.createTask(request);
            return ResponseEntity.ok("Sucessfully added taks");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
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

    // Retrieving tasks within a range
    @GetMapping("/range")
    public List<Task> getTasksInRange(
        @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
        @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        return taskService.getTasksInRange(start, end);
    }
    // Deleting specific task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable(name = "id") Long id) {
        try {

        } catch (Exception e) {
            
        }
        taskService.deleteTask(id);
    }
}
