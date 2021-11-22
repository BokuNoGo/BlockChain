App = {
    contracts:{},
    web3Provider:{},
    votosContracts: {},
    account: {},
    votos: {},
    //inicia la aplicacion
    init: async () => {
        await App.loadEthereum();
        await App.loadAccount();
        await App.loadContracts();
        await App.listContract();
        App.mostrar();
    },
    //carga ethereum
    loadEthereum: async () => {
        if(window.ethereum){
            App.loadAccount();
        }else if(window.web3){
            web3 = new Web3(window.web3.currentProvider);
        }
        else{
            console.log('no tieneuna villertera ethereum');
        }
    },
    mostrar: async () => {
        document.getElementById('wallet_id').innerText = App.account;
    },
    listContract: async () =>{
        let cantidad_votos = await App.votos.counter();
        cantidad_votos = cantidad_votos.toNumber();
        for (let i = 0; i < cantidad_votos ; i++) {
            const voto = await App.votos.votos(i);
            console.log(voto.id.toString());
            console.log(voto.cuenta_id);

        }
    },
    //carga los contratos
    loadContracts: async () => {
        const res = await fetch("VotosContract.json");
        const VotosContractJSON = await res.json();
        //instancia de truffle
        App.contracts.votosContracts = TruffleContract(VotosContractJSON);
        App.contracts.votosContracts.setProvider(App.web3Provider);
        //
        App.votos = await App.contracts.votosContracts.deployed();
    },
    loadAccount: async () => {
        App.web3Provider = window.ethereum;
        const accounts = await App.web3Provider.request({method: 'eth_requestAccounts'})
        App.account = accounts[0]

    },

    votar: async (id, voto) => {
        await App.votos.votar(id, voto, {
            from: App.account
        });
    }
}

App.init();