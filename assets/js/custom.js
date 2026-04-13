window.addEventListener('load', function() {
    // Give it a 1-second delay to ensure the GitHub script has injected the HTML
    setTimeout(() => {
        const gistWrappers = document.querySelectorAll('.gist-wrapper');

        if(gistWrappers.length === 0) {
            console.log("No Gists found on this page.");
            return;
        }

        gistWrappers.forEach(wrapper => {
            // Prevent duplicating buttons if the script runs twice
            if(wrapper.querySelector('.gist-copy-btn')) return;

            const copyBtn = document.createElement('button');
            copyBtn.className = 'gist-copy-btn';
            copyBtn.innerText = 'Copy';

            copyBtn.addEventListener('click', async () => {
                const codeCells = wrapper.querySelectorAll('.blob-code');
                const codeText = Array.from(codeCells)
                                      .map(cell => cell.textContent)
                                      .join('\n');

                try {
                    await navigator.clipboard.writeText(codeText);
                    copyBtn.innerText = 'Copied!';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.innerText = 'Copy';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Error copying text: ', err);
                }
            });

            wrapper.appendChild(copyBtn);
        });
    }, 1000);
});