const express = require('express');
const cors = require('cors');
const {connectDb} = require('./config/db.config');
const { errorHandler } = require('./utils/errorHandler');
const app = express();

app.use(express.json());
app.use(cors());




app.get('/', (req, res,next) => {
    try {
        // throw new Error('Test Error Handling Middleware');
       res.send('Server is running !' );
    } catch (error) {
        next(error);
    }
});

app.use('/api/', require('./routes/base.routes'));

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    connectDb();
    console.log(`Server is listening on port ${port}`);
});