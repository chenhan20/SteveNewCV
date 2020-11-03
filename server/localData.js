let localData = {};

localData['PROJECT'] = {
  CARELINE: {
    name: "CARELINE",
    friendlyname: "英國凱萊後台開發案",
    startDate: "2018/12/17",
    endDate: "",
    contentText: `英國凱萊保險公司開發後台系統`,
    projectList: [
      "機車險API串接(泰安)",
      "旅平險(Portal)後台相關功能",
      "寵物險(Portal)後台相關功能",
      "機車險線下單相關功能",
      "寵物險線下單相關功能"
    ],
    isWork: true
  },
  WISTRON: {
    name: "WISTRON",
    friendlyname: "緯創軟體(誠品開發案)",
    startDate: "2018/05/01",
    endDate: "2018/12/14",
    contentText: `開發誠品後台系統(關貿合作)
                    全端開發 後端使用(Java) - 前端使用(jQuery、Bootstrap、javascript)
                    從靜態頁面撰寫到專案開發、專案SIT、UAT都有經歷，
                    這次的專案讓我學到了從專案初期`,
    projectList: ["靜態頁面撰寫", "需求訪談", "程式底層撰寫"],
    isWork: true
  },
  MARYA_TWM_MAINTAIN_2: {
    name: "MARYA_TWM_MAINTAIN_2",
    friendlyname: "POS維運專案",
    startDate: "2017/11/01",
    endDate: "2018/04/31",
    contentText: `維運Pos系統與開發新功能，重大開發專案為:`,
    projectList: [
      "悠遊卡公司Ftp對接傳遞檔案",
      "統一立即儲值專案(傳遞xml並改寫原先儲值專案)"
    ],
    isWork: true
  },
  MARYA_TWM_STRATUS: {
    name: "MARYA_TWM_STRATUS",
    friendlyname: "Struts下架專案",
    startDate: "2017/07/01",
    endDate: "2017/10/31",
    contentText: `Struts下架轉換SpringMVC、配合悠遊卡FTP上傳下載
        因應Struts經常出現漏洞，故協助轉換為SpringMVC框架
        此專案讓我對servlet有更深入的了解，並在主管指導下
        第一次做了系統分析(分析新的與舊的優劣)與規劃修改時程表
        讓我了解到SA職位也不是出一張嘴就能做得很好的。`,
    projectList: [],
    isWork: true
  },
  MARYA_TWM_MAINTAIN_1: {
    name: "MARYA_TWM_MAINTAIN_1",
    friendlyname: "POS系統維運專案",
    startDate: "2017/02/01",
    endDate: "2017/06/31",
    contentText: `回到POS系統(Struts-Spring-hibernated框架，搭配前端Extjs)`,
    projectList: ["POS銷售富邦唯信支付增加付款別", "新增倉別(客訴倉、退貨倉…)"],
    isWork: true
  },
  ARMY_ONLINE: {
    name: "ARMY_ONLINE",
    friendlyname: "國軍ONLINE",
    startDate: "2016/10/01",
    endDate: "2017/02/01",
    contentText: `當兵`,
    projectList: ["早點名", "親愛精誠", "睡覺"],
    isWork: false
  },
  MARYA_TWM_ADD_NUM: {
    name: "MARYA_TWM_ADD_NUM",
    friendlyname: "POS店點擴碼專案",
    startDate: "2016/04/01",
    endDate: "2016/10/01",
    contentText: `轉換到POS系統-使用Java語言
        當時專案為需要新增三碼的店點，故有些程式碼需要修正
        例如:substring-只抓兩碼，與做壓力測試(使用JUnit)
        與撰寫測試報告，算是對Java有一個基礎的了解。`,
    projectList: [],
    isWork: true
  },
  MARYA_TWM_MONEY_COMMISSION: {
    name: "MARYA_TWM_MONEY_COMMISSION",
    friendlyname: "佣金系統維運專案",
    startDate: "2015/07/01",
    endDate: "2016/04/01",
    contentText: `開始於瑪亞資訊實習，駐點某電信業龍頭的佣金Team
          當時專案是使用C#與Oracle資料庫，了解各種PL/SQL語法與
          資料庫基本觀念要看懂可能有幾百行的PL/SQL並了解裡面排名
          、計量等公式，並將他套用到程式裡對當時只有在上課學過
          mysql的我是一大挑戰。`,
    projectList: [],
    isWork: true
  }
};

//#region defaultData 
localData['TestStockDataList'] =  [{"price":"44.28","high":"44.80","low":"43.61","chg":"+0.17","chg_percent":"0.39%","dateTime":"2020-10-30 19:59:59","symbol":"INTC","country":"united-states","id":"4"},{"price":"121.25","high":"121.75","low":"119.09","chg":"-0.29","chg_percent":"-0.24%","dateTime":"2020-10-30 19:59:59","symbol":"DIS","country":"united-states","id":"6"},{"price":"56.11","high":"56.64","low":"55.45","chg":"+0.09","chg_percent":"0.16%","dateTime":"2020-10-30 19:59:59","symbol":"ORCL","country":"united-states","id":"1145"},{"price":"108.86","high":"111.99","low":"107.72","chg":"-6.46","chg_percent":"-5.6%","dateTime":"2020-10-30 19:59:59","symbol":"AAPL","country":"united-states","id":"15"},{"price":"3036.15","high":"3167.00","low":"3019.00","chg":"-174.86","chg_percent":"-5.45%","dateTime":"2020-10-30 19:59:59","symbol":"AMZN","country":"united-states","id":"56"},{"price":"357.62","high":"363.85","low":"355.79","chg":"-7.24","chg_percent":"-1.98%","dateTime":"2020-10-30 19:59:59","symbol":"COST","country":"united-states","id":"60"},{"price":"501.36","high":"517.46","low":"492.00","chg":"-19.60","chg_percent":"-3.76%","dateTime":"2020-10-30 19:59:59","symbol":"NVDA","country":"united-states","id":"74"},{"price":"67.20","high":"68.88","low":"66.26","chg":"-1.66","chg_percent":"-2.41%","dateTime":"2020-10-30 19:59:59","symbol":"VFC","country":"united-states","id":"1157"},{"price":"350.13","high":"353.73","low":"345.65","chg":"-2.31","chg_percent":"-0.66%","dateTime":"2020-10-30 19:59:59","symbol":"LMT","country":"united-states","id":"1163"},{"price":"138.75","high":"140.09","low":"137.37","chg":"-1.17","chg_percent":"-0.84%","dateTime":"2020-10-30 19:59:59","symbol":"WMT","country":"united-states","id":"18"},{"price":"83.66","high":"84.05","low":"82.58","chg":"+0.23","chg_percent":"0.28%","dateTime":"2020-10-30 19:59:59","symbol":"SNE","country":"united-states","id":"1979"},{"price":"50.34","high":"50.43","low":"49.30","chg":"-0.14","chg_percent":"-0.28%","dateTime":"2020-10-30 19:59:59","symbol":"MU","country":"united-states","id":"81"},{"price":"75.29","high":"77.70","low":"74.23","chg":"-2.73","chg_percent":"-3.5%","dateTime":"2020-10-30 19:59:59","symbol":"AMD","country":"united-states","id":"85"},{"price":"232.27","high":"237.75","low":"228.66","chg":"-4.87","chg_percent":"-2.05%","dateTime":"2020-10-30 19:59:59","symbol":"CRM","country":"united-states","id":"1324"},{"price":"120.08","high":"123.66","low":"118.80","chg":"-2.78","chg_percent":"-2.26%","dateTime":"2020-10-30 19:59:59","symbol":"NKE","country":"united-states","id":"29"},{"price":"475.74","high":"505.88","low":"472.21","chg":"-28.47","chg_percent":"-5.65%","dateTime":"2020-10-30 19:59:59","symbol":"NFLX","country":"united-states","id":"90"},{"price":"388.04","high":"407.59","low":"379.11","chg":"-22.79","chg_percent":"-5.55%","dateTime":"2020-10-30 19:59:59","symbol":"TSLA","country":"united-states","id":"101"},{"price":"263.11","high":"276.70","low":"259.10","chg":"-17.72","chg_percent":"-6.31%","dateTime":"2020-10-30 19:59:59","symbol":"FB","country":"united-states","id":"112"},{"price":"5.300","high":"5.350","low":"5.130","chg":"-0.140","chg_percent":"-2.57%","dateTime":"2020-10-30 19:59:59","symbol":"UMC","country":"united-states","id":"9961130"},{"price":"83.87","high":"84.75","low":"83.16","chg":"-1.02","chg_percent":"-1.2%","dateTime":"2020-10-30 19:59:59","symbol":"TSM","country":"united-states","id":"6608"},{"price":"361.21","high":"365.83","low":"359.01","chg":"-9.65","chg_percent":"-2.6%","dateTime":"2020-10-30 19:59:59","symbol":"ASML","country":"united-states","id":"119"},{"price":"1621.01","high":"1687.00","low":"1604.46","chg":"+53.77","chg_percent":"3.43%","dateTime":"2020-10-30 19:59:59","symbol":"GOOG","country":"united-states","id":"124"},{"price":"5.94","high":"6.15","low":"5.80","chg":"-0.17","chg_percent":"-2.78%","dateTime":"2020-10-30 19:59:59","symbol":"GPRO","country":"united-states","id":"5534"},{"price":"239.89","high":"265.53","low":"235.88","chg":"-26.98","chg_percent":"-10.11%","dateTime":"2020-10-30 19:59:59","symbol":"SPOT","country":"united-states","id":"9961085"},{"price":"33.41","high":"34.39","low":"33.16","chg":"-0.65","chg_percent":"-1.91%","dateTime":"2020-10-30 19:59:59","symbol":"UBER","country":"united-states","id":"9961127"},{"price":"460.91","high":"495.95","low":"457.02","chg":"-28.77","chg_percent":"-5.88%","dateTime":"2020-10-30 19:59:59","symbol":"ZM","country":"united-states","id":"6508"},{"price":"25.58","high":"26.63","low":"25.48","chg":"-1.16","chg_percent":"-4.34%","dateTime":"2020-10-30 19:59:59","symbol":"WORK","country":"united-states","id":"9961079"},{"price":"110.21","high":"116.21","low":"109.01","chg":"-5.70","chg_percent":"-4.92%","dateTime":"2020-10-30 19:59:59","symbol":"PTON","country":"united-states","id":"5740"}];
// #endregion

module.exports = localData;
