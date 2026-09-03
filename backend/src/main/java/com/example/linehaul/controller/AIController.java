package com.example.linehaul.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.linehaul.ai.LinehaulAssistant;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final LinehaulAssistant assistant;

    public AIController(LinehaulAssistant assistant) {
        this.assistant = assistant;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody Map<String, String> request) {

        String message = request.get("message");

        if (message == null || message.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Message cannot be empty."));
        }

        try {
            String response = assistant.chat(message);

            return ResponseEntity.ok(
                    Map.of("message", response)
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "message",
                            "AI service failed: " + e.getMessage()
                    ));
        }
    }
}