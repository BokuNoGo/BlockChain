const data = document.querySelector('#formProof');
console.log(App.account);
data.addEventListener("submit", e =>{
    e.preventDefault();
    App.votar(App.account, data["voto"].value);
})