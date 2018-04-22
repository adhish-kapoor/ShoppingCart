let app = new Vue({
    el: "#products",
    data: {
        products:[]
        
    },
    methods: {
        showProducts: function () {
            axios.get('/admin/showproduct')
                .then(function (response) {
                    app.products = response.data;

                })
                .catch((err) => console.log(err))
        },
        addToCart(productId, vendorId) {
            axios.post('/admin/addtocart', {
                    productId: productId,
                    vendorId: vendorId,
                    quantity: 1
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
       
    },
    beforeMount() {
        this.showProducts();
    }

})