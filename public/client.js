"use strict";

const socket = io();

const onlineChatters = document.querySelector(".online-chatters");

socket.on("user joined", (data) => {
  onlineChatters.textContent = data.users;
});

socket.on("user left", (data) => {
  onlineChatters.textContent = data.users;
});
