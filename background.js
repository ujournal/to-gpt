const DEFAULT_PROMPT = `Express what you see on the page:`;

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: "send-to-gpt",
  title: "Send to ChatGPT with Prompt",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId == "send-to-gpt") {
    const settings = await chrome.storage.sync.get("prompt");

    const params = new URLSearchParams({
      q: `${settings.prompt || DEFAULT_PROMPT} ${tab.url}`,
    });

    const url = `https://chatgpt.com/?${params}`;

    chrome.tabs.create({ url });
  }
});
