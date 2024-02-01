let decryptedArea = document.getElementById("decryptedArea");
let copyBtn = document.getElementById("copyBtn");
let decryptContainer = document.getElementById("decryptContainer");
let textToEncrypt = document.getElementById("textToEncrypt")
let encryptBtn = document.getElementById("encrypt");
let decryptBtn = document.getElementById("decrypt");
let pasteBtn = document.getElementById("pasteBtn");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let warmMessage = document.getElementById("warmMessage");

const codes = [["e", "enter"], ["i" , "imes"], ["a" , "ai"], ["o" , "ober"], ["u" , "ufat"]];

textToEncrypt.addEventListener('input', () => { 
    if (textToEncrypt.value.length > 0) {
        encryptBtn.removeAttribute('disabled');
        decryptBtn.removeAttribute('disabled');
    }
    else {
        encryptBtn.setAttribute('disabled', '');
        decryptBtn.setAttribute('disabled', '');
    }
});

function encryptText() {
    let textToEncryptLowerCase = textToEncrypt.value.toLowerCase();
    if(/^[^áéíóúàèìòùäëïöüãõâêôîû|\d]+$/.test(textToEncryptLowerCase)) {
        
        switchElementsForDecryptZone();

        converting(codes, textToEncryptLowerCase, 0, 1);
    }
     else {
        validation("¡Números y acentos no son permitidos!. Inténtalo de nuevo.", 0);
    }
}

function decryptText() {
    if(textToEncrypt) {

        switchElementsForDecryptZone();

        converting(codes, textToEncrypt.value, 1, 0);
    } else {
        validation("Intenta encriptando el texto.", 0);
    }
}

function switchElementsForDecryptZone() {
    decryptedArea.classList.remove("hide");
    copyBtn.classList.remove("hide");
    decryptContainer.classList.replace("d-flex","hide");
}

async function copyDecryptText() {
    pasteBtn.classList.replace("hide", "pasteEffect");
    decryptedArea.classList.add("hide");
    decryptContainer.classList.replace("hide","d-flex");
    copyBtn.classList.add("hide");
     
   try {
    await navigator.clipboard.writeText(decryptedArea.textContent);

   } catch(error) {
        validation("Error al copiar", error);
   }

}

async function pasteDecryptText() {
    pasteBtn.classList.replace("pasteEffect", "hide");

    try {
        let textCopied = await navigator.clipboard.readText(); 
        textToEncrypt.value = textCopied;
        encryptBtn.removeAttribute('disabled');
        decryptBtn.removeAttribute('disabled');
    } catch(error) {
        validation("Error al pegar", 0);
    }
}


function converting(codes, entry, x, y) {
    let newWord = entry;

    codes.forEach(i => {
        if(newWord.includes(i[x])){
            newWord = newWord.replace(i[x], i[y]);
        }
    })
    newWord === entry ? validation("Ups! Parece que ya está desencriptado. Intenta encriptar", 500) : null;
    decryptedArea.innerHTML = newWord;
}

function validation(message, time) {
    warmMessage.innerHTML = message;
    setTimeout(() => {
        modal.style.display = "block";
    }, time);
    
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}