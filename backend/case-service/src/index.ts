import express from 'express';
import cors from 'cors';
import casesRouter from './routes/cases';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/cases', casesRouter);

app.get('/', (req, res) => {
  res.send('ELF Automation Case Service is running.');
});

app.listen(PORT, () => {
  console.log(`Case Service listening on port ${PORT}`);
}); 