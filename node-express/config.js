var config = {
    development: {
        database: {  
            host     : 'localhost',
            user     : 'root',
            password : 'asdfasdf',
            port : 3306,
            name : 'ebdb'
        }
    },
    production: {
        database: {
            host     : 'aa1h0mgh57eoqxv.cagxvqgtc5mi.us-west-2.rds.amazonaws.com',
            user     : 'steven',
            password : 'sabbatical',
            port     : 3306,
            name : 'ebdb'
        }
    }
};
module.exports = config;