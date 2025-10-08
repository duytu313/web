/* ================= Chat Widget ================= */
const chatWidget = document.getElementById("chat-widget");
const chatToggle = document.getElementById("chat-toggle");
chatToggle.addEventListener("click", () => {
  chatWidget.style.display =
    chatWidget.style.display === "flex" ? "none" : "flex";
});

const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatMessages = document.getElementById("chat-messages");

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage(text, "user");
  chatInput.value = "";
  setTimeout(() => {
    appendMessage("Cảm ơn bạn, chúng tôi sẽ phản hồi sớm!", "bot");
  }, 500);
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") chatSend.click();
});
