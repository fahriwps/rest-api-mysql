import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from "./routes/main.route";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(routes);

app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
});
