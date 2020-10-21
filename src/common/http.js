import axios from 'axios';


export async function getStocksData(){
    try{
        const result = await axios.get('http://localhost:8080/tickers/stockdata');
        
        if(result.data && result.status=== 200){
            return result.data.ticker_list;
        }else{
            throw Error(`Canot fatch ticker list with Error code:${result.status}`)
        }
    }catch(err){
        console.error(err);
    }
    
}

export async function getHistoryByStock(stock){
    try{
        const response = await axios.get(`http://localhost:8080/tickers/history?ticker=${stock}`)
        if(response.data && response.status === 200){
            return response.data;
        }else{
            throw Error(`can't fetch history data with error code:${response.status}`);
        }
    }catch(err){

    }
} 