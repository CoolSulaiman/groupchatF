const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const Usergroup = sequelize.define('usergroup' , {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        allowNull : false, 
        default : false
    },
    userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      groupId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'groups',
          key: 'id'
        }
      }
})

module.exports = Usergroup;
