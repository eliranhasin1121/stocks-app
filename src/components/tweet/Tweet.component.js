import React from 'react';
import {TweetText,TweetContainer,TextContainer,DatesContainer} from './Tweet.style'
import moment from 'moment';
export default function Tweet({tweet}){
console.log({time:moment(tweet.created_at).format('H:mm A')})
console.log({timeB:moment(tweet.created_at).format('MMMM Do YYYY')})
    return(
        <TweetContainer>
        <TextContainer>
            <TweetText size={18} bold>@{tweet.user_name}</TweetText>
            <TweetText size={16}>{tweet.text}</TweetText>
            </TextContainer>
            <DatesContainer>
                <TweetText style={{opacity:0.6}} size={12}>{moment(tweet.created_at).format('H:mm A')}</TweetText>
                <TweetText size={12} style={{marginLeft:10,opacity:0.6}}>{moment(tweet.created_at).format('MMMM Do YYYY')}</TweetText>
            </DatesContainer>
            <DatesContainer>
            <DatesContainer >
    <TweetText size={14} bold>{tweet.retweet_count > 1000 ? `${tweet.retweet_count/1000}K`:tweet.retweet_count}</TweetText>
    <TweetText size={12} style={{marginLeft:10,opacity:0.6,paddingTop:4}}>Retweet</TweetText>
            </DatesContainer>
            <DatesContainer style={{marginLeft:60}}>
            <TweetText size={14} bold>{tweet.like_count > 1000 ? `${tweet.like_count/1000}K`:tweet.like_count}</TweetText>
             <TweetText size={12} style={{marginLeft:10,opacity:0.6,paddingTop:4}}>Likes</TweetText>
            </DatesContainer>
            </DatesContainer>
        </TweetContainer>
    )
}