const mysql = require('mysql');
const pool = mysql.createPool({
    host: "localhost",
    user: "deepika",
    password: "Admin@123",
    port: "3306",
    database: "Demo",
});

pool.getConnection((err) => {
    if (err) {
        console.log('error connecting to db', err.stack);
        process.exit(1);
    } else {
        console.log("Successfully Connected to Database");
    }

});
const ExeQuery = (query, arrayParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrayParams,(err,data)=> {
                if (err){
                    console.log("Error executing the query")
                    reject(err)
                }
                resolve(data);
            });
        } catch (err) {
                reject(err);
        }
    });
};

module.exports = {
    ExeQuery
}
