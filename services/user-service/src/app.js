const express = require('express');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/profile', require('./middlewares/auth'), (req, res) => {
  res.json({ user: req.user.toJSON() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});

module.exports = app;