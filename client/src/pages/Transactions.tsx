import { useState, useEffect } from 'react';
import { retrieveTransactions } from '../api/transactionAPI';

export interface TransactionData {
    date: Date,
    description: string,
    type: string,
    account: string,
    amount: number,
    verified: boolean,
}

export default function Transactions() {
    const [transactions, setTransactions] = useState<TransactionData[]>([]);

    useEffect(() => {
        fetchTransactions();
    }, []);
    
    const fetchTransactions = async () =>{
        const data = await retrieveTransactions();
        setTransactions(data);
    }

    return (
        <p>{transactions[0].description}</p>
    )
}