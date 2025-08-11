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

    const handleFileUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if(!files || files.length === 0){
            console.log('No files were uploaded.')
            return;
        }

        const formData = new FormData;

        for (let i = 0; i < files.length; i++){
            formData.append('files', files[i], files[i].name);
        }

        console.log(formData);

        try{
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            
            if(!response.ok) {
                throw new Error(`Server responded with status ${response.status}`)
            }

            const result = await response.text();
            console.log("Upload result:", result);
        } catch(err) {
            console.error("Error uploading files:", err);
        }
    }

    return (
        <>
            <input type="file" id="transaction-data" name="transaction-data" accept=".csv" multiple onChange={handleFileUpload}/>
            {/* <p>{transactions[0].description}</p> */}
        </>
    )
}