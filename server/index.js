import app from './app.js';
import connection from './database/database.js';

const port = 8080;
app.listen(port, () => {
    console.log('server running on', port);
})
connection();