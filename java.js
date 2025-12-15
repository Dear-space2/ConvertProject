const currencies = document.querySelectorAll(".currency");

const fromList = document.querySelector(".from-currencies");
const toList = document.querySelector(".to-currencies");

const fromInput = document.querySelector(".from-input");
const toInput = document.querySelector(".to-input");

const fromRate = document.querySelector(".from-rate");
const toRate = document.querySelector(".to-rate");

let fromCurrency = fromList.querySelector(".active").textContent;
let toCurrency = toList.querySelector(".active").textContent;

const API_KEY = "997195a7ed64005eed607414ab302e36";

function getRates(from, to) {
    fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=1&access_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            fromRate.textContent = `1 ${from} = ${data.result.toFixed(4)} ${to}`;
            toRate.textContent = `1 ${to} = ${(1 / data.result).toFixed(4)} ${from}`;
        });
}

function convertFrom() {
    if (!fromInput.value) {
        toInput.value = "";
        return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${fromInput.value}&access_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            toInput.value = data.result.toFixed(4);
        });
}

function convertTo() {
    if (!toInput.value) {
        fromInput.value = "";
        return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${toCurrency}&to=${fromCurrency}&amount=${toInput.value}&access_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            fromInput.value = data.result.toFixed(4);
        });
}

currencies.forEach(item => {
    item.addEventListener("click", () => {
        const group = item.parentElement;
        group.querySelectorAll(".currency").forEach(c => c.classList.remove("active"));
        item.classList.add("active");

        fromCurrency = fromList.querySelector(".active").textContent;
        toCurrency = toList.querySelector(".active").textContent;

        getRates(fromCurrency, toCurrency);
        convertFrom();
    });
});

fromInput.addEventListener("input", convertFrom);
toInput.addEventListener("input", convertTo);

getRates(fromCurrency, toCurrency);
