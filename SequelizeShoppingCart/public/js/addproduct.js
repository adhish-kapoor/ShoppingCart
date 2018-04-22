let app = new Vue({
    el: "#products",
    data: {
        vendors: [],
        productName: '',
        productPrice: '',
        productVendor: ''

    },
    methods: {
        getVendors: function () {
            axios.get('/admin/getvendors')
                .then(function (res) {
                    let vendorsData = res.data;
                    for (let index in vendorsData) {
                        app.vendors.push({
                            id: vendorsData[index].id,
                            name: vendorsData[index].name
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addProducts: function () {
            var nameProduct = app.productName
            var priceProduct = app.productPrice
            var vendorId = app.productVendor

            if (vendorId == '')
                alert("Cannot add product without Vendor")

            //adding to products table
            axios.post('/admin/addproduct', {
                    name: nameProduct,
                    price: priceProduct,
                    vendorId: vendorId
                })
                .then((response) => {
                    if (response.data.success) {
                        alert("added to db")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    },
    beforeMount() {
        this.getVendors();
    }
});