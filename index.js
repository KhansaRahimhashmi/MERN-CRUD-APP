import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/Users';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

app.get('/', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({_id: id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, age: req.body.age })
    .then(updatedUser => {
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(updatedUser);
      }
    })
    .catch(err => res.json(err));
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
