import { Schema, model, connect } from 'mongoose';


// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String},
  email: { type: String},
  avatar: String
});

// 3. Create a Model.
const User = model('User', userSchema);


run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/test');

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };
  
  const user2:  IUser = {
    "name": 'Billy',
    "email": 'billilial@initech.com',
    //"avatar": 'https://i.imgur.com/dM7Thhn.png'
  };

  const user3:  IUser = {
    "name": 'Billion',
    "email": 'billic@initech.com',
    //"avatar": 'https://i.imgur.com/dM7Thhn.png'
  };

  const createUser = async () => {
    const user4 =  new User({
         name: 'Javier',
         email: 'jv@initech.com',
     })
 
     const user5 =  new User({
         name: 'Amparo',
         email: 'Amparo@initech.com',
         avatar: 'https://i.imgur.com/dM7Thhn.png'
     })
     await user4.save();
     await user5.save();
     console.log(user4);
     console.log(user5);
  }
  createUser();

  async function getUser() {
    const user = await User.findOne({name: 'Amparo'});
    console.log(user)
 }
 getUser();

 async function updateUser() {
  const user = await User.updateMany({name: 'Bill'}, {
      email:'bill1@initech.com'
  });
  //console.log(user)
}
updateUser();

const deleteUser = async () => {
  const result = await User.deleteMany({name: 'Billy'});
  console.log(result)
}


  const newUser= new User(user1);
  const newUser1= new User(user2);
  const newUser2= new User(user3);
  await newUser.save();
  await newUser1.save();
  await newUser2.save();

  console.log(newUser.email); // 'bill@initech.com'
  console.log(newUser1.name);
  console.log(newUser2.name);

  deleteUser();

  

}



