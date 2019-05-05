chrome.browserAction.setBadgeBackgroundColor({
    color: [206, 58, 58, 255]
})


// Inspired by https://stackoverflow.com/questions/32168449
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    
    if (!message) return
    if (message <= 0) return
    const text = message.toString()
    
    chrome.tabs.get(sender.tab.id, function(tab) {

        // Pre-rendered tab has been nuked
        if (chrome.runtime.lastError) return

        // Tab is visible
        if (tab.index >= 0) {
            chrome.browserAction.setBadgeText({
                tabId: tab.id,
                text: text
            })

            return
        }

        // Invisible pre-rendered tab
        const tabId = sender.tab.id
        chrome.webNavigation.onCommitted.addListener(function update(details) {
            if (details.tabId == tabId) {
                chrome.browserAction.setBadgeText({
                    tabId: tabId,
                    text: text
                })
                
                chrome.webNavigation.onCommitted.removeListener(update)
            }
        })
    })
})
