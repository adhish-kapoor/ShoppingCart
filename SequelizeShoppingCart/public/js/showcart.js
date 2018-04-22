let app = new Vue({
    el: "#products",
    data: {
        carts:[],
        sum:0
    },
    methods: {
        showCart() {
            axios.get('/admin/showcart')
                .then((response) => {
                    // console.log(response.data)
                    app.carts = response.data
                    for(let i in app.carts){
                        app.sum = parseInt(app.sum) + parseInt(app.carts[i].quantity) * 
                                                parseInt(app.carts[i].product.price)
                    }
                    
                })
                .catch((err) => console.log(err))
        },
        decreaseQuantity(id) {
            axios.post('/admin/decrease', {
                    id: id
                })
                .then((response) => {
                    if (response.data.success) {
                        this.showCart();
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        increaseQuantity(id) {
            axios.post('/admin/increase', {
                    id: id
                })
                .then((response) => {
                    if (response.data.success) {
                        this.showCart();
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
       
    },
    beforeMount(){
        this.showCart();
    }

})



