document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("settings-form");
  const button = document.getElementById("settings-button");

  const settings = await chrome.storage.sync.get(["prompt"]);

  form.elements.model.value = String(settings.model || "gpt-4o");
  form.elements.prompt.value = String(settings.prompt || "");

  form.onsubmit = async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    await chrome.storage.sync.set(data);

    const prevText = button.innerText;

    button.innerText = "Done";

    setTimeout(() => {
      button.innerText = prevText;
    }, 2000);
  };
});
