import { app } from './server';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`RESTful server listening on port: ${PORT}`);
});
