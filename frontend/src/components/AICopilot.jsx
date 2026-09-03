import { useState } from 'react'
import { chatWithAI } from '../services/api.js'

export default function AICopilot() {
  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello! I am your Linehaul AI Copilot. Ask me about orders, routes, trucks, drivers, capacity, or dispatch.',
    },
  ])

  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage || loading) {
      return
    }

    // Show the user's message immediately.
    setMessages((current) => [
      ...current,
      {
        role: 'user',
        content: trimmedMessage,
      },
    ])

    setMessage('')
    setLoading(true)

    try {
      // Call the Spring Boot AI endpoint.
      const response = await chatWithAI(trimmedMessage)

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            response.message ||
            'I could not generate a response.',
        },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            `Sorry, I could not process your request. ${error.message}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function useSuggestion(text) {
    setMessage(text)
  }

  return (
    <div className="ai-copilot">
   
      <div className="ai-chat">
        {messages.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={`ai-message ${
              item.role === 'user'
                ? 'ai-message-user'
                : 'ai-message-assistant'
            }`}
          >
            <div className="ai-message-label">
              {item.role === 'user'
                ? 'You'
                : 'Copilot'}
            </div>

            <div className="ai-message-content">
              {item.content}
            </div>
          </div>
        ))}

        {loading ? (
          <div className="ai-message ai-message-assistant">
            <div className="ai-message-label">
              Copilot
            </div>

            <div className="ai-message-content ai-thinking">
              Thinking...
            </div>
          </div>
        ) : null}
      </div>

   
      <form
        className="ai-input-area"
        onSubmit={handleSubmit}
      >
        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Ask about Linehaul..."
          rows={3}
          disabled={loading}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            loading || !message.trim()
          }
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>
    </div>
  )
}