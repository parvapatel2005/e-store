const dotenv = require('dotenv');

dotenv.config();
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const User = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ProductRouter = require('./routes/ProductRoute.js');
const ContactRouter = require('./routes/ContactRoute.js');
const CategoryRouter = require('./routes/CategoryRouter.js');
const AddToCartRouter = require('./routes/addToCartRoute.js')
const OrderRouter = require('./routes/orderRoutes.js')


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(cors({origin: ["https://e-stores-orcin.vercel.app","http://localhost:5173"]}));

app.use(express.json());
app.use('/upload',express.static('upload'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { email, fullName, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      fullName,
      phoneNumber,
      password: hashedPassword
    });

    await user.save();

    res.status(200).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error",err: err.message });
  }
})

app.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {userId: user._id,role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(200).json({ 
      message: "Login successful" , 
      token , 
      userEmail: user.email, 
      userRole: user.role, 
      userFullName: user.fullName
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use('/api/products', ProductRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/contact', ContactRouter);
app.use('/api', AddToCartRouter);
app.use('/api', OrderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})