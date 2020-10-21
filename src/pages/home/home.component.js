import React,{useEffect,useState} from 'react';
import {HomePageStyled,SearchStyled,ButtonStyled,TableStyled,TitleStyle,RowStyled,CardStyled,GoldenLineStyled} from './home.style';
import {Select,Row,Col,Input,Button, Table} from 'antd';
import Icon,{ SearchOutlined } from '@ant-design/icons';
import { BACKGROUND_COLOR,PRICE_UP,PRICE_DOWN,PRIMARY, FLICKER_COLOR, NAVBAR_COLOR } from '../../common/colors';
import StockCard from '../../components/card/StockCard.component';
import {getStocksData} from '../../common/http';
const hisroryData = require('../../mock-data/history_bars.json');
const table = require('../../mock-data/new_table.json').ticker_list;


export default function HomePage(){
const [data,setData] = useState([])
const [originalData,setOriginalData] = useState([])
const [selected,setSelected] = useState(null);
    useEffect(async()=>{
        const data = await getStocksData();
        console.log({data})
            setData(data);
        setOriginalData(data);
    },[])

    const getRowElement = (rowIndex)=>{
        let element = document.querySelector(`.ant-table-tbody`);
        return element ?  element.childNodes[rowIndex]:null;
    }

    useEffect(()=>{
      const interval =  setInterval(()=>{
        getStocksData().then(res=>{
        setData(res);
        setOriginalData(res);
        res.forEach((stock,index)=>{
            if(stock.events_data){
                let domElement = getRowElement(index);
                domElement.style.cssText = `background-color:${FLICKER_COLOR}`;
                setTimeout(()=>{
                domElement.style.cssText = `background-color:${NAVBAR_COLOR}`;
                setTimeout(()=>{
                    domElement.style.cssText = `background-color:${FLICKER_COLOR}`;
                    setTimeout(()=>{
                        domElement.style.cssText = `background-color:${NAVBAR_COLOR}`;
                    },300)
                },300)
                },300)
               
            }
        })
        })
           
        },10000)
        return ()=>{
            clearInterval(interval)
        }
    },[])

    const columns = [
        {
            title:<TitleStyle>ticker</TitleStyle>,
            dataIndex:'stock',
            render: stock => <RowStyled>{stock}</RowStyled>,
            align:'center',
            sorter:(a,b) => a.stock - b.stock

        },
        {
            title:<TitleStyle>price</TitleStyle>,
            dataIndex:'price',
            render: price => <RowStyled>${price}</RowStyled>,
            align:'center',
            sorter:(a,b) => a.price - b.price

        },
        {
            title:<TitleStyle>price change</TitleStyle>,
            dataIndex:'price_change',
            render: priceChange => <RowStyled color={priceChange < 0 ? PRICE_DOWN : PRICE_UP}>{priceChange < 0 ? '' : '+'}{priceChange}%</RowStyled>,
            align:'center',
            sorter:(a,b) => a.price - b.price
        },
    ]
    const fullColumns = [
        {
            title:<TitleStyle>ticker</TitleStyle>,
            dataIndex:'stock',
            render: stock => <RowStyled>{stock}</RowStyled>,
            align:'center',
            sorter:(a,b) => a.stock - b.stock
        },
        {
            title:<TitleStyle>price</TitleStyle>,
            dataIndex:'price',
            render: price => <RowStyled>${price}</RowStyled>,
             align:'center',
             sorter:(a,b) => a.price - b.price

        },
        {
            title:<TitleStyle>price change</TitleStyle>,
            dataIndex:'price_change',
            render: priceChange => <RowStyled color={priceChange < 0 ? PRICE_DOWN : PRICE_UP}>{priceChange < 0 ? '' : '+'}{priceChange}%</RowStyled>,
            align:'center',
            sorter:(a,b) => a.price_change - b.price_change


        },
        {
            title:<TitleStyle>Volume</TitleStyle>,
            dataIndex:'volume',
            align:'center',
            render:volume => <RowStyled>{volume}</RowStyled>,
            sorter:(a,b) => a.volume - b.volume

        },
        {
            title:<TitleStyle traffic>traffic</TitleStyle>,
            dataIndex:'daily_interset',
            align:'center',
            render:dailyInerest => <RowStyled color={PRIMARY}>{dailyInerest}</RowStyled>,
            sorter:(a,b) => a.daily_interset - b.daily_interset

        },
        {
            title:<TitleStyle traffic>traffic change</TitleStyle>,
            dataIndex:'current_change',
            render: interest => <RowStyled color={interest < 0 ? PRICE_DOWN : PRICE_UP}>{interest < 0 ? '' : '+'}{interest}%</RowStyled>,
            align:'center',
            sorter:(a,b) => a.current_change - b.current_change
        }
    ]

    return (
        <HomePageStyled>
            <Row>
            <Col span={1} style>
                <Select placeholder={'portfolio'} style={{width:127,borderRadius:6,border:'1px solid white'}}>
                </Select>
            </Col>
            <Col span={3}>
            <SearchStyled style={{marginLeft:70}}>
            <Input prefix={<SearchOutlined style={{fontSize:16}} />} placeholder={'add ticker'} style={{borderRadius:8,border: '1px solid white',backgroundColor:'transparent',height:34}} />
            </SearchStyled>
            </Col>
            <Col span={18}/>
            <Col span={2}>
                <ButtonStyled>
                <Button style={{backgroundColor:`${BACKGROUND_COLOR}`,color:'white',borderRadius:6}}>add portfolio</Button>
                </ButtonStyled>
            </Col>
            </Row>
           {
            !selected ? (
            <TableStyled className="aaa" full>
                <Table onRow={(record, rowIndex)=>{
                    return{
                        onClick: event =>{
                            setSelected(record);
                            setTimeout(()=>{
                                let element = document.querySelector(`.ant-table-tbody`);
                                console.log({element})
                                if(element){
                                    element = element.childNodes[rowIndex];
                                    element.childNodes.forEach(child =>{
                                        child.style.cssText = `border-bottom: 1px solid ${PRIMARY};border-top: 1px solid ${PRIMARY};text-align:center;`;
                                    })

                                }
                            },250)
                           
                        } 
                    }
                }}  columns={fullColumns} dataSource={data} pagination={false}
                showSorterTooltip={false}
                />
            </TableStyled>
            ) : (
                <Row>
                    <Col span={12}>
                        <TableStyled className="selected">
                        <Table onRow={(record, rowIndex)=>{
                            return{
                                onClick: event =>{
                                    console.log('heree',originalData)
                                    setData(originalData)
                                    setSelected(null);
                                } 
                            }
                        }}  columns={columns} dataSource={data} pagination={false}  showSorterTooltip={false}/>
                    </TableStyled>  
            </Col>
            <Col span={12}>
                <CardStyled>
                    <StockCard stockData={selected} graphsData={hisroryData}/>
                </CardStyled>
            </Col>
            </Row>
            )}
        </HomePageStyled>
    )
}