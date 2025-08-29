// SteamDB App ID Copier - Updated Popup Script

class PopupManager {
    constructor() {
        this.historyData = [];
        this.totalCopied = 0;
        this.MESSAGE_DISPLAY_TIME = 900;
        this.init();
    }

    async init() {
        await this.loadManifestVersion();
        await this.loadHistoryData();
        this.setupEventListeners();
        this.updateUI();
    }

    async loadManifestVersion() {
        try {
            const manifest = browser.runtime.getManifest();
            document.getElementById('version-display').textContent = `v${manifest.version}`;
        } catch (error) {
            console.error('Failed to load manifest version:', error);
        }
    }

    async loadHistoryData() {
        try {
            const stored = await browser.storage.local.get(['steamdb_copy_history', 'steamdb_total_copied']);
            
            if (stored.steamdb_copy_history) {
                this.historyData = stored.steamdb_copy_history;
            }
            
            if (stored.steamdb_total_copied) {
                this.totalCopied = stored.steamdb_total_copied;
            }
        } catch (error) {
            console.error('Failed to load history data:', error);
            this.historyData = [];
            this.totalCopied = 0;
        }
    }

    async saveHistoryData() {
        try {
            await browser.storage.local.set({
                'steamdb_copy_history': this.historyData,
                'steamdb_total_copied': this.totalCopied
            });
        } catch (error) {
            console.error('Failed to save history data:', error);
        }
    }

    addToHistory(value) {
        const now = new Date();
        const existingIndex = this.historyData.findIndex(item => item.value === value);
        
        if (existingIndex !== -1) {
            // Update existing item
            this.historyData[existingIndex].count++;
            this.historyData[existingIndex].lastCopied = now.toISOString();
            // Move to top
            const item = this.historyData.splice(existingIndex, 1)[0];
            this.historyData.unshift(item);
        } else {
            // Add new item
            this.historyData.unshift({
                value: value,
                count: 1,
                firstCopied: now.toISOString(),
                lastCopied: now.toISOString()
            });
        }
        
        // Keep only last 50 items
        this.historyData = this.historyData.slice(0, 50);
        this.totalCopied++;
        
        this.saveHistoryData();
        this.updateUI();
    }

    getUniqueItemsCount() {
        return this.historyData.length;
    }

    formatTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        
        return date.toLocaleDateString();
    }

    createHistoryItemElement(item) {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        div.innerHTML = `
            <div class="history-item-content">
                <div class="history-item-value">${this.escapeHtml(item.value)}</div>
                <div class="history-item-time">${this.formatTimeAgo(item.lastCopied)}</div>
            </div>
            <div class="history-item-actions">
                <div class="history-item-circle">
                    ×${item.count}
                </div>
                <span class="copy-hint">Click to copy</span>
            </div>
        `;
        
        div.addEventListener('click', async () => {
            await this.copyToClipboard(item.value);
            this.showNotification('Copied!');
        });
        
        return div;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    }
    
    showNotification(message) {
        const container = document.getElementById('notification-container');
        if (!container) return;

        // Create a new notification element
        const notification = document.createElement('div');
        notification.className = 'steamdb-copy-notification';

        // Add icon and text content
        notification.innerHTML = `
            <div class="copy-notification-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <div class="copy-notification-text">${this.escapeHtml(message)}</div>
        `;

        // Append to the container
        container.appendChild(notification);
        
        // Show the notification with a slight delay
        setTimeout(() => notification.classList.add('show'), 10);

        // Hide the notification after a delay
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            notification.addEventListener('animationend', () => notification.remove(), { once: true });
        }, this.MESSAGE_DISPLAY_TIME);
    }

    updateUI() {
        document.getElementById('total-copied').textContent = this.totalCopied;
        document.getElementById('unique-copied').textContent = this.getUniqueItemsCount();
        
        const historyList = document.getElementById('history-list');
        
        if (this.historyData.length === 0) {
            historyList.innerHTML = `
                <div class="history-empty">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="11" height="11" rx="2" ry="2"></rect>
                        <rect x="4" y="4" width="11" height="11" rx="2" ry="2" style="opacity:0.5"></rect>
                    </svg>
                    <p>No items copied yet</p>
                    <small>Start copying App IDs and values from SteamDB pages</small>
                </div>
            `;
        } else {
            historyList.innerHTML = '';
            this.historyData.forEach(item => {
                historyList.appendChild(this.createHistoryItemElement(item));
            });
        }
        
        const clearBtn = document.getElementById('clear-history');
        clearBtn.disabled = this.historyData.length === 0;
    }

    async clearHistory() {
        this.historyData = [];
        this.totalCopied = 0;
        await this.saveHistoryData();
        this.updateUI();
    }

    setupEventListeners() {
        document.getElementById('clear-history').addEventListener('click', () => {
            if (confirm('Clear all copy history?')) {
                this.clearHistory();
            }
        });
        
        // This listener will now handle messages from the background script
        browser.runtime.onMessage.addListener((request) => {
            if (request.type === 'STEAMDB_COPY') {
                this.addToHistory(request.value);
                this.showNotification('Copied!'); 
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const popupManager = new PopupManager();
});