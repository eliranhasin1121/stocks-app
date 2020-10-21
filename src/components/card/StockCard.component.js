import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { Bar, BarChart, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Cell from 'recharts/lib/component/Cell';
import { NAVBAR_COLOR, PRICE_DOWN, PRICE_UP } from '../../common/colors';
import { getHistoryByStock } from '../../common/http';
import Tweet from '../tweet/Tweet.component';
import { BottomPanelStyled, Column, CompanyStyled, DatesContainer, GoldenText, GraphStyled, HorizontalLine, LoadingContainer, MostActiveText, PeriodsStlyed, PeriodStyled, PrimaryStyled, ResultStyled, StockCardStyled, TooltipContainer, TooltipText, TopPanelStyled, TweetsHeader, TwitesContainer } from './StockCard.style';
const animationData  =  require('../../assets/lottie/loader.json');

export default function StockCard({stockData}){

    const [graphData,setGraphData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [bars,setBars] = useState(null);
    const [lineWidth,setLineWidth] = useState(0);
    const [tweets,setTweets] = useState([]);
    useEffect(() =>{
       const interval =  setInterval(()=>{
            getHistoryByStock(stockData.stock).then(res =>{
                const graphs = res[`${stockData.stock}`];
                const graph = graphs['1d']?.filter((_,index)=>index % 5 === 0);
                const bars = graphs.bars;
                setGraphData(graph);
                setBars(bars);
                setLineWidth(graph.length * 6.15);
                console.log({graphs})
                setTweets(graphs.tweets);
            })
            .catch(err => console.error(err));    
        },60000)
        return ()=>{
            clearInterval(interval);
        }
    },[])
    useEffect(() =>{
             getHistoryByStock(stockData.stock).then(res =>{
                 console.log({res});
                 const graphs = res[`${stockData.stock}`];
                 const graph = graphs['1d']?.filter((_,index)=>index % 5 === 0);
                 const bars = graphs.bars;
                 setGraphData(graph);
                 setBars(bars);
                setLoading(false);
                setLineWidth(graph?.length * 6.15);
                setTweets(graphs.tweets);
             })
             .catch(err => console.error(err));    
         }
     ,[])


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

    const CustomTooltipLine = ({ active, payload, label }) => {
        if (active) {
          return (
            <TooltipContainer>
                <DatesContainer >
                    <TooltipText>{payload?.length ? `${payload[0]?.payload.date}` : 'N/A'}</TooltipText>
                    <TooltipText>{label}</TooltipText>
                </DatesContainer>
                <TooltipText>{payload?.length ? `$${payload[0]?.payload?.close}`:'N/A'}</TooltipText>
            </TooltipContainer>
          );
        }
      
        return null;
      };

      console.log({tweets})
      const CustomTooltipBar = ({active,payload,label})=>{
          if(active){
              return(
                <TooltipContainer bar>
                         <DatesContainer>
                             <TooltipText bar>{label}</TooltipText>
                         </DatesContainer>
                         <TooltipText bar>{payload.length ? `${payload[0]?.payload?.interest}`:'N/A'}</TooltipText>
                    </TooltipContainer>
              )
          }
          return null
      }
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
              <LineChart width={lineWidth}  height={200} strokeWidth={2}  margin={{ top: 5, right: 5, bottom: 5, left:30 }} data={graphData}>
                <Line type="linear"  connectNulls={true} dot={false} dataKey="close" stroke='#ffffff' />
                <XAxis hide  dataKey="label"/>
                <YAxis hide  dataKey="close"  domain={['dataMin','dataMax']}/>
                <Tooltip content={<CustomTooltipLine/>} />
              </LineChart>
            </GraphStyled>
            <GraphStyled>
            <BarChart width={480} height={200} data={bars}>
                <XAxis dataKey="label" hide={true}  />
                <YAxis hide={true}   />
                <Tooltip content={<CustomTooltipBar/>} />

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
                <PeriodStyled>1100</PeriodStyled>
                <PeriodStyled>12:00</PeriodStyled>
                <PeriodStyled>13:00</PeriodStyled>
                <PeriodStyled>14:00</PeriodStyled>
                <PeriodStyled>15:00</PeriodStyled>
                <PeriodStyled>16:00</PeriodStyled>
            </PeriodsStlyed>
            <div style={{display:'flex',justifyContent:'center',paddingBottom:15}}>
            <HorizontalLine width={'46px'} style={{display:'flex',justifyContent:'center'}}/>
            </div>
            <TwitesContainer>
                <TweetsHeader>
                    <MostActiveText>most active</MostActiveText>
                </TweetsHeader>
                {tweets.map((tweet,index)=>(
                    <Tweet tweet={tweet} key={index}/>
                ))}
            </TwitesContainer>
        </StockCardStyled>
    )
}