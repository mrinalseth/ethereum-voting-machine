import web3 from './web3'
import ElectionFactory from './build/ElectionFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(ElectionFactory.interface),
    '0x965c5012A0D37c864b2c573db156D11e94E07fC6'
)

export default instance