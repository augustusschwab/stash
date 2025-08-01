export const retrieveTransactions = async () => {
    try {
        const response = await fetch('/api/transactions', {
            headers: {
                'Content-type': 'application/json',
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid user API response.')
        }

        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
}