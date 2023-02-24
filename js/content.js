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
      '[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
    ).innerText;
    const ticketNumber = request.textToCopy;
    const branchName = `${ticketNumber}-${slugify(ticketTitle)}`;

    setTimeout(() => {
      navigator.clipboard.writeText(branchName).then(() => {
        console.log("Copied the branch name " + branchName + " to clipboard");
      });
    });
  }
});
