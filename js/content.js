window.onload = function() {
    
    let attributesRemoved = 0
    const anchorElements = document.getElementsByTagName('A')
    
    for (element of anchorElements) {
        if (!element.getAttribute('ping')) continue
            
        // console.log("Removed ping attribute: " + element.getAttribute('ping'))

        element.removeAttribute('ping')
        attributesRemoved += 1
    }
    
    chrome.extension.sendMessage(attributesRemoved)
}
