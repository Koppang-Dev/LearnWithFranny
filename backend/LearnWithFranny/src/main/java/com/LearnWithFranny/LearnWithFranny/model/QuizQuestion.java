package com.LearnWithFranny.LearnWithFranny.model;
import java.util.*;

public class QuizQuestion {

    private String question; // The question text
    private String correctAnswer; // The correct answer for this question
    private List<String> options; // A list of possible answer choices
    private String noteId; // The ID of the related note, if applicable

    // Constructor for quiz questions
    public QuizQuestion(String question, String correctAnswer, List<String> options, String noteId) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.options = options;
        this.noteId = noteId;
    }

    // Getters and Setters
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getNoteId() {
        return noteId;
    }

    public void setNoteId(String noteId) {
        this.noteId = noteId;
    }
}