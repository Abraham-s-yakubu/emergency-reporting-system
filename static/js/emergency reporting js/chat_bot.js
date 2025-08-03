document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const menuButton = document.getElementById("menu-button");
  const mobileNav = document.getElementById("mobile-nav");
  const closeNavButton = document.getElementById("close-nav-button");
  const chatMessagesContainer = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const loadingSpinner = document.getElementById("loading-spinner");
  const messageBox = document.getElementById("message-box");
  const startNewChatButton = document.getElementById("start-new-chat-button");
  const quickQuestionsContainer = document.getElementById("quick-questions");
  const scrollToBottomButton = document.getElementById(
    "scroll-to-bottom-button"
  );

  let messageBoxTimeout; // For clearing the message box

  // --- Chat History (for Gemini API) ---
  // Initial bot message with disclaimer
  const initialBotMessage =
    "Hello! I'm GuardianLink's emergency chatbot. I can provide general information and advice on emergencies in Nigeria. **Please note: I cannot dispatch emergency services directly. For immediate help, use the 'Emergency Report' feature.** How can I assist you?";
  let chatHistory = []; // Will be populated from localStorage or with initial message

  const quickQuestions = [
    "What is the general emergency number in Nigeria?",
    "How to react during a fire incident?",
    "What should I do in case of a road accident?",
    "What are common flood safety tips in Nigeria?",
    "How can I report a security incident?",
    "What is NEMA and what do they do?",
    "What is FRSC's role in emergencies?",
    "What are the signs of a medical emergency?",
    "How to perform basic first aid for cuts?",
    "What to do during a building collapse?",
    "How to prepare for a natural disaster?",
    "What are the steps for a home evacuation plan?",
    "Where can I find local emergency services contact information?",
    "Tips for staying safe during civil unrest.",
  ];

  // --- Helper Functions ---

  // Function to display temporary messages (reused from main app)
  function showMessage(message, type = "info", duration = 3000) {
    clearTimeout(messageBoxTimeout);
    messageBox.textContent = message;
    messageBox.className = `message-box show ${type}`;

    messageBoxTimeout = setTimeout(() => {
      messageBox.classList.add("hide");
      messageBox.addEventListener("transitionend", function handler() {
        messageBox.classList.remove(
          "show",
          "hide",
          "success",
          "error",
          "warning"
        );
        messageBox.textContent = "";
        messageBox.removeEventListener("transitionend", handler);
      });
    }, duration);
  }

  // Function to format timestamp
  function formatTimestamp(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // Function to add a message to the chat display
  function addMessageToChat(
    content,
    sender,
    isTypingIndicator = false,
    isHtml = false
  ) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    if (isTypingIndicator) {
      messageDiv.id = "typing-indicator-message"; // Assign an ID to easily remove it
    } else {
      const headerDiv = document.createElement("div");
      headerDiv.classList.add("message-header");
      const timestamp = formatTimestamp(new Date());
      headerDiv.textContent = `${
        sender === "user" ? "You" : "Bot"
      } • ${timestamp}`;
      messageDiv.appendChild(headerDiv);
    }

    const bubbleDiv = document.createElement("div");
    bubbleDiv.classList.add("message-bubble");

    if (isTypingIndicator) {
      bubbleDiv.classList.add("typing-indicator");
      bubbleDiv.innerHTML =
        '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    } else {
      if (isHtml) {
        bubbleDiv.innerHTML = content; // Set as HTML
      } else {
        bubbleDiv.textContent = content; // Set as plain text
      }
    }

    messageDiv.appendChild(bubbleDiv);
    chatMessagesContainer.appendChild(messageDiv);

    // Scroll to the bottom of the chat
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  // Function to remove the typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator-message");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Basic Markdown to HTML converter for lists and bold text
  function formatMarkdown(text) {
    let formattedHtml = [];
    const lines = text.split("\n");
    let inUnorderedList = false;
    let inOrderedList = false;

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      // Handle bold: **text**
      let processedLine = trimmedLine.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );

      // Check for unordered list item (Markdown: * item or - item)
      if (processedLine.startsWith("* ") || processedLine.startsWith("- ")) {
        if (!inUnorderedList) {
          if (inOrderedList) {
            formattedHtml.push("</ol>");
            inOrderedList = false;
          }
          formattedHtml.push("<ul>");
          inUnorderedList = true;
        }
        const listItemContent = processedLine.substring(2).trim();
        formattedHtml.push(`<li>${listItemContent}</li>`);
      }
      // Check for ordered list item (Markdown: 1. item, 2. item)
      else if (processedLine.match(/^\d+\.\s/)) {
        if (!inOrderedList) {
          if (inUnorderedList) {
            formattedHtml.push("</ul>");
            inUnorderedList = false;
          }
          formattedHtml.push("<ol>");
          inOrderedList = true;
        }
        const listItemContent = processedLine.replace(/^\d+\.\s/, "").trim();
        formattedHtml.push(`<li>${listItemContent}</li>`);
      }
      // Not a list item, or a paragraph
      else {
        if (inUnorderedList) {
          formattedHtml.push("</ul>");
          inUnorderedList = false;
        }
        if (inOrderedList) {
          formattedHtml.push("</ol>");
          inOrderedList = false;
        }
        if (processedLine !== "") {
          // Avoid empty paragraphs for empty lines
          formattedHtml.push(`<p>${processedLine}</p>`);
        }
      }
    });

    // Close any open lists at the end
    if (inUnorderedList) {
      formattedHtml.push("</ul>");
    }
    if (inOrderedList) {
      formattedHtml.push("</ol>");
    }

    return formattedHtml.join("");
  }

  // Function to save chat history to local storage
  function saveChatHistory() {
    localStorage.setItem(
      "guardianLinkChatHistory",
      JSON.stringify(chatHistory)
    );
  }

  // Function to load chat history from local storage
  function loadChatHistory() {
    const savedHistory = localStorage.getItem("guardianLinkChatHistory");
    if (savedHistory) {
      chatHistory = JSON.parse(savedHistory);
      chatHistory.forEach((msg) => {
        // Re-render messages, applying markdown formatting for bot messages
        if (msg.role === "user") {
          addMessageToChat(msg.parts[0].text, "user");
        } else if (msg.role === "model") {
          addMessageToChat(
            formatMarkdown(msg.parts[0].text),
            "bot",
            false,
            true
          );
        }
      });
    } else {
      // If no history, add the initial bot message
      addMessageToChat(formatMarkdown(initialBotMessage), "bot", false, true);
      chatHistory.push({ role: "model", parts: [{ text: initialBotMessage }] });
      saveChatHistory(); // Save the initial message
    }
  }

  // Function to clear chat history
  function clearChat() {
    chatHistory = [];
    localStorage.removeItem("guardianLinkChatHistory");
    chatMessagesContainer.innerHTML = ""; // Clear display
    addMessageToChat(formatMarkdown(initialBotMessage), "bot", false, true); // Add initial message
    chatHistory.push({ role: "model", parts: [{ text: initialBotMessage }] });
    saveChatHistory(); // Save the new initial message
    showMessage("Chat history cleared. Starting a new conversation.", "info");
  }

  // Function to populate quick question buttons
  function populateQuickQuestions() {
    quickQuestions.forEach((question) => {
      const button = document.createElement("button");
      button.classList.add("quick-question-button");
      button.textContent = question;
      button.addEventListener("click", () => {
        userInput.value = question; // Set the input value
        sendMessageToGemini(); // Send the message
      });
      quickQuestionsContainer.appendChild(button);
    });
  }

  // Function to send message to Gemini API
  async function sendMessageToGemini() {
    const userPrompt = userInput.value.trim();
    if (userPrompt === "") {
      showMessage("Please type a message before sending.", "warning");
      return;
    }

    // Add user message to chat history and display
    addMessageToChat(userPrompt, "user");
    chatHistory.push({ role: "user", parts: [{ text: userPrompt }] });
    saveChatHistory(); // Save history after user message
    userInput.value = ""; // Clear input field

    // Show loading indicator and disable input/button
    sendButton.disabled = true;
    loadingSpinner.classList.add("hidden");
    userInput.placeholder = "Thinking...";

    // Add typing indicator
    addMessageToChat("", "bot", true);

    try {
      const payload = { contents: chatHistory };
      // change this before deploying
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API error: ${response.status} ${response.statusText} - ${
            errorData.error.message || "Unknown API error"
          }`
        );
      }

      const result = await response.json();

      let botResponseText =
        "I'm sorry, I couldn't generate a response at this time. There might be an issue with the AI. Please try again or rephrase your question.";
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        botResponseText = result.candidates[0].content.parts[0].text;
      } else {
        console.warn("Unexpected API response structure:", result);
        botResponseText =
          "I received an unexpected response from the AI. Please try again or ask a different question.";
      }

      // Remove typing indicator before adding the actual response
      removeTypingIndicator();

      // Add bot response to chat history and display
      addMessageToChat(formatMarkdown(botResponseText), "bot", false, true); // Pass true for isHtml
      chatHistory.push({ role: "model", parts: [{ text: botResponseText }] }); // Store original text in history
      saveChatHistory(); // Save history after bot message
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Remove typing indicator even on error
      removeTypingIndicator();
      addMessageToChat(
        `Error: ${error.message}. Please try again or rephrase your question. If the problem persists, please check your internet connection.`,
        "bot"
      );
      showMessage(
        "Failed to get a response from the chatbot. Please check your connection or try again later.",
        "error"
      );
    } finally {
      // Hide loading indicator and re-enable input/button
      sendButton.disabled = false;
      loadingSpinner.classList.add("hidden");
      userInput.placeholder = "Type your message...";
      userInput.focus(); // Keep focus on input
    }
  }

  // --- Event Listeners ---

  // Mobile Navigation Toggle
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      mobileNav.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
    });
  }

  if (closeNavButton && mobileNav) {
    closeNavButton.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  // Start New Chat Button
  if (startNewChatButton) {
    startNewChatButton.addEventListener("click", clearChat);
  }

  // Send message on button click
  sendButton.addEventListener("click", sendMessageToGemini);

  // Send message on Enter key press
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessageToGemini();
    }
  });

  // Scroll to bottom button visibility and click
  chatMessagesContainer.addEventListener("scroll", () => {
    // Show button if not at the bottom
    if (
      chatMessagesContainer.scrollHeight - chatMessagesContainer.scrollTop >
      chatMessagesContainer.clientHeight + 50
    ) {
      // 50px buffer
      scrollToBottomButton.classList.add("show");
    } else {
      scrollToBottomButton.classList.remove("show");
    }
  });

  scrollToBottomButton.addEventListener("click", () => {
    chatMessagesContainer.scrollTo({
      top: chatMessagesContainer.scrollHeight,
      behavior: "smooth",
    });
  });

  // Initial setup
  loadChatHistory(); // Load chat history on page load
  populateQuickQuestions(); // Populate quick question buttons
  userInput.focus(); // Set initial focus on input
});
