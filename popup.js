document.addEventListener('DOMContentLoaded', () => {
    const generateResponseBtn = document.getElementById('generate-no-context');
    const provideContextBtn = document.getElementById('provice-context-btn');
    const contextContainer = document.getElementById('context-container');
    const submitContextBtn = document.getElementById('submit-context-btn');
    const responseCopyBtn = document.getElementById('copy-response');
    const responseBox = document.getElementById('response-box');

    let scrappedData = '';

    async function promptCall(context) {
        try {
            const response = await fetch('http://localhost:3000/airesponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ context })
            });

            console.log('Before entering !response.ok')

            if (!response.ok) {
                console.log('Enters the !response.ok')
                throw new Error('Failed to fetch Email Response');
            }

            console.log('Right before attempting to change the value')
            console.log("The response: ",response);
            const data = await response.json();
            console.log("The data: ", data);
            console.log("More accurate version of what is replacing", data.response);

            setTimeout(() => {
                responseBox.value = data.response;
                console.log('Updated context value:', context.value);
            }, 0);
        }
        catch (err) {
            console.error("Error: ", err);
        }
    }

    provideContextBtn?.addEventListener('click', () => {
        contextContainer.style.display = contextContainer.style.display === 'none' ? 'block' : 'none';
    });

    generateResponseBtn?.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    const elements = document.querySelectorAll('.ii.gt p');
                    const data = Array.from(elements).map(el => el.innerHTML.replace(/<[^>]*>?/gm, '').replace(/\n/g, '').trim());
                    const text = data.join(' ');
                    console.log('Scrapped Data:', text);
                    return data;
                },
            }, (results) => {
                console.log('Data from content script:', results[0].result);
            });
        } catch (err) {
            console.error('Error executing script:', err);
        }
    });

    submitContextBtn?.addEventListener('click', async () => {
        const context = document.getElementById('context-input').value;

        promptCall(context);
    });

    responseCopyBtn.addEventListener('click', async () => {
        const toCopy = document.getElementById('response-box');
        try {
            await navigator.clipboard.writeText(toCopy.value);
            console.log('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});