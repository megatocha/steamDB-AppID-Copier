// SteamDB App ID Copier Extension
(function() {
    'use strict';

    const NOTIFICATION_DURATION = 900; // ms
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

        const notifications = container.querySelectorAll('.steamdb-copy-notification');
        notifications.forEach((n, i) => {
            n.style.marginTop = (i === 0) ? '0px' : '10px';
        });
    }

    async function getHistory() {
        try {
            const result = await browser.storage.local.get('steamdb_copy_history');
            return result.steamdb_copy_history || [];
        } catch {
            return [];
        }
    }

    async function getTotalCopied() {
        try {
            const result = await browser.storage.local.get('steamdb_total_copied');
            return result.steamdb_total_copied || 0;
        } catch {
            return 0;
        }
    }

    async function addToHistory(value) {
        const history = await getHistory();
        const now = new Date();
        const existingIndex = history.findIndex(item => item.value === value);
        
        if (existingIndex !== -1) {
            history[existingIndex].count++;
            history[existingIndex].lastCopied = now.toISOString();
            const item = history.splice(existingIndex, 1)[0];
            history.unshift(item);
        } else {
            history.unshift({
                value: value,
                count: 1,
                firstCopied: now.toISOString(),
                lastCopied: now.toISOString()
            });
        }
        
        const limitedHistory = history.slice(0, 50);
        const totalCopied = await getTotalCopied() + 1;
        
        await browser.storage.local.set({
            'steamdb_copy_history': limitedHistory,
            'steamdb_total_copied': totalCopied
        });
        
        // Send message to popup to update UI
        browser.runtime.sendMessage({
            type: 'STEAMDB_COPY',
            value: value
        }).catch(() => {});
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            createNotification(`Copied: ${text}`);
            addToHistory(text);
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
            createNotification('Failed to copy!');
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
        button.title = `Copy: ${appId}`;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            copyToClipboard(appId);
        });
        return button;
    }

    function handleAppPage() {
        const table = document.querySelector('table');
        if (!table) return;

        const theadRow = table.querySelector('thead tr');
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

        const rows = table.querySelectorAll('tbody tr, tr');
        const processedRows = new Set();
        
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.querySelector('.copy-cell') || processedRows.has(row)) continue;

            const firstCell = row.querySelector('td:first-child');
            const lastCell = row.querySelector('td:last-child');
            
            if (firstCell && lastCell && firstCell !== lastCell) {
                const value = lastCell.textContent.trim();
                if (!value) continue;
                
                let mergedRows = [row];
                let nextRowIndex = i + 1;
                
                while (nextRowIndex < rows.length) {
                    const nextRow = rows[nextRowIndex];
                    const nextLastCell = nextRow.querySelector('td:last-child');
                    
                    if (nextLastCell && nextLastCell.textContent.trim() === value) {
                        mergedRows.push(nextRow);
                        processedRows.add(nextRow);
                        nextRowIndex++;
                    } else {
                        break;
                    }
                }
                
                const td = document.createElement('td');
                td.className = 'copy-cell';
                td.setAttribute('aria-hidden', 'true');
                td.setAttribute('tabindex', '-1');
                td.style.textAlign = 'center';
                td.style.verticalAlign = 'middle';
                td.style.width = '78px';
                
                if (mergedRows.length > 1) {
                    td.rowSpan = mergedRows.length;
                }
                
                const isDateRow = value.includes('UTC') || value.includes('ago') || /\d{2}:\d{2}:\d{2}/.test(value);
                
                const copyBtn = createCopyButton(value);
                copyBtn.classList.add('app-page-btn');
                if (isDateRow) {
                    copyBtn.classList.add('date-row-btn');
                }
                td.appendChild(copyBtn);
                row.appendChild(td);
                
                mergedRows.forEach(r => processedRows.add(r));
            }
        }
    }

    function handleChartsPage() {
        const table = document.querySelector('table');
        if (!table) return;

        const theadRow = table.querySelector('thead tr');
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

        const gameRows = table.querySelectorAll('tbody tr[data-appid], tbody tr:has(a[href*="/app/"])');
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
                copyBtn.classList.add('charts-page-btn');
                td.appendChild(copyBtn);
                row.appendChild(td);
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
        
        // Remove existing copy buttons before re-init
        document.querySelectorAll('.copy-cell').forEach(el => el.remove());

        if (url.includes('/app/')) {
            handleAppPage();
        } else if (url.includes('/charts/')) {
            handleChartsPage();
        } else if (url.includes('/sales/')) {
            handleSalesPage();
        }
    }

    // Initial run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

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