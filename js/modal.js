let btnOpen = document.querySelector("#send");
let box = document.querySelector(".box")
let body = document.querySelector("body")
let popup = document.querySelector(".popup")
let close = document.querySelector(".close");
let input = document.querySelector("#email")
let copy = document.querySelector("#copy")
var copyText = document.getElementById("video-url");


// document.addEventListener('DOMContentLoaded', function() {
    
// })

btnOpen.addEventListener("click", () => {
    var getText = copyText.value
    btnOpen.setAttribute('href', `mailto:${input.value}?subject=Please%20Watch&body=${getText}`)

    if (input.value.includes("@") && input.value.includes(".")) {
        box.style.display = "block";
        body.style.overflow = "hidden";
        popup.style.backgrounColor = "#22222270"
    } else {
        alert("Please enter a valid email")
        
    }
})

copy.addEventListener("click", () => {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied text to clipboard ;)");
})



close.addEventListener("click", () => {
    box.style.display = "none";
    body.style.overflow = "auto";
    popup.style.backgrounColor = "transparent"
})

