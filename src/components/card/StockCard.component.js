import React, { useEffect,useState } from 'react';
import {StockCardStyled,TopPanelStyled,CompanyStyled,PrimaryStyled,BottomPanelStyled,Column,ResultStyled,GoldenText,GraphStyled,PeriodsStlyed,PeriodStyled,HorizontalLine} from './StockCard.style';
import { PRICE_DOWN,PRICE_UP, NAVBAR_COLOR } from '../../common/colors';
import { LineChart, Line, XAxis, YAxis, Tooltip,BarChart,Bar} from 'recharts';
import {getHistoryByStock} from '../../common/http';
import {PRIMARY} from '../../common/colors';
import Cell from 'recharts/lib/component/Cell';

export default function StockCard({stockData,graphsData}){

    const [graphData,setGraphData] = useState([]);
    const [xValues,setXValues] = useState([]);
    const [yValues,setYValues] = useState([]);
    const [bars,setBars] = useState(null);
    useEffect(() =>{
        getHistoryByStock(stockData.stock).then(res =>{
            const graphs = res;
            const graph = graphs[`${stockData.stock}`]['1d'].filter((_,index) => index % 5 === 0);

            const bars = graphs[`${stockData.stock}`].bars;
            console.log({bars})
            setGraphData(graph);
            setBars(bars);
        })
        .catch(err => console.error(err));
    },[])

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
              <LineChart width={450}  height={200}  margin={{ top: 5, right: 5, bottom: 5, left:30 }} data={graphData}>
                <Line type="linear" strockWidth={2} connectNulls={true} dot={false} dataKey="close" stroke='#ffffff' />
                <XAxis hide={true} dataKey="label"/>
                <YAxis hide={true} dataKey="close"  domain={['dataMin','dataMax']}/>
                <Tooltip />
              </LineChart>
            </GraphStyled>
            <GraphStyled>
            <BarChart width={450} height={200} data={bars}>
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