import {createConnection} from 'mysql';

const conn = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Menu_vegan_DB'
});

conn.connect(err =>{
    if (err) throw err;
    console.log("Conexión a la DB ok!");
});

export default conn;