import React,{useEffect,useState} from 'react';
import {HomePageStyled,SearchStyled,ButtonStyled,TableStyled,TitleStyle,RowStyled,CardStyled,GoldenLineStyled} from './home.style';
import {Select,Row,Col,Input,Button, Table} from 'antd';
import Icon,{ SearchOutlined } from '@ant-design/icons';
import { BACKGROUND_COLOR,PRICE_UP,PRICE_DOWN,PRIMARY } from '../../common/colors';
import StockCard from '../../components/card/StockCard.component';
import {getStocksData} from '../../common/http';
const hisroryData = require('../../mock-data/history_bars.json');


const {Option} = Select;

export default function HomePage(){
const [data,setData] = useState([])
const [originalData,setOriginalData] = useState([])
const [selected,setSelected] = useState(null);
    useEffect(async()=>{
        const data = await getStocksData();
        setData(data);
        setOriginalData(data);
    },[])

    const columns = [
        {
            title:<TitleStyle>ticker</TitleStyle>,
            dataIndex:'stock',
            render: stock => <RowStyled>{stock}</RowStyled>,
            align:'center'
        },
        {
            title:<TitleStyle>price</TitleStyle>,
            dataIndex:'price',
        render: price => <RowStyled>${price}</RowStyled>,
        align:'center'
        },
        {
            title:<TitleStyle>price change</TitleStyle>,
            dataIndex:'price_change',
            render: priceChange => <RowStyled color={priceChange < 0 ? PRICE_DOWN : PRICE_UP}>{priceChange < 0 ? '' : '+'}{priceChange}%</RowStyled>,
            align:'center'

        },
    ]
    const fullColumns = [
        {
            title:<TitleStyle>ticker</TitleStyle>,
            dataIndex:'stock',
            render: stock => <RowStyled>{stock}</RowStyled>,
            align:'center'
        },
        {
            title:<TitleStyle>price</TitleStyle>,
            dataIndex:'price',
        render: price => <RowStyled>${price}</RowStyled>,
        align:'center'
        },
        {
            title:<TitleStyle>price change</TitleStyle>,
            dataIndex:'price_change',
            render: priceChange => <RowStyled color={priceChange < 0 ? PRICE_DOWN : PRICE_UP}>{priceChange < 0 ? '' : '+'}{priceChange}%</RowStyled>,
            align:'center'

        },
        {
            title:<TitleStyle>Volume</TitleStyle>,
            dataIndex:'volume',
            align:'center',
            render:volume => <RowStyled>{volume}</RowStyled>
        },
        {
            title:<TitleStyle traffic>traffic</TitleStyle>,
            dataIndex:'daily_interset',
            align:'center',
            render:dailyInerest => <RowStyled color={PRIMARY}>{dailyInerest}</RowStyled>
        },
        {
            title:<TitleStyle traffic>traffic change</TitleStyle>,
            dataIndex:'current_change',
            render: interest => <RowStyled color={interest < 0 ? PRICE_DOWN : PRICE_UP}>{interest < 0 ? '' : '+'}{interest}%</RowStyled>,
            align:'center'

        }
    ]

    return (
        <HomePageStyled>
            <Row>
            <Col span={2}>
                <Select placeholder={'sort by'} style={{width:112,borderRadius:6,border:'1px solid white'}}>
                    <Option key="ticker" value="ticker">ticker</Option>
                    <Option key="price" value="price">price</Option>
                    <Option key="priceChange" value="price_change">price change</Option>
                    <Option key="volume" value="volume">volume</Option>
                    <Option key="traffic" value="traffic">traffic</Option>
                    <Option key="trafficChange" value="traffic_change">traffic change</Option>
                </Select>
            </Col>
            <Col span={1} style>
                <Select placeholder={'portfolio'} style={{width:127,borderRadius:6,border:'1px solid white'}}>
                </Select>
            </Col>
            <Col span={3}>
            <SearchStyled style={{marginLeft:70}}>
            <Input prefix={<SearchOutlined style={{fontSize:16}} />} placeholder={'add ticker'} style={{borderRadius:8,border: '1px solid white',backgroundColor:'transparent',height:34}} />
            </SearchStyled>
            </Col>
            <Col span={16}/>
            <Col span={2}>
                <ButtonStyled>
                <Button style={{backgroundColor:`${BACKGROUND_COLOR}`,color:'white',borderRadius:6}}>add portfolio</Button>
                </ButtonStyled>
            </Col>
            </Row>
           {
            !selected ? (
            <TableStyled>
                <Table onRow={(record, rowIndex)=>{
                    return{
                        onClick: event =>{
                            setSelected(record);
                        } 
                    }
                }}  columns={fullColumns} dataSource={data} pagination={false}/>
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
                }}  columns={columns} dataSource={data} pagination={false}/>
            </TableStyled>  
            </Col>
            <Col span={12}>
                <CardStyled>
                    <StockCard stockData={selected} graphsData={hisroryData}/>
                </CardStyled>
            </Col>
            </Row>
            )
           }
           
            
        </HomePageStyled>
    )
}