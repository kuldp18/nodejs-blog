require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// routes
const blogRoutes = require('./routes/blogRoutes');

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.dbURI)
  .then(() => {
    console.log('DB Connected!');
    // listen for req
    app.listen(PORT, (req, res) => {
      console.log(`Listening at ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// set view engine
app.set('view engine', 'ejs');

// *middleware: static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// *middleware: logger
app.use(morgan('tiny'));

// routes

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Error' });
});
