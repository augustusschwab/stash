import { useState } from 'react';
import DashboardCardComponent from "../components/DashboardCard";
import type { DashboardCard } from "../components/DashboardCard";


export default function Dashboard() {
    const [cards, setCards] = useState<DashboardCard[]>([
        {title: "Cash", value: 0},
        {title: "Debt", value: 0},
        {title: "Health Savings", value: 0},
        {title: "Retirement Savings", value: 0},
        {title: "Crypto", value: 0},
        {title: "Investment", value: 0},
    ])

    const [financeItem, setFinanceItem] = useState('')
    const [dollarValue, setDollarValue] = useState(0);
    

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(cards);
        const updatedCards = cards.map(card => 
            card.title === financeItem ? { ...card, value: dollarValue } : card
        )

        setCards(updatedCards);
    }

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}> 
                <label>
                    Select Financial Component: {' '}
                    <select value={financeItem} onChange={e => setFinanceItem(e.target.value)}>
                        {cards.map((contents: DashboardCard) => <option key={contents.title} value={contents.title}>{contents.title}</option>)}
                    </select>
                </label>
                <textarea id="dollarValue" placeholder="0" value={dollarValue} onChange={e => setDollarValue(Number(e.target.value))}/>
                <button>Submit</button>
            </form>
        </div>

        <div className="dashboard">
            {cards.map((contents: DashboardCard) => <DashboardCardComponent key={contents.title} title={contents.title} value={contents.value}/>)}
        </div>
        </>
    )
}