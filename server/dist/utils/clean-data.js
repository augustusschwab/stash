export function formattedDates(data) {
    //Get correct date in the event there a multiple date headers the transaction date should be the date that is used. This would be the earliest date in the data set.
    const dates = Object.keys(data).filter((s) => s.toLowerCase().includes('date'));
    let rawDate = '';
    if (!dates.length) {
        throw new Error("No date field found");
    }
    else if (dates.length > 1) {
        //sort rows.dates[] and rows.key2 values in ascending order.
        let dateVals = [];
        for (let i = 0; i < dates.length; i++) {
            dateVals.push(data[dates[i]]); //Object bracket notation
        }
        ;
        dateVals.sort();
        rawDate = dateVals[0];
    }
    else {
        rawDate = data[dates[0]]; //Object bracket notation
    }
    //Format the date.
    let dateFormatted = '';
    let matchArray;
    if (matchArray = rawDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)) {
        //Check format YYYY-MM-DD or YYYY-M-D
        dateFormatted = `${matchArray[1]}-${matchArray[2].padStart(2, '0')}-${matchArray[3].padStart(2, '0')}`;
    }
    else if (matchArray = rawDate.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/)) {
        //Check format MM-DD-YYYY or M-D-YYYY
        dateFormatted = `${matchArray[3]}-${matchArray[1].padStart(2, '0')}-${matchArray[2].padStart(2, '0')}`;
    }
    else if (matchArray = rawDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
        //Check format MM/DD/YYYY or M/D/YYYY
        dateFormatted = `${matchArray[3]}-${matchArray[1].padStart(2, '0')}-${matchArray[2].padStart(2, '0')}`;
    }
    else {
        const date = new Date(rawDate);
        if (!Number.isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            dateFormatted = `${year}-${month}-${day}`;
        }
    }
    console.log(`Formatted Date: ${dateFormatted}`);
}
