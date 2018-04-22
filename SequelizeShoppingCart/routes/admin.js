const route=require('express').Router();
const Vendor = require('../db').Vendor;
const Product=require('../db').Product;
const Cart=require('../db').Cart;

route.get('/addvendors',(req,res)=>{
    Vendor.create({
        name:"ABC Pvt. Ltd."
    }).then((vendor)=>{
        res.status(200).send(vendor)
    }).catch((err)=>{
        res.status(501).send({
            error:"cannot add new vendor"
        })
    })
    
});


route.get('/getvendors',(req,res)=>{
    Vendor.findAll()
    .then((vendors)=>{
        res.status(200).send(vendors);
        
    })
    .catch((err)=>{
        res.status(500).send({
            error: "Unable to find Vendors"            
        })
    })
})

route.post('/addproduct',(req,res)=>{   

    Product.create(req.body)
        .then(product=>{
            res.status(200).send({
                success:true
            })
        })
        .catch(function (err){
            res.status(500).send({
                success: false
            })
        } )
})

route.get('/showproduct',(req,res)=>{
    
    Product.findAll({
        attributes:['id','name','price','vendorId']
    })
    .then((products)=>{
        res.status(200).send(products)
    })
    .catch((err)=>res.status(500).send(err))
})

route.post('/addtocart',(req,res)=>{
    Cart.findOne({
        where:{
            vendorId:req.body.vendorId, //columnName:requested
            productId:req.body.productId
         }
    })
    .then(cart=>{
         Cart.update({
            quantity:cart.quantity+1  //update quantity of existing product
         },{
             where:{
                vendorId:cart.vendorId,
                productId:cart.productId
             }
         })
        
    }).then((cart)=>{
        res.status(200).send({
            success:true
        })
    })
    .catch((err)=>{  //if product doesn't exist
        Cart.create(req.body)
    .then((product)=>{
        res.status(200).send({
            success:true
        })
    })
    .catch((err)=>{
        res.status(500).send({
            success:false
        })
    })
    })
    
})
route.get('/showcart',(req,res)=>{
    Cart.findAll({
        include:[{
           all:true  //both Product and Vendor are included
           
            // include:[{
            // model:Product    
            // }]
           
        }]
    })
    .then((cart)=>{
        //console.log(cart)
        res.status(200).send(cart)
    })
    .catch((err)=>{
        res.status(500).send({
            success:false
        })
})
})
route.post('/decrease',(req,res)=>{
    Cart.findOne({
        where:{
            id:req.body.id
        }
    })
   
    .then(cart=>{
        if(cart.quantity!=1){
        Cart.update({
           quantity:cart.quantity-1  
        },{
            where:{
               id:cart.id
            }

        }).then(cart=>{
            res.status(200).send({
                success:true
            })
        }).catch((err)=>{
            res.status(500).send({
                success:false
            })
        })
    }
    else{
        Cart.destroy({
            where:{
                id:cart.id
            }
        }).then(cart=>{
            res.status(200).send({
                success:true
            })
        }).catch((err)=>{
            res.status(500).send({
                success:false
            })
        })
    }
       
   }).then((cart)=>{
       res.status(200).send({
           success:true
       })
   }) .catch((err)=>{
    res.status(500).send({
        success:false
    })
})

})
route.post('/increase',(req,res)=>{
    Cart.findOne({
        where:{
            id:req.body.id
        }
    })
   
    .then(cart=>{
        Cart.update({
           quantity:cart.quantity+1  
        },{
            where:{
               id:cart.id
            }

        }).then(cart=>{
            res.status(200).send({
                success:true
            })
        }).catch((err)=>{
            res.status(500).send({
                success:false
            })
        })
       
   }).then((cart)=>{
       res.status(200).send({
           success:true
       })
   }) .catch((err)=>{
    res.status(500).send({
        success:false
    })
})
})
module.exports = route;