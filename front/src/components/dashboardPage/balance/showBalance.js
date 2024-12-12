import './balance.css'
import formatBalance from '../../../utils/formatBalance.js'

const ShowBalance = ({ balance }) => {
    return <section className='BalanceHeaderContainer'>
        <h2 className='BalanceHeader'>
            Your Balance: {formatBalance(balance.toFixed(2))}
        </h2>
    </section>
}

export default ShowBalance;