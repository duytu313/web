/* ================= Help Chat ================= */
const helpWidget = document.getElementById("help-widget");
const helpToggle = document.getElementById("help-toggle");
const helpChat = document.getElementById("help-chat");
const helpInput = document.getElementById("help-input");
const helpSend = document.getElementById("help-send");
const helpMessages = document.getElementById("help-messages");

helpToggle.addEventListener("click", () => {
  helpChat.style.display = helpChat.style.display === "flex" ? "none" : "flex";
  helpChat.style.flexDirection = "column";
});

function appendHelpMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  helpMessages.appendChild(msg);
  helpMessages.scrollTop = helpMessages.scrollHeight;
}

helpSend.addEventListener("click", () => {
  const text = helpInput.value.trim();
  if (!text) return;
  appendHelpMessage(text, "user");
  helpInput.value = "";
  setTimeout(() => {
    appendHelpMessage("Cảm ơn bạn! Hỗ trợ sẽ phản hồi sớm.", "bot");
  }, 500);
});

helpInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") helpSend.click();
});
