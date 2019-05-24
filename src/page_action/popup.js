chrome.runtime.getBackgroundPage((window) => {
    var thirdParty = window.getThridParty();
    var threat1 = document.getElementById("threat1");
    threat1.innerHTML = thirdParty[0];
})