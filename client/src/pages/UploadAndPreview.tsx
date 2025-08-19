import { useState, useEffect } from 'react';
// import { retrieveTransactions } from '../api/transactionAPI';

export interface TxData {
    date: string,
    description: string,
    category: string,
    account: string,
    amount: number,
    verified: boolean,
}

export default function UploadAndPreview() {
    const [txs, setTxs] = useState<TxData[]>([]);
    const [desc, setDesc] = useState<any[]>(new Array(txs.length));
    const [cat, setCat] = useState<any[]>(new Array(txs.length));

    // useEffect(() => {
    //     fetchTransactions();
    // }, []);
    
    // const fetchTransactions = async () =>{
    //     const data = await retrieveTransactions();
    //     setTransactions(data);
    // }

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

        try{
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            
            if(!response.ok) {
                throw new Error(`Server responded with status ${response.status}`)
            }

            const result = await response.json();
            setTxs(result.rows);
            
            txs.map((tx) => {
                const test = [];
                test.push(tx.description);
                setDesc(test);
                console.log(test);
            })
        } catch(err) {
            console.error("Error uploading files:", err);
        }
    }


    return (
        <div>
            
            <input type="file" id="tx-data" name="tx-data" accept=".csv" multiple onChange={handleFileUpload}/>
        
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Verified</th>
                    </tr>
                </thead>
            <tbody>
                {txs.map((tx, i) => (
                    <tr key={i}>
                        <td>{tx.date}</td>
                        <td>
                            <input 
                                type="text" 
                                id={i.toString()} 
                                name="description" 
                                value={tx.description} 
                                onChange={(e) =>
                                    setTxs(prev => 
                                        prev.map((tx, idx) => idx === i ? {...tx, description: e.target.value} : tx)
                                    )
                                }
                            />
                        </td>
                        <td>
                            <input 
                                type="text" 
                                id={i.toString()} 
                                name="category" 
                                value={tx.category} 
                                onChange={(e) => {
                                    setTxs(prev =>
                                        prev.map((tx, idx) => idx === i ? {...tx, category: e.target.value} : tx)
                                    );
                                }}
                            />
                        </td>
                        <td>{tx.account}</td>
                        <td>${tx.amount}</td>
                        <td>{tx.verified}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            
        </div>
         
    )
}