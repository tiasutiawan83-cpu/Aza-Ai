const chat = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("input");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(message) {
  if (!message.trim()) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("Aza sedang berpikir...", "bot");
  const thinking = chat.lastElementChild;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message})
    });

    const data = await res.json();
    thinking.remove();

    if (!res.ok) throw new Error(data.error || "Terjadi kesalahan.");

    addMessage(data.reply, "bot");
  } catch (err) {
    thinking.remove();
    addMessage("Maaf, terjadi kesalahan: " + err.message, "bot");
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll(".quick button").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.q);
  });
});
