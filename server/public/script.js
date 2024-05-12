// server/public/script.js

const socket = io("/");

// Function to add a message to the chat window
function addMessageToChat(message) {
  const messagesContainer = document.getElementById("messages-container");
  const messageElement = document.createElement("li");
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to handle sending messages
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("message", message);
    addMessageToChat(`You: ${message}`);
    messageInput.value = "";
  }
}

// Event listener for message input
document.getElementById("send-button").addEventListener("click", sendMessage);

// Event listener for receiving messages
socket.on("createMessage", (message) => {
  addMessageToChat(message);
});
