import mongoose, { Schema, model, connect, ObjectId } from 'mongoose';


// 1. Create an interface representing a document in MongoDB.
interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  avatar?: string;
}

interface IProduct{
  product: string;
  property:mongoose.Types.ObjectId;
  price: String
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String},
  email: { type: String},
  avatar: String
});
const productSchema= new Schema<IProduct>({
  product: { type: String },
  property:{type: Schema.Types.ObjectId,required: true, ref: 'User'},
  price: String
})
// 3. Create a Model.
const User = model('User', userSchema);

const Product = model('Product', productSchema);


run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/test');

  const user1= new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });

   await user1.save(); 

  const product1= new Product({
    product: 'Coke',
    price: '1€',
    property: user1._id
  });

  await product1.save();


  
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

  const newUser2= new User(user3); 

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

  const getUser = async () => {
    const user = await User.findOne({ name: 'Amparo' });
    console.log('Found User:', user);
  };
  await getUser();

 const updateUser = async () => {
  const result = await User.updateOne(
    { name: 'Billion' },
    { email: 'Javier@initech.com' }
  );
  console.log('Update Result:', result);
};
await updateUser();


const deleteUser = async () => {
  const result = await User.findOneAndDelete({name: 'Amparo'});
  console.log('Delete Result:', result);
}

deleteUser();


  
  const newUser1= new User(user2);
   
   
  await newUser1.save();
  await newUser2.save();
  
  
  console.log(user1.email); // 'bill@initech.com'
  console.log(newUser1.name);
  console.log(newUser2.name);
  const productWithUser = await Product.findOne({ product: 'Coke' }).populate('property');
  console.log('el producto es:',productWithUser);
  

  

  

}



