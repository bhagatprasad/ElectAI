export const environment = {
    production: false,
    fastAPI: {
        url: 'http://localhost:8001/api/v1'
    },

    newsApi: {
        apiKey: 'd79de39d1bb14c9780ef57bff2c4c347',
        url: 'https://newsapi.org/v2/everything'
    },

    hackerNewsApi: 'https://hacker-news.firebaseio.com/v0/topstories.json',

    techCrunchApi: {
        url: 'https://api.rss2json.com/v1/api.json',
        rss: 'https://techcrunch.com/feed/'
    },

    alphaVantageApi: {
        apiKey: '69639e5e0a3e00.23155926',
        url: 'https://www.alphavantage.co/query'
    },

    finnhubApi: {
        apiKey: 'd5hqou1r01qu7bqpfm0gd5hqou1r01qu7bqpfm10',
        url: 'https://finnhub.io/api/v1/quote'
    },

    newsdataApi: {
        apiKey: 'pub_99a3c4c2e46147aeb39c022b28b6d85d',
        url: 'https://newsdata.io/api/1/latest'
    },

    rssProxy: {
        url: 'https://api.rss2json.com/v1/api.json'
    },

    businessRss: {
        economictimes: 'http://localhost:8001/api/v1/rss/economictimes',
        mint: 'http://localhost:8001/api/v1/rss/mint',
        businessStandard: 'http://localhost:8001/api/v1/rss/businessstandard',
        moneycontrol: 'http://localhost:8001/api/v1/rss/moneycontrol',
        ndtvProfit: 'http://localhost:8001/api/v1/rss/ndtvprofit'
    }
};
