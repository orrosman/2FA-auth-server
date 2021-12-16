import express = require('express');
import cors = require('cors');
const port = 3001;
const { router: auth } = require('./routers/auth');
const user = require('./routers/users');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', auth);
app.use('/user', user);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
