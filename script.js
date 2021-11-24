const typingField = document.querySelector("input");
const para = document.querySelector("p").innerText;

let pararray = para.split(" ");

async function typingStart() {
    let promise = new Promise((resolve, reject) => {
        var timerbool = false;
        typingField.addEventListener("keydown", () => {
            if(timerbool == false) {
                timer();
                timerbool = true;
            }
            setTimeout(() => {
                typingField.disabled = "true";
                resolve("done");
            }, 30000)
        })
    })
    
    let end = await promise;

    afterTyping();
}

function timer() {
    const timerelement = document.querySelector(".timer");
    var sec = 30;
    var timer = setInterval(() => {
        timerelement.innerHTML = "00:" + sec;
        sec--;
        if(sec < 0) {
            clearInterval(timer)
        }
    }, 1000)
}

function afterTyping() {
    console.log("ok")
    let numberofwords = 0;
    let words = typingField.value.split(" ");
    var accuracy_test = pararray.slice(0, words.length);
    for(let i = 0; i < words.length; i++) {
        if(words[i] == accuracy_test[i]) {
            numberofwords++;
        }
    }
    const result = document.querySelector(".result");
    const accuracy = document.querySelector(".accuracy");
    result.innerHTML = "Your typing speed is " + String(numberofwords * 2) + " WPM";
    accuracy.innerHTML = "Accuracy: " + String(Math.floor(numberofwords/words.length * 100)) + "%";
}


typingStart();