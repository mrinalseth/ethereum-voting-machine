import web3 from '../ethereum/web3'
import Election from './build/Election.json'

const election = (address) => {
    return new web3.eth.Contract(
        JSON.parse(Election.interface),
        address
    )
}

export default election