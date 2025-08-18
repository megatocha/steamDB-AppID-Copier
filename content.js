// SteamDB App ID Copier Extension
(function() {
    'use strict';

    // Create a notification element for copy feedback
    function createNotification(text) {
        const notification = document.createElement('div');
        notification.className = 'steamdb-copy-notification';
        notification.textContent = text;
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    }

    // Copy text to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            createNotification(`Copied: ${text}`);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            createNotification(`Copied: ${text}`);
        });
    }

    // Create a copy button
    function createCopyButton(appId) {
        const button = document.createElement('button');
        button.className = 'steamdb-copy-btn';
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5 15-4-4c0-1.1.9-2 2-2h2"></path>
                <path d="M5 9v6c0 1.1.9 2 2 2h2"></path>
            </svg>
            <span class="copy-text">Copy</span>
        `;
        button.title = `Copy App ID: ${appId}`;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            copyToClipboard(appId);
        });
        return button;
    }

    // Handle individual app pages (like /app/250900)
    function handleAppPage() {
        // Skip if button already exists
        if (document.querySelector('.steamdb-copy-btn.app-page-btn')) return;
        
        // Look for the App ID in the table
        const tables = document.querySelectorAll('table');
        for (const table of tables) {
            const rows = table.querySelectorAll('tr');
            for (const row of rows) {
                const firstCell = row.querySelector('td:first-child');
                if (firstCell && firstCell.textContent.trim() === 'App ID') {
                    const appIdCell = row.querySelector('td:last-child');
                    if (appIdCell && !appIdCell.querySelector('.steamdb-copy-btn')) {
                        const appId = appIdCell.textContent.trim();
                        const copyBtn = createCopyButton(appId);
                        copyBtn.classList.add('app-page-btn');
                        
                        // Create a wrapper to keep the button on the same line
                        const wrapper = document.createElement('span');
                        wrapper.style.display = 'inline-flex';
                        wrapper.style.alignItems = 'center';
                        wrapper.style.gap = '8px';
                        
                        // Move the text content to the wrapper and add the button
                        wrapper.innerHTML = appId;
                        appIdCell.innerHTML = '';
                        appIdCell.appendChild(wrapper);
                        wrapper.appendChild(copyBtn);
                    }
                    return;
                }
            }
        }
    }

    // Handle charts page
    function handleChartsPage() {
        // Look for table rows with game data
        const gameRows = document.querySelectorAll('tr[data-appid], tr:has(a[href*="/app/"])');
        
        gameRows.forEach(row => {
            // Skip if button already exists
            if (row.querySelector('.steamdb-copy-btn')) return;
            
            let appId = null;
            
            // Try to get app ID from data attribute
            if (row.hasAttribute('data-appid')) {
                appId = row.getAttribute('data-appid');
            } else {
                // Try to extract from link href
                const appLink = row.querySelector('a[href*="/app/"]');
                if (appLink) {
                    const match = appLink.href.match(/\/app\/(\d+)/);
                    if (match) {
                        appId = match[1];
                    }
                }
            }
            
            if (appId) {
                // Find the game name cell to add the button next to it
                const gameNameCell = row.querySelector('td:nth-child(3)'); // Name column is typically 3rd
                if (gameNameCell) {
                    const copyBtn = createCopyButton(appId);
                    copyBtn.classList.add('charts-page-btn');
                    
                    // Create a container for the button positioned outside the table flow
                    const buttonContainer = document.createElement('div');
                    buttonContainer.className = 'copy-btn-container';
                    buttonContainer.appendChild(copyBtn);
                    gameNameCell.style.position = 'relative';
                    gameNameCell.appendChild(buttonContainer);
                }
            }
        });
    }

    // Initialize the extension
    function init() {
        const url = window.location.href;
        
        if (url.includes('/app/')) {
            handleAppPage();
        } else if (url.includes('/charts/')) {
            handleChartsPage();
        }
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle dynamic content updates (for AJAX navigation)
    const observer = new MutationObserver((mutations) => {
        let shouldReinit = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if new content was added that might contain app IDs
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.querySelector('tr') || node.tagName === 'TR') {
                            shouldReinit = true;
                            break;
                        }
                    }
                }
            }
        });
        
        if (shouldReinit) {
            setTimeout(init, 100); // Small delay to ensure content is fully loaded
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();