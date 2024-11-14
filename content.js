chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchEmailContent') {
        const emailContent = getEmailContent();
        sendResponse({ content: emailContent }); // Always send a response
        return true; // Indicate an asynchronous response
    }
});

// Helper function to get the email body content
function getEmailContent() {
    const emailBody = document.querySelector('.gs');
    return emailBody ? emailBody.innerText : 'No email content found';
}
