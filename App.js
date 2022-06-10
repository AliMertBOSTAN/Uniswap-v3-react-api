import './App.css';
import { createClient } from 'urql';
import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import { type } from '@testing-library/user-event/dist/type';

const fs = require('fs');

const APIURL = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph"

//const query = 'query {tokenDayDatas(first: 10,orderBy: volumeUSD,where: {priceUSD_not: "0", volumeUSD_gt: "1000"}) {id,high,token {id,name,symbol,volumeUSD}}}'
//const query = 'query MyQuery {tokens(orderBy: totalValueLockedUSD, orderDirection: desc) {id,name,symbol,tokenDayData(where: {priceUSD_not: "0"}) {open,close}}}'
//const query = 'query MyQuery {tokens(orderBy: totalValueLockedUSD, orderDirection: desc) {id,name,symbol,tokenDayData(where: {priceUSD_not: "0", date_gt: 1654387200}) {priceUSD}}}'
const query = 'query MyQuery { pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) { id ,token0 { id ,name ,symbol} token1 { id ,name ,symbol}}}'

const client = createClient({
  url: APIURL
})


function App() {
  const [tokens, setTokens] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    const response = await client.query(query).toPromise();
    console.log('response:', response)
    setTokens(response.data.tokens);
    const myJSON = JSON.stringify(response);
    //alert(myJSON);
    console.log(myJSON)


  }





  return (
    <html>
      <body>

        <div id='content'></div>

      </body>
    </html>
  );
}

export default App;
