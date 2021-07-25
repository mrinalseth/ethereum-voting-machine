import web3 from './web3'
import ElectionFactory from './build/ElectionFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(ElectionFactory.interface),
    '0xAe6224Ff5f68B2ad1D5FfE3F8c3E4dA58F345713'
)

export default instance