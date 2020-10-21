import styled from 'styled-components'
import {PRIMARY} from '../../common/colors';
export const StockCardStyled = styled.div`
padding:20px;
`

export const TopPanelStyled = styled.div`

`
export const CompanyStyled = styled.span`
font-size:20px;
font-weight:600;
color:white;
`
export const PrimaryStyled = styled.span`
font-size:14px;
font-weight:400;
color:white;
margin-left:14px;   
`
export const BottomPanelStyled = styled.div`
display:flex;
justify-content:center;
margin-top:25px;
`
export const Column = styled.div`
display:flex;
flex-direction:column;
margin: 0px 35px;
`
export const GoldenText = styled.div`
color:${PRIMARY};
text-align:center;
font-size:${({size}) => size}px;
font-weight:500;
padding-top:${({padding})=> padding ? '5px': '0px'};
`
export const ResultStyled = styled.div`
color:${({color}) => color};
font-size:16px;
text-align:center;
font-weight:500;
padding-top:5px;
`
export const GraphStyled = styled.div`
display:flex;
justify-content:center;
`
export const PeriodStyled = styled.span`
color:${PRIMARY};
font-size:20px;
font-weight:${({selected})=> selected ? 600 : 400};
`
export const PeriodsStlyed = styled.div`
display:flex;
justify-content:space-between;
padding:${({time})=>time ? '7px 10px 10px':'15px 40px 20px'};
`
export const HorizontalLine = styled.div`
border-bottom:1px solid ${PRIMARY};
`