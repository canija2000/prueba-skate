const express = require('express');
const app = express();
const port = 3000;
const routes = require('./scripts/routes/routes');
const  hbs  = require('express-handlebars');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    limits : {fileSize: 5000000}  //5mb
}));


app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}));
app.set('view engine', 'hbs');



app.use('/', routes);

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});

