document.addEventListener('DOMContentLoaded', () => {
    const generateResponseBtn = document.getElementById('generate-no-context');
    const provideContextBtn = document.getElementById('provice-context-btn');
    const contextContainer = document.getElementById('context-container');
    const noContextContainer = document.getElementById('no-context-container');
    const submitContextBtn = document.getElementById('submit-context-btn');
    const responseCopyCtxtBtn = document.getElementById('copy-response-context');
    const responseCopyBtn = document.getElementById('copy-response');
    const responseCtxtBox = document.getElementById('response-box-ctxt');
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

            if (!response.ok) {
                console.log('Enters the !response.ok')
                throw new Error('Failed to fetch Email Response');
            }

            console.log('Right before attempting to change the value')
            console.log("The response: ",response);
            const data = await response.json();
            console.log("The data: ", data);
            console.log("More accurate version of what is replacing", data.response);

            return data.response;
        }
        catch (err) {
            console.error("Error: ", err);
        }
    }

    async function scrapData() {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    const elements = document.querySelectorAll('.ii.gt p');
                    const data = Array.from(elements).map(el => el.innerHTML.replace(/<[^>]*>?/gm, '').replace(/\n/g, '').trim());
                    const text = data.join(' ');
                    // console.log('Scrapped Data:', text);
                    return text;
                },
            }, (results) => {
                // console.log('Data from content script:', results[0].result);
                scrappedData = results[0].result;
            });
        } catch (err) {
            console.error('Error executing script:', err);
        }
    }

    provideContextBtn?.addEventListener('click', () => {
        contextContainer.style.display = contextContainer.style.display === 'none' ? 'block' : 'none';

        if (noContextContainer.style.display !== 'none') {
            noContextContainer.style.display = 'none';
        }
    });

    generateResponseBtn?.addEventListener('click', async () => {
        noContextContainer.style.display = noContextContainer.style.display === 'none' ? 'block' : 'none';

        if (contextContainer.style.display !== 'none') {
            contextContainer.style.display = 'none';
        }

        if (noContextContainer.style.display == 'block') {
            await scrapData();
            setTimeout(async () => {
                console.log("This is the value of scrapped Data outside the function: ", scrappedData);
                const scrappedEmail = scrappedData;
                const output = await promptCall(scrappedEmail);
                setTimeout(() => {
                    responseBox.value = output;
                }, 2);
            }, 1);
        }

    });

    submitContextBtn?.addEventListener('click', async () => {
        const context = document.getElementById('context-input').value;

        setTimeout(() => {
            responseCtxtBox.value = dataRes.response;
            console.log('Updated context value:', context.value);
        }, 1);

        if (contextContainer.style.display == 'block') {
            await scrapData();
            setTimeout(async () => {
                console.log("This is the value of scrapped Data outside the function: ", scrappedData);
                const scrappedEmail = scrappedData;
                const promptVar = "This is the context I want to tell you before I give you the email: \n" + context + "\n and this here is the email: \n" + scrappedEmail;
                const output = await promptCall(promptVar);
                setTimeout(() => {
                    responseCtxtBox.value = output;
                }, 2);
            }, 1);
        }
    });

    responseCopyCtxtBtn.addEventListener('click', async () => {
        const toCopy = document.getElementById('response-box-ctxt');
        try {
            await navigator.clipboard.writeText(toCopy.value);
            console.log('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
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