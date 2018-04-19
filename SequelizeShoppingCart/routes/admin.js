const route=require('express').Router();
const Vendor = require('../db').Vendor;
const Product=require('../db').Product;

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
        // console.log("a*********")
        // console.log(vendors)
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
   // console.log(req.body)
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

module.exports = route;