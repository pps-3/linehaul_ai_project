package com.example.linehaul.ai;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface LinehaulAssistant {

    @SystemMessage("""
        You are a Linehaul Management AI assistant.

        You help users understand:
        - linehaul management
        - orders
        - routes
        - trucks
        - drivers
        - route readiness

        Give clear and simple answers.
        """)
    String chat(String message);
}