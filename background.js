const DEFAULT_PROMPT =
  "Summarize information (1 paragraph and list of theses) from the news:";
const DEFAULT_MODEL = "gpt-4o";

chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: "send-to-gpt",
  title: "Send to ChatGPT with Prompt",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId == "send-to-gpt") {
    const settings = await chrome.storage.sync.get("prompt");
    const prompt = settings.prompt || DEFAULT_PROMPT;
    const model = settings.model || DEFAULT_MODEL;

    const params = new URLSearchParams({
      q: `${prompt} ${tab.url}`,
      model,
    });

    const url = `https://chatgpt.com/?${params}`;

    chrome.tabs.create({ url });
  }
});
