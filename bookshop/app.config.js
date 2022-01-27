module.exports = {
    devServer: {
        proxy: {
            "/api": "http://[::1]:8090"
        },
    }
}