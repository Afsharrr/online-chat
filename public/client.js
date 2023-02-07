"use strict";

const socket = io();

const colors = [
  "#d6336c",
  "#ae3ec9",
  "#7048e8",
  "#1098ad",
  "#0ca678",
  "#74b816",
  "#f59f00",
];

const usernameColor = colors[Math.abs(Math.round(Math.random() * 7))];
const onlineChatters = document.querySelector(".online-chatters");
const chatForm = document.querySelector(".chatbox");
const messageInput = document.querySelector(".input__message");
const messageUsername = document.querySelector(".message-username");
const chat = document.querySelector(".chat");
const usernameModal = document.querySelector(".username-modal");
const usernameInput = document.querySelector(".input__username");
let username;
socket.on("user joined", (data) => {
  onlineChatters.textContent = data.users;
});

socket.on("user left", (data) => {
  onlineChatters.textContent = data.users;
});

socket.on("new message", (data) => {
  chat.insertAdjacentHTML(
    "beforeend",
    ` <li class="message">
        <p class="message-username">${data.username}</p>
        :
        <p class="message-text">${data.message}</p>
      </li>`
  );
});

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  socket.emit("new message", {
    message: messageInput.value,
    username,
    usernameColor,
  });
});

usernameModal.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!usernameInput.value.trim()) return;

  username = usernameInput.value;
  usernameModal.style.display = "none";
});
