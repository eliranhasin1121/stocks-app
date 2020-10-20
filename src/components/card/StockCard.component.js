import React from 'react';
import {StockCardStyled,TopPanelStyled,CompanyStyled,PrimaryStyled,BottomPanelStyled,Column,ResultStyled,GoldenText,GraphStyled} from './StockCard.style';
import { PRICE_DOWN,PRICE_UP } from '../../common/colors';

export default function StockCard({stockData,graphData,tabsData}){

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
            <GraphStyled>

            </GraphStyled>
        </StockCardStyled>
    )
}