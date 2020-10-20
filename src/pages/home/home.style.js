import styled from 'styled-components';
import {BACKGROUND_COLOR,PRIMARY, NAVBAR_COLOR} from '../../common/colors';

export const HomePageStyled = styled.div`
padding:20px 100px 20px 250px;
.ant-select > .ant-select-selector{
    background-color:${BACKGROUND_COLOR};
}
.ant-select-item-option-content{
    color:${PRIMARY}
}
.ant-select-focused{
    border:1px solid ${PRIMARY};
}
rc-virtual-list-holder-inner > div > .ant-select-item, div > .ant-select-item-option{
    background-color:${BACKGROUND_COLOR}
}
.ant-select-arrow{
    color:white;
}
`
export const SearchStyled = styled.span`
input,.ant-input-search{
  background-color:${BACKGROUND_COLOR};
  color:white;
}
.ant-input-prefix{
  color:white;
}
input::placeholder{
  color:white;
  text-align:center;
  opacity:0.7;
}
input[attribute~="value"]{
  color:white;
}

}`

export const ButtonStyled = styled.span`
.ant-btn:hover, .ant-btn:focus{
    border-color:${PRIMARY};
}
`

export const TableStyled = styled.div`
padding-top:12px;
table{
  background-color:${NAVBAR_COLOR};
}
thead > tr > .ant-table-cell{
  background-color: black;
  border-bottom: 0px;
}
.ant-table-tbody > tr > td {
  border-bottom:2px solid ${BACKGROUND_COLOR};
}
.ant-table-tbody > .ant-table-row::hover,ant-table-row-level-0::over{
  background-color:${NAVBAR_COLOR};
  border:1 solid ${PRIMARY};
}
.ant-table-tbody > tr > td {
  border-bottom:2px solid ${BACKGROUND_COLOR};
}
.ant-table-tbody > tr:hover >td{
  background-color:${NAVBAR_COLOR};
  border-bottom:1px solid ${PRIMARY};
  border-top:1px solid ${PRIMARY};
}

.selected > .ant-table-tbody > tr > td {
    border-bottom:2px solid ${PRIMARY};
    border-top:2px solid ${PRIMARY};

  }
}
`
export const TitleStyle = styled.span`
color:${({traffic})=>!traffic ? 'white' : `${PRIMARY}`};
text-align:center;
font-size:18px;
font-weight:600;

`
export const RowStyled = styled.span`
color:${({color}) => color ? color : 'white'};
font-size: 16px;
font-weight: 500;

`

export const CardStyled = styled.div`
background-color:${NAVBAR_COLOR};
width:550px;
height:530px;
margin-left:15px;
border-radius: 6px;
border:1px solid ${PRIMARY};
`
export const GoldenLineStyled = styled.div`
10px;
height:1px;
background-color:${PRIMARY};  
`