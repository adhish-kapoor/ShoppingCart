const Sequelize=require('Sequelize')

const db= new Sequelize('shopdb','root','root',{
    host:'localhost',
    dialect:'mysql'
})

const Vendor=db.define('vendors',{
    name:{
        type:Sequelize.STRING,
        allowNull:false    
    }
})

const Product=db.define('products',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
   
    price:{
        type:Sequelize.FLOAT,
        defaultvalue:0.0
    }
})

Product.belongsTo(Vendor)   //will add vendorid attribute to product

const Cart=db.define('carts',{
   quantity:{
       type:Sequelize.INTEGER,
       defaultValue:1
   }
})
Cart.belongsTo(Vendor)
Cart.belongsTo(Product)


db.sync()
.then(()=>console.log("Database synced"))
.catch((err)=>console.log("error"))

module.exports={
     Vendor,
     Product
}