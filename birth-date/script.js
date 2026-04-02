const valA = document.getElementById("inputA");
const valB = document.getElementById("inputB");
const valC = document.getElementById("inputC");
const output = document.getElementById("total-output");
const humanDate = document.getElementById("human-date");
const saveBtn = document.getElementById("db-save");

let randomModifier = 0;

function calcularCaos() {
  const b = Number(valB.value);
  const c = Number(valC.value);

  // C reduz o limite de A para forcar perda de progresso.
  const newMax = Math.max(1, 1000000 - (c * 50));
  valA.max = String(newMax);

  if (Number(valA.value) > newMax) {
    valA.value = String(newMax);
  }

  const effectiveA = Number(valA.value);
  const timestamp = (effectiveA * b) - (c ** 2) + randomModifier;

  output.innerText = String(timestamp);
  humanDate.innerText = new Date(timestamp * 1000).toLocaleDateString("pt-BR");

  if (timestamp > Date.now() / 1000) {
    output.style.color = "red";
  } else {
    output.style.color = "#0f0";
  }
}

[valA, valB, valC].forEach((slider) => {
  slider.addEventListener("input", calcularCaos);
});

saveBtn.addEventListener("click", () => {
  const request = indexedDB.open("SystemFailure", 1);

  request.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (!db.objectStoreNames.contains("logs")) {
      db.createObjectStore("logs", { keyPath: "id", autoIncrement: true });
    }
  };

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction("logs", "readwrite");
    const store = transaction.objectStore("logs");

    const registro = {
      timestamp: output.innerText,
      formula: `(${valA.value} * ${valB.value}) - ${valC.value}^2 + (${randomModifier})`,
      data_final: humanDate.innerText,
      tentativa: new Date().toISOString()
    };

    store.add(registro);

    transaction.oncomplete = () => {
      alert(`Dados salvos. Mas voce tem certeza que nasceu em ${humanDate.innerText}?`);
      db.close();
    };
  };
});

// Maldade extra: a cada 500ms o valor recebe +1 ou -1 aleatorio.
setInterval(() => {
  randomModifier += Math.random() < 0.5 ? -1 : 1;
  calcularCaos();
}, 500);

calcularCaos();
