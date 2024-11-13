document.addEventListener('DOMContentLoaded', () => {
    const generateResponseBtn = document.getElementById('generate-response-btn');
    const provideContextBtn = document.getElementById('provice-context-btn');
    const contextContainer = document.getElementById('context-container');
    const submitContextBtn = document.getElementById('submit-context-btn');
    const responseCopyBtn = document.getElementById('copy-response');

    provideContextBtn?.addEventListener('click', () => {
        contextContainer.style.display = contextContainer.style.display === 'none' ? 'block' : 'none';
    });

    submitContextBtn?.addEventListener('click', () => {
        const context = document.getElementById('context-input');
        resultfromAI = EmailResponseGen(context);
        context.value = resultfromAI
    });

    responseCopyBtn.addEventListener('click', async () => {
        const context = document.getElementById('context-input');
        try {
            // Use the Clipboard API to write the text to the clipboard
            await navigator.clipboard.writeText(context.value);
            console.log('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});