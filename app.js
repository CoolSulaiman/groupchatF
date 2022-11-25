const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const sequelize = require('./util/database')
const app = express();

require('dotenv').config()
const User = require('./models/user');
const Chat = require('./models/Chat')
const UserGroup=require('./models/userGroup')
const Group=require('./models/group')

const userRouter = require('./routes/user');
const groupRouter = require('./routes/group')
const messageRouter = require('./routes/message');


app.use(express.json())
app.use(cors());
app.use(bodyParser.json({extended:false}))

User.belongsToMany(Group,{through:UserGroup})
Group.belongsToMany(User,{through:UserGroup})




app.use(userRouter)
app.use('/group',groupRouter)
app.use(messageRouter)

User.hasMany(Chat)
Chat.belongsTo(User)

Group.hasMany(Chat);
Chat.belongsTo(Group);


sequelize
.sync()
// .sync({force:true})

.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})