function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "copyText") {
    const ticketTitle = document.querySelector(
      '[data-testid="issue.views.issue-base.foundation.summary.heading"]'
    ).innerText;
    const ticketNumber = request.textToCopy;
    const prefix = "git checkout -b feat/dev/";
    const branchName = `${prefix}${ticketNumber}-${slugify(ticketTitle)}`;

    document.body.focus();

    setTimeout(() => {
      navigator.clipboard.writeText(branchName).then(() => {
        const body = document.body;
        const alert = document.createElement("div");
        alert.classList.add('copy-jira-ticket-alert')
        alert.style.backgroundColor = "#2DA530";
        alert.style.fontSize = "0.85rem";
        alert.style.padding = "0.5rem";
        alert.style.color = "white";
        alert.style.left = "0";
        alert.style.top = "0";
        alert.style.position = "fixed";
        alert.style.zIndex = "99999999";
        alert.style.borderRadius = "8px";

        alert.textContent = `${branchName}`;
        body.appendChild(alert);

        setTimeout(() => {
          body.removeChild(alert);
        }, 5000);
      });
    });
  }
});
