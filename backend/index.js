import { startDB } from './db.js';
import express from 'express';
import routes from './routes/index.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(4000, () => {
  console.log('Server is running on port 4000')
})
