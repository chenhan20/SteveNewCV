const express = require('express')
const consola = require('consola')
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
        stockData = testData;
      }

    //因為會回傳墨西哥的資料  所以需要先filter
    stockData = stockData.filter(
      (stock) => stock.country == "united-states"
    );

    res.send(stockData);
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






//#region defaultData 
const testData = [{"price":"44.28","high":"44.80","low":"43.61","chg":"+0.17","chg_percent":"0.39%","dateTime":"2020-10-30 19:59:59","symbol":"INTC","country":"united-states","id":"4"},{"price":"121.25","high":"121.75","low":"119.09","chg":"-0.29","chg_percent":"-0.24%","dateTime":"2020-10-30 19:59:59","symbol":"DIS","country":"united-states","id":"6"},{"price":"56.11","high":"56.64","low":"55.45","chg":"+0.09","chg_percent":"0.16%","dateTime":"2020-10-30 19:59:59","symbol":"ORCL","country":"united-states","id":"1145"},{"price":"108.86","high":"111.99","low":"107.72","chg":"-6.46","chg_percent":"-5.6%","dateTime":"2020-10-30 19:59:59","symbol":"AAPL","country":"united-states","id":"15"},{"price":"3036.15","high":"3167.00","low":"3019.00","chg":"-174.86","chg_percent":"-5.45%","dateTime":"2020-10-30 19:59:59","symbol":"AMZN","country":"united-states","id":"56"},{"price":"357.62","high":"363.85","low":"355.79","chg":"-7.24","chg_percent":"-1.98%","dateTime":"2020-10-30 19:59:59","symbol":"COST","country":"united-states","id":"60"},{"price":"501.36","high":"517.46","low":"492.00","chg":"-19.60","chg_percent":"-3.76%","dateTime":"2020-10-30 19:59:59","symbol":"NVDA","country":"united-states","id":"74"},{"price":"67.20","high":"68.88","low":"66.26","chg":"-1.66","chg_percent":"-2.41%","dateTime":"2020-10-30 19:59:59","symbol":"VFC","country":"united-states","id":"1157"},{"price":"350.13","high":"353.73","low":"345.65","chg":"-2.31","chg_percent":"-0.66%","dateTime":"2020-10-30 19:59:59","symbol":"LMT","country":"united-states","id":"1163"},{"price":"138.75","high":"140.09","low":"137.37","chg":"-1.17","chg_percent":"-0.84%","dateTime":"2020-10-30 19:59:59","symbol":"WMT","country":"united-states","id":"18"},{"price":"83.66","high":"84.05","low":"82.58","chg":"+0.23","chg_percent":"0.28%","dateTime":"2020-10-30 19:59:59","symbol":"SNE","country":"united-states","id":"1979"},{"price":"50.34","high":"50.43","low":"49.30","chg":"-0.14","chg_percent":"-0.28%","dateTime":"2020-10-30 19:59:59","symbol":"MU","country":"united-states","id":"81"},{"price":"75.29","high":"77.70","low":"74.23","chg":"-2.73","chg_percent":"-3.5%","dateTime":"2020-10-30 19:59:59","symbol":"AMD","country":"united-states","id":"85"},{"price":"232.27","high":"237.75","low":"228.66","chg":"-4.87","chg_percent":"-2.05%","dateTime":"2020-10-30 19:59:59","symbol":"CRM","country":"united-states","id":"1324"},{"price":"120.08","high":"123.66","low":"118.80","chg":"-2.78","chg_percent":"-2.26%","dateTime":"2020-10-30 19:59:59","symbol":"NKE","country":"united-states","id":"29"},{"price":"475.74","high":"505.88","low":"472.21","chg":"-28.47","chg_percent":"-5.65%","dateTime":"2020-10-30 19:59:59","symbol":"NFLX","country":"united-states","id":"90"},{"price":"388.04","high":"407.59","low":"379.11","chg":"-22.79","chg_percent":"-5.55%","dateTime":"2020-10-30 19:59:59","symbol":"TSLA","country":"united-states","id":"101"},{"price":"263.11","high":"276.70","low":"259.10","chg":"-17.72","chg_percent":"-6.31%","dateTime":"2020-10-30 19:59:59","symbol":"FB","country":"united-states","id":"112"},{"price":"5.300","high":"5.350","low":"5.130","chg":"-0.140","chg_percent":"-2.57%","dateTime":"2020-10-30 19:59:59","symbol":"UMC","country":"united-states","id":"9961130"},{"price":"83.87","high":"84.75","low":"83.16","chg":"-1.02","chg_percent":"-1.2%","dateTime":"2020-10-30 19:59:59","symbol":"TSM","country":"united-states","id":"6608"},{"price":"361.21","high":"365.83","low":"359.01","chg":"-9.65","chg_percent":"-2.6%","dateTime":"2020-10-30 19:59:59","symbol":"ASML","country":"united-states","id":"119"},{"price":"1621.01","high":"1687.00","low":"1604.46","chg":"+53.77","chg_percent":"3.43%","dateTime":"2020-10-30 19:59:59","symbol":"GOOG","country":"united-states","id":"124"},{"price":"5.94","high":"6.15","low":"5.80","chg":"-0.17","chg_percent":"-2.78%","dateTime":"2020-10-30 19:59:59","symbol":"GPRO","country":"united-states","id":"5534"},{"price":"239.89","high":"265.53","low":"235.88","chg":"-26.98","chg_percent":"-10.11%","dateTime":"2020-10-30 19:59:59","symbol":"SPOT","country":"united-states","id":"9961085"},{"price":"33.41","high":"34.39","low":"33.16","chg":"-0.65","chg_percent":"-1.91%","dateTime":"2020-10-30 19:59:59","symbol":"UBER","country":"united-states","id":"9961127"},{"price":"460.91","high":"495.95","low":"457.02","chg":"-28.77","chg_percent":"-5.88%","dateTime":"2020-10-30 19:59:59","symbol":"ZM","country":"united-states","id":"6508"},{"price":"25.58","high":"26.63","low":"25.48","chg":"-1.16","chg_percent":"-4.34%","dateTime":"2020-10-30 19:59:59","symbol":"WORK","country":"united-states","id":"9961079"},{"price":"110.21","high":"116.21","low":"109.01","chg":"-5.70","chg_percent":"-4.92%","dateTime":"2020-10-30 19:59:59","symbol":"PTON","country":"united-states","id":"5740"}];
// #endregion