const express = require('express')
const consola = require('consola')
const LOCAL_DATA = require('./localData.js')

const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// bodyParser 已經被抽離 express 所以要在此先載入 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // initStockData
  app.get('/initHomeData', function (req, res) {
    const homeData = {
      'projectData': LOCAL_DATA.PROJECT
    }
    res.send(homeData);
  });
  // initStockData
  app.get('/stock/initStockData', function (req, res) {
    const defaultStockData = {
      symbolList: ["NKE", "ORCL", "WORK", "PTON", "SNE", "WMT", "CRM", "LMT", "VFC", "ASML",
        "GPRO", "DIS", "COST", "AMZN", "FB", "ZM", "SPOT", "NVDA", "INTC", "AMD",
        "BRK-B", "GOOG", "AAPL", "UBER", "TSM", "UMC", "MU", "TSLA", "NFLX"
      ]
    }
    res.send(defaultStockData);
  });

  // getStockData
  app.post('/stock/getStockData', async function (req, res) {
    const params = req.body;
    let stockData;

      if (params.useRealData) {
          const access_key = 'EW4ByaDKhCt5hVSjgIVtyc0C1NJTleIGpAnwIlHKLWyc2nFATj';
          const stockDataRes = await axios.get(`https://fcsapi.com/api-v2/stock/latest?access_key=${access_key}&symbol=${params.selectSymbolList.join()}`)
          .catch((err) => {
            console.error('Error Msg: ' + err.message);
          });  
          if (stockDataRes.data.msg == "Successfully") {
            stockData = stockDataRes.data.response;
          }
      } else {
        stockData = LOCAL_DATA.TestStockDataList;
      }

    //因為會回傳墨西哥的資料  所以需要先filter
    stockData = stockData.filter(
      (stock) => stock.country == "united-states"
    );

    res.send(stockData);
  });


    // initStockData
    app.get('/stock/getPortfolio', function (req, res) {
      const portfolioData = {
        symbolList: ['006208' ,'2454' ,'2337' ,'2303' ,'2330' ,'2308' ,'2377' ,'2382' ,'2884' ,'2886' ,'2892' ,'AAPL' ,'TSLA' ,'PLTR' ,'AMD' ,'MSFT' ,'NVDA' ,'ABNB' ,'APPS' ,'PLTK' ,'VTI']
      }
      res.send(portfolioData);
    });
  
 
    // getFBX
    app.get('/stock/getFBX',async function (req, res) {
      let fbxData ;
      const fbxRes = await axios.get(`https://fbx.freightos.com/api/lane/FBX?isDaily=false`)
      .catch((err) => {
        console.error('Error Msg: ' + err.message);
      });  
      const fbxTickerRes = await axios.get(`https://fbx.freightos.com/api/ticker`)
      .catch((err) => {
        console.error('Error Msg: ' + err.message);
      });  
      if (fbxRes.data.indexPoints.length>0) {
        fbxData = fbxRes.data;
      }
      fbxData['ticker'] = fbxTickerRes.data
      res.send(fbxData);
    });
 

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
