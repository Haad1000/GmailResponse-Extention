document.addEventListener('DOMContentLoaded', () => {
    const generateResponseBtn = document.getElementById('generate-response-btn');
    const provideContextBtn = document.getElementById('provice-context-btn');
    const contextContainer = document.getElementById('context-container');
    const submitContextBtn = document.getElementById('submit-context-btn');

    provideContextBtn?.addEventListener('click', () => {
        contextContainer.style.display = contextContainer.style.display === 'none' ? 'block' : 'none';
    });

    // generateResponseBtn?.addEventListener('click', () => {
    //     chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    //         chrome.tabs.sendMessage(tabs[0].id, { action: 'generateResponse', context: ''});
    //     });
    // });;

    submitContextBtn?.addEventListener('click', () => {
        const context = document.getElementById('context-input');
        chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'generateResponse', context });
        });
    });
})