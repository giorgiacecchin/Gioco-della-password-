import './style.css' // importa il file CSS per lo stile della pagina

const psw = "51379"; // password corretta salvata come stringa (per confrontare cifra per cifra)
const divApp = document.getElementById("app"); // prende il div principale dall'HTML

const title = document.createElement("h1");
title.textContent = "Indovina la Password";
divApp?.appendChild(title);
createUserInputPassword(); // chiama la funzione che crea input e bottone

function createUserInputPassword() {
  const inputPassword = document.createElement("input"); // crea un campo input
  inputPassword.type = "password"; // tipo password (i numeri vengono nascosti)
  inputPassword.id = "password"; // assegna un id all'input
  inputPassword.placeholder = "Inserisci la password"; // testo dentro l'input
  inputPassword.maxLength = 5; // limita l'input a massimo 5 caratteri

  // blocco solo numeri
  inputPassword.addEventListener("input", (e) => {
    let value = (e.target as HTMLInputElement).value; // prende il valore inserito dall'utente
    value = value.replace(/\D/g, ""); // rimuove tutti i caratteri NON numerici
    (e.target as HTMLInputElement).value = value; // aggiorna l'input con solo numeri
  });

  // bottone
  const button = document.createElement("button"); // crea un bottone
  button.textContent = "Invia"; // testo del bottone

  button.addEventListener("click", () => { // evento al click del bottone
    const inputValue = inputPassword.value; // prende il valore inserito

    if (!verifyPswLength(inputValue)) { // controlla se la lunghezza NON è 5
      showMessage("Inserisci 5 numeri!"); // mostra messaggio di errore
      return; // interrompe il codice
    }

    if (verifyPswCorrect(inputValue)) { // controlla se la password è corretta
      showMessage("Password corretta!"); // messaggio di successo
    } else {
      const correctNumbers = countCorrectNumbers(inputValue); // conta numeri corretti
      showMessage(`Numeri corretti: ${correctNumbers}`); // mostra quanti sono corretti
    }
  });

  // aggiunge input e bottone alla pagina HTML
  divApp?.appendChild(inputPassword);
  divApp?.appendChild(button);
}

// FUNZIONI

function verifyPswLength(input: string): boolean {
  return input.length === 5; // ritorna true se la lunghezza è 5, altrimenti false
}

function verifyPswCorrect(input: string): boolean {
  return input === psw; // confronta input con la password corretta
}

function countCorrectNumbers(input: string): number {
  let count = 0; // contatore dei numeri corretti

  for (let i = 0; i < psw.length; i++) { // ciclo su ogni posizione (0-4)
    if (input[i] === psw[i]) { // confronta cifra per cifra
      count++; // aumenta il contatore se sono uguali
    }
  }

  return count; // restituisce il numero di cifre corrette
}

function showMessage(message: string) {
  let msg = document.getElementById("message"); // cerca se esiste già un messaggio

  if (!msg) { // se NON esiste
    msg = document.createElement("p"); // crea un paragrafo
    msg.id = "message"; // assegna id
    divApp?.appendChild(msg); // lo aggiunge alla pagina
  }

  msg.textContent = message; // aggiorna il testo del messaggio
}