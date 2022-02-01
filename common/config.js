module.exports = (function () {
    console.log("Env: ", process.env.NODE_ENV);

    switch (process.env.NODE_ENV) {
        case "development":
            return {
                DB_HOST: 'localhost',
                DB_USER: 'root',
                DB_PASSWORD: 'harish#1',
                DB: 'test',
                PORT: 3001,
                URL: 'mongodb://localhost:27017/test',
                DB_MONGO: 'test'
            };

        case "production":
            return {
                DB_HOST: '',
                DB_USER: '',
                DB_PASSWORD: '',
                DB: '',
                PORT: 3001,
                URL: '',
                DB_MONGO: ''
            };

        default:
            return {
                DB_HOST: 'localhost',
                DB_USER: 'root',
                DB_PASSWORD: 'harish#1',
                DB: 'test',
                PORT: 3001,
                URL: 'mongodb://localhost:27017',
                DB_MONGO: 'test'
            };
    }
})();