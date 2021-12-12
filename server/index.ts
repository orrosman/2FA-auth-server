import express = require('express');
import cors = require('cors');
const port = 3001;
const app = express();

app.use(cors());

app.get('/', (_req, res) => {
	res.send('testing server');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
