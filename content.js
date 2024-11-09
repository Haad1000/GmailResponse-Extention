chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'generateResponse') {
        const emailBody = getEmailContent();
        const context = message.context;

        chrome.runtime.sendMessage({ action: 'fetchAIResponse', emailBody, context }, (response) => {
            const aiResponse = response.generatedTest;
            insertPlaceholder(aiResponse);
        });
    }
});

function getEmailContent() {
    const emailContentlement = document.querySelector('div.some-email-body-selector');
    return emailContentElement ? emailContentElement.innerText: '';
}

function insertPlaceholder(text) {
    const composeBox = document.querySelector('div.some-email-body-selector');
    if (composeBox) {
        composeBox.setAttribute('placerholder', text);
    }
}