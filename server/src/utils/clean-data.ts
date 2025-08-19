
export function formattedDates(data: any): string {
    //Get correct date in the event there a multiple date headers the transaction date should be the date that is used. This would be the earliest date in the data set.
    const dates: string[] = Object.keys(data).filter((s: string) => s.toLowerCase().includes('date'));
    let rawDate: string = '';

    if(!dates.length){
        throw new Error("No date field found");  
    } else if(dates.length > 1){
        //sort rows.dates[] and rows.key2 values in ascending order.
        let dateVals: string[] = []
        for(let i = 0; i < dates.length; i++){ 
            dateVals.push(data[dates[i]]); //Object bracket notation
        };
        dateVals.sort();
        rawDate = dateVals[0];
    } else {
        rawDate = data[dates[0]]; //Object bracket notation
    }
    
    //Format the date.
    let dateFormatted: string = '';
    let matchArray: RegExpMatchArray | null;

    if(matchArray = rawDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)){
        //Check format YYYY-MM-DD or YYYY-M-D
        dateFormatted = `${matchArray[1]}-${matchArray[2].padStart(2,'0')}-${matchArray[3].padStart(2, '0')}`;
    } else if(matchArray = rawDate.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/)) {
        //Check format MM-DD-YYYY or M-D-YYYY
        dateFormatted = `${matchArray[3]}-${matchArray[1].padStart(2,'0')}-${matchArray[2].padStart(2, '0')}`; 
    } else if(matchArray = rawDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)){
        //Check format MM/DD/YYYY or M/D/YYYY
        dateFormatted = `${matchArray[3]}-${matchArray[1].padStart(2, '0')}-${matchArray[2].padStart(2, '0')}`;
    } else {
        const date = new Date(rawDate);
        if(!Number.isNaN(date.getTime())){
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            dateFormatted = `${year}-${month}-${day}`;
        }
    }
    //console.log(`Formatted Date: ${dateFormatted}`);
    return dateFormatted;
}

//Find amount.
export function amount(data: any): string | null {
    let vals: string[] = Object.values(data);
    const ids: string[] = ['amount', 'debit', 'credit', 'transaction', 'value'];
    for(let i = 0; i < vals.length; i++){
        if(!isNaN(Number(vals[i])) && vals[i] != ''){
            let key: string | undefined = Object.keys(data).find(key => data[key] === vals[i]);
            if(key === undefined){
                throw new Error('No headers were found for the data.')
            } else if(
                ids.find(id => 
                    key
                        .toLowerCase()
                        .split(' ')
                        .find(word => word == id)
                )
            ) {
                //console.log(`This is the transaction amount: ${vals[i]} and it is labeled: ${key}`);
                return vals[i];
            }
        }
    }
    return null;
}

//Find description
export function description(data: any): string | null {
    const ids: string[] = ['name', 'description', 'action', 'transaction description'];
    for(const key in data){
        if(ids.some(id => id === key.toLowerCase())){
            return data[key]
        }
    }
    return null;
}
