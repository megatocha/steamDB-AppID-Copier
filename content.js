// SteamDB App ID Copier Extension
(function() {
    'use strict';

    // Notification bubble queue
    const NOTIFICATION_DURATION = 800; // ms
    const ANIMATION_OUT = 130; // ms

    function getNotificationContainer() {
        let container = document.querySelector('.steamdb-copy-notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'steamdb-copy-notification-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function createNotification(text) {
        const container = getNotificationContainer();
        const notification = document.createElement('div');
        notification.className = 'steamdb-copy-notification';
        notification.innerHTML = `
            <span class="copy-notification-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="10" height="10" rx="2" ry="2"></rect>
                    <rect x="5" y="5" width="10" height="10" rx="2" ry="2" style="opacity:0.5"></rect>
                    <polyline points="15 12 9 12"></polyline>
                </svg>
            </span>
            <span class="copy-notification-text">${text}</span>
        `;
        container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification && notification.parentNode) notification.parentNode.removeChild(notification);
            }, ANIMATION_OUT);
        }, NOTIFICATION_DURATION);

        // Stack notifications below previous (no overlap)
        const notifications = container.querySelectorAll('.steamdb-copy-notification');
        notifications.forEach((n, i) => {
            n.style.marginTop = (i === 0) ? '0px' : '10px';
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            createNotification(`Copied: ${text}`);
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            createNotification(`Copied: ${text}`);
        });
    }

    function createCopyButton(appId) {
        const button = document.createElement('button');
        button.className = 'steamdb-copy-btn';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2" ry="2"></rect>
                <rect x="4" y="4" width="11" height="11" rx="2" ry="2" style="opacity:0.5"></rect>
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

    function handleAppPage() {
        if (document.querySelector('.steamdb-copy-btn.app-page-btn')) return;

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

                        const wrapper = document.createElement('span');
                        wrapper.style.display = 'inline-flex';
                        wrapper.style.alignItems = 'center';
                        wrapper.style.gap = '8px';

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

    function handleChartsPage() {
        const gameRows = document.querySelectorAll('tr[data-appid], tr:has(a[href*="/app/"])');
        gameRows.forEach(row => {
            if (row.querySelector('.steamdb-copy-btn')) return;

            let appId = null;
            if (row.hasAttribute('data-appid')) {
                appId = row.getAttribute('data-appid');
            } else {
                const appLink = row.querySelector('a[href*="/app/"]');
                if (appLink) {
                    const match = appLink.href.match(/\/app\/(\d+)/);
                    if (match) appId = match[1];
                }
            }
            if (appId) {
                const gameNameCell = row.querySelector('td:nth-child(3)');
                if (gameNameCell) {
                    const copyBtn = createCopyButton(appId);
                    copyBtn.classList.add('charts-page-btn');
                    const buttonContainer = document.createElement('div');
                    buttonContainer.className = 'copy-btn-container';
                    buttonContainer.appendChild(copyBtn);
                    gameNameCell.style.position = 'relative';
                    gameNameCell.appendChild(buttonContainer);
                }
            }
        });
    }

    function handleSalesPage() {
        const salesTable = document.querySelector('table');
        if (!salesTable) return;

        const theadRow = salesTable.querySelector('thead tr');
        if (theadRow && !theadRow.querySelector('.copy-header-cell')) {
            const th = document.createElement('th');
            th.className = 'copy-header-cell';
            th.setAttribute('aria-hidden', 'true');
            th.setAttribute('tabindex', '-1');
            th.style.width = '78px';
            th.style.textAlign = 'center';
            th.textContent = '';
            theadRow.appendChild(th);
        }

        const gameRows = salesTable.querySelectorAll('tbody tr');
        gameRows.forEach(row => {
            if (row.querySelector('.copy-cell')) return;

            let appId = row.getAttribute('data-appid');
            if (!appId) {
                const appLink = row.querySelector('a[href*="/app/"]');
                if (appLink) {
                    const match = appLink.href.match(/\/app\/(\d+)/);
                    if (match) appId = match[1];
                }
            }
            if (appId) {
                const td = document.createElement('td');
                td.className = 'copy-cell';
                td.setAttribute('aria-hidden', 'true');
                td.setAttribute('tabindex', '-1');
                td.style.textAlign = 'center';
                td.style.verticalAlign = 'middle';
                td.style.width = '78px';
                const copyBtn = createCopyButton(appId);
                copyBtn.classList.add('sales-page-btn');
                td.appendChild(copyBtn);
                row.appendChild(td);
            }
        });
    }

    function init() {
        const url = window.location.href;

        if (url.includes('/app/')) {
            handleAppPage();
        } else if (url.includes('/charts/')) {
            handleChartsPage();
        } else if (url.includes('/sales/')) {
            handleSalesPage();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-run for AJAX navigation
    const observer = new MutationObserver((mutations) => {
        let shouldReinit = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
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
            setTimeout(init, 100);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();