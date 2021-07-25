const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./build/ElectionFactory.json')

const provider = new HDWalletProvider(
    'bike student capable pair please meat person rookie tilt identify mass artefact',
    'https://rinkeby.infura.io/v3/e2d7fe2772d442c0aeca9420622619e7'
)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log("attempting to deploy")
    console.log(accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
    })
    .send({
        gas: '1000000',
        from: accounts[0]
    })
    console.log(result.options.address)
}

deploy()