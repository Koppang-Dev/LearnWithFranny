package com.learnwithfranny.backend.repository;

import com.learnwithfranny.backend.model.Task;
import com.learnwithfranny.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // Finding takes by user and date
    List<Task> findByUserAndDate(User user, LocalDate date);

    // Retrieving all taks
    List<Task> findAllByUser(User user);

    // Tasks within a range
    List<Task> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);

}
