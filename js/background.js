async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function notifyContentScript(selection, tab) {
  chrome.tabs.sendMessage(tab.id, {
    message: "copyText",
    textToCopy: selection,
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "gitbranchname",
    title: "Copy Git branch name to clipboard for ”%s”",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let selection = info.selectionText;

  switch (info.menuItemId) {
    case "gitbranchname":
      notifyContentScript(selection, tab);
      break;
    default:
      break;
  }
});
