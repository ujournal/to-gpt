document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("settings-form");

  const settings = await chrome.storage.sync.get(["prompt"]);

  form.elements.prompt.value = settings.prompt || "";

  form.onsubmit = async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    await chrome.storage.sync.set(data);

    alert("Saved!");
  };
});
