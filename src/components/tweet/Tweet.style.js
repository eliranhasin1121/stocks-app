import styled from 'styled-components';
import {PRIMARY} from '../../common/colors';
export const TweetContainer = styled.div`
padding:20px 0px;
`
export const TweetText = styled.div`
color:${PRIMARY};
font-weight:${({bold})=>bold ? '600' : '500'};
font-size:${({size})=>size}px;
`

export const TextContainer = styled.div`
padding-bottom:20px;
`

export const DatesContainer = styled.div`
display:flex;
padding-bottom:10px;
`