import express = require('express');
import cors = require('cors');
const port = 3001;
const auth = require('./routers/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', auth);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
