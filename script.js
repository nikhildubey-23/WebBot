document.getElementById('send-button').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    const answerType = document.querySelector('input[name="answer-type"]:checked').value; // Get the selected answer type

    if (message) {
        // Append the user's message to the chat box
        appendMessage('You', message);
        userInput.value = ''; // Clear the input field

        // Send the question to the backend
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: message, answer_type: answerType }),
        });

        // Check if the response is OK
        if (response.ok) {
            const data = await response.json();
            appendMessage('Chatbot', data.answer); // Append the chatbot's response
        } else {
            appendMessage('Chatbot', 'Error: Unable to get a response.'); // Handle errors
        }
    }
});

// Function to append messages to the chat box
function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'my-2 p-2 rounded-lg ' + (sender === 'You' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}