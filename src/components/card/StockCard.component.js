import React, { useEffect,useState } from 'react';
import {StockCardStyled,TopPanelStyled,CompanyStyled,PrimaryStyled,BottomPanelStyled,Column,ResultStyled,GoldenText,GraphStyled,PeriodsStlyed,PeriodStyled,HorizontalLine,LoadingContainer} from './StockCard.style';
import { PRICE_DOWN,PRICE_UP, NAVBAR_COLOR } from '../../common/colors';
import { LineChart, Line, XAxis, YAxis, Tooltip,BarChart,Bar} from 'recharts';
import {getHistoryByStock} from '../../common/http';
import {PRIMARY} from '../../common/colors';
import Lottie from 'react-lottie';
import Cell from 'recharts/lib/component/Cell';
const history = require('../../mock-data/history_true_data.json');
const animationData  =  require('../../assets/lottie/loader.json');

export default function StockCard({stockData}){

    const [graphData,setGraphData] = useState([]);
    const [xValues,setXValues] = useState([]);
    const [yValues,setYValues] = useState([]);
    const [loading,setLoading] = useState(true);
    const [bars,setBars] = useState(null);
    useEffect(() =>{
       const interval =  setInterval(()=>{
            getHistoryByStock(stockData.stock).then(res =>{
                const graphs = res;
                const graph = history;
    
                const bars = graphs[`${stockData.stock}`].bars;
                console.log({bars})
                setGraphData(graph);
                setBars(bars);
            })
            .catch(err => console.error(err));    
        },60000)
        return ()=>{
            clearInterval(interval);
        }
    },[])
    useEffect(() =>{
             getHistoryByStock(stockData.stock).then(res =>{
                 const graphs = res;
                 const graph = history;
                 const bars = graphs[`${stockData.stock}`].bars;
                 console.log({bars})
                 setGraphData(graph);
                 setBars(bars);
                setLoading(false);

             })
             .catch(err => console.error(err));    

         }
     ,[])

    async function fetchData(){
        try{
            const graphs = await getHistoryByStock(stockData.stock);
            const graph = graphs[`${stockData.stock}`]['1d']
            const bars = graphs[`${stockData.stock}`].bars;
            setGraphData(graph);
            setBars(bars);
        }catch(err){
            console.error(err)
        }
    }

    const options = {
        loop:true,
        autoplay:true,
        animationData:animationData,
    }

    
    if(loading){
        return (
            <LoadingContainer>
                <Lottie options={options}/>
            </LoadingContainer>
        )
    }

    console.log({graphData})
    return (
        <StockCardStyled>
            <TopPanelStyled>
                <CompanyStyled>{stockData.companyName}</CompanyStyled>
                <PrimaryStyled>{stockData.primaryExchange}</PrimaryStyled>
            </TopPanelStyled>
            <BottomPanelStyled>
                <Column>
                <GoldenText size={16}>traffic</GoldenText>
                <GoldenText padding size={18}>{stockData.daily_interset}</GoldenText>
                </Column>
                <Column>
                <GoldenText size={16}>traffic change</GoldenText>
                <ResultStyled color={stockData.current_change < 0 ? `${PRICE_DOWN}`:`${PRICE_UP}`}>{stockData.current_change >= 0 &&'+'}{stockData.current_change}%</ResultStyled>
                </Column>
            </BottomPanelStyled>
            <PeriodsStlyed>
                <PeriodStyled selected>1D</PeriodStyled>
                <PeriodStyled>7D</PeriodStyled>
                <PeriodStyled>1M</PeriodStyled>
                <PeriodStyled>6M</PeriodStyled>
                <PeriodStyled>1Y</PeriodStyled>
                <PeriodStyled>MAX</PeriodStyled>
            </PeriodsStlyed>    
            <GraphStyled>
              <LineChart width={480}  height={200} strokeWidth={2}  margin={{ top: 5, right: 5, bottom: 5, left:30 }} data={graphData}>
                <Line type="linear"  connectNulls={true} dot={false} dataKey="close" stroke='#ffffff' />
                <XAxis hide  dataKey="label"/>
                <YAxis hide  dataKey="close"  domain={['dataMin','dataMax']}/>
                <Tooltip />
              </LineChart>
            </GraphStyled>
            <GraphStyled>
            <BarChart width={480} height={200} data={bars}>
                <XAxis dataKey="label" hide={true}  />
                <YAxis hide={true}   />
                <Tooltip />
                <Bar  background={{ fill: `${NAVBAR_COLOR}` }}  dataKey="interest" fill={'rgba(247,163,17,0.6)'}>
                    {
                     bars?.map((bar,index)=>(
                        <Cell dataKey={bar.interest} background={{fill:`${NAVBAR_COLOR}`}} cursor="pointer" fill={bar.interest > 12 ? 'rgba(247,163,17,1)' : 'rgba(247,163,17,0.6)'}/>
                     ))   
                    }
                </Bar>
            </BarChart>
            </GraphStyled>
            <HorizontalLine/>
            <PeriodsStlyed time>
                <PeriodStyled>9:30</PeriodStyled>
                <PeriodStyled>10:00</PeriodStyled>
                <PeriodStyled>1100:</PeriodStyled>
                <PeriodStyled>12:00</PeriodStyled>
                <PeriodStyled>13:00</PeriodStyled>
                <PeriodStyled>14:00</PeriodStyled>
                <PeriodStyled>15:00</PeriodStyled>
                <PeriodStyled>16:00</PeriodStyled>
            </PeriodsStlyed>
        </StockCardStyled>
    )
}