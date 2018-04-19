let app = new Vue({
    el: "#products",
    data:{
        vendors:[],
        products:[],
        productName:'',
        productPrice:'',
        productVendor:''
    },
    methods:{
        showAddProductsPage:function(){
        
            document.getElementById('addproducts').style.display = "block";
            axios.get('/admin/getvendors')
            .then(function (res) {                
                let vendorsData = res.data;
                for(let index in vendorsData){
                    app.vendors.push({
                        id:vendorsData[index].id,
                        name:vendorsData[index].name
                    });
                }      
               // alert('hi');          
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addProducts: function(){
            var nameProduct = app.productName
            var priceProduct =app.productPrice
            var vendorId = app.productVendor

            // document.getElementById("name").innerHTML=nameProduct
            // alert(nameProduct);
            // alert(priceProduct);
            console.log(vendorId);

            axios.post('/admin/addproduct',{name:nameProduct,price:priceProduct,vendorId:vendorId})
            .then((response) => {
                if(response.data.success){
                    alert("added to db")
                }
            })
            .catch(function (error) {
                console.log(error)
            });
        }
    }
});