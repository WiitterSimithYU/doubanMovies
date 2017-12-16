exports.install = function (Vue, options) {
    Vue.prototype.$api = {
        hostname: 'https://api.douban.com',
        coming_soon: '/v2/movie/coming_soon',
        in_theaters: '/v2/movie/in_theaters',
        top250: '/v2/movie/top250',
        subject: '/v2/movie/subject/',
        search: '/v2/movie/search'
    }
}