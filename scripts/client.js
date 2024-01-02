const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const messagesDiv = document.getElementById('messages');

let usernameSet = false;

const socket = new WebSocket('ws://localhost:3000'); // Replace with your server address

socket.addEventListener('open', (event) => {
    console.log('Connected to the server');
    setUsername(); // Set username when connected
});

socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message);
});

function setUsername() {
    if (!usernameSet && usernameInput.value.trim() !== '') {
        const username = usernameInput.value.trim();
        const joinMessage = { username, text: `${username} joined the chat.` };
        socket.send(JSON.stringify(joinMessage));
        displayMessage(joinMessage);
        usernameInput.disabled = true; // Disable the input after setting the username
        usernameSet = true;

        // Trigger sendMessage to send an empty message
        sendMessage();
    }
}

function sendMessage() {
    if (usernameSet) {
        const messageText = messageInput.value.trim();

        if (messageText !== '') {
            const message = { username: usernameInput.value, text: messageText };
            socket.send(JSON.stringify(message));
            displayMessage(message);

            // Clear the input field immediately
            messageInput.value = '';
        }
    } else {
        setUsername();
    }
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';

    if (!message.text.includes('joined the chat')) {
        messageElement.textContent = `${message.username}: ${message.text}`;
        messagesDiv.insertBefore(messageElement, messagesDiv.firstChild);

        // Adjust the display order of regular messages
        const regularMessages = document.querySelectorAll('.message');
        regularMessages.forEach((msg, index) => {
            if (!msg.textContent.includes('joined the chat')) {
                msg.style.order = index;
            }
        });
    } else {
        messageElement.textContent = message.text;
        messageElement.style.color = 'green';
        messagesDiv.insertBefore(messageElement, messagesDiv.firstChild);

        // Remove the announcement after 5 seconds
        setTimeout(() => {
            messagesDiv.removeChild(messageElement);
        }, 5000);
    }

    // Adjust the display order based on flex-direction
    messagesDiv.style.flexDirection = 'column-reverse';

    // Scroll to the bottom of the chat container
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ... existing JavaScript code ...

function toggleMenu() {
    const menuOptions = document.getElementById('menuOptions');
    menuOptions.style.display = (menuOptions.style.display === 'block') ? 'none' : 'block';
}

function refreshChat() {
    messagesDiv.innerHTML = ''; // Clear the messages div
}

function exitChat() {
    // Implement exit chat logic
    window.location.href = './index.html';
}

function deleteMessage() {
    // Implement delete message logic
}
