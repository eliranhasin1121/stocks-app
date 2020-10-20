import React from 'react'
import { Route, Switch } from "react-router-dom";
import HomePage from '../pages/home/home.component';
import { Col,Layout, Menu,Input,Row,Anchor } from "antd";
import {NAVBAR_COLOR,PRIMARY,BACKGROUND_COLOR} from '../common/colors';
import Icon,{ SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const {Header,Content,Footer} = Layout;
const {Link} = Anchor;

const MasterStyled = styled.div`

`
const LinkStyled = styled.span`
color:${PRIMARY};
font-size:18px;
font-weight:${({selected})=>selected ? '550':'400'};
font-family: Helvetica;
letter-spacing: -1.01px;
text-align:center;
&:hover{
  cursor: pointer;
}
`

const SearchStyled = styled.div`
input,.ant-input-search{
  background-color:${NAVBAR_COLOR};
  color:${PRIMARY};
}
.ant-input-prefix{
  color:${PRIMARY};
}
input::placeholder{
  color:${PRIMARY};
  text-align:center;
  opacity:0.7;
}
input[attribute~="value"]{
  color:${PRIMARY};
}

}
`
const VersionStyled = styled.span`
font-size:18px;
font-family: Helvetica;
font-weight:500;
color:white;
`
const ContentStyled = styled.div`
height:100%;
background-color:${BACKGROUND_COLOR};
`

export default function Router() {
    return (
    <MasterStyled>
      <Layout className="layout">
        <Menu 
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{
            lineHeight:'85px',
            padding:"0px 2px",
            textAlign:'center',
            backgroundColor:`${NAVBAR_COLOR}`
          }}
          >
          <Row style={{alignItems:'center'}}>
          <Col span={2}>
            <Menu.Item
            className="logo"
            onClick={()=>console.log('logo clicked')}
            onItemHover={()=>console.log('hover')}
            >
              {/* <Icon component={logo}/> */}
              <img src={require('../assets/Tickeer_Logo.png')} style={{width:39.14,height:45}}/>
            </Menu.Item>
          </Col>
          <Col span={2}>
          <Menu.Item onItemHover={()=>console.log('hover')} key="2" className="search-box">
            <SearchStyled>
            <Input prefix={<SearchOutlined style={{fontSize:16}} />} placeholder={'search for ticker'} style={{borderRadius:8,border: '1px solid #F8A311',backgroundColor:'transparent',color:'#F8A311'}} />
            </SearchStyled>
          </Menu.Item>
          </Col>
          <Col span={2}>
            <Menu.Item onItemHover={()=>console.log('hover')} key="3">
            <LinkStyled selected>
            portfolio
            </LinkStyled>
            </Menu.Item>
          </Col>
          <Col span={1}>
            <Menu.Item onItemHover={()=>console.log('hover')} key="4">
            <LinkStyled >
            account
            </LinkStyled>
            </Menu.Item>
          </Col>
          <Col span={14}>
          </Col>
          <Col span={2}>
            <Menu.Item>
              <VersionStyled>
                TICKEER BETA 1.1
              </VersionStyled>
            </Menu.Item>
          </Col>
          </Row>

        </Menu>
       <ContentStyled>
      <Switch>
          <Route component={HomePage} path={'/'} exact/>
      </Switch>
      </ContentStyled>
      </Layout>
      </MasterStyled>
    )
}
