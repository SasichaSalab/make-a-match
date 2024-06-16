const products = [
    {
        "id": 1,
        "productName": "blue shirt",
        "productDescription": "ccccc",
        "productPrice": 150.0,
        "details": [
            {
                "id":1,
                "color": "blue",
                "productSizes": [
                    {
                        "quantity": "10",
                        "size": "S"
                    },
                    {
                        "quantity": "15",
                        "size": "M"
                    }
                ],
                "product_image": "https://dictionary.cambridge.org/images/thumb/shirt_noun_002_33400.jpg?version=6.0.15"
            },
            {
                "id":2,
                "color": "red",
                "productSizes": [
                    {
                        "quantity": "10",
                        "size": "S"
                    },
                    {
                        "quantity": "15",
                        "size": "M"
                    },
                    {
                        "quantity": "15",
                        "size": "L"
                    },
                    {
                        "quantity": "15",
                        "size": "XL"
                    }
                ],
                "product_image": "https://prd.cc.duluthtrading.com/on/demandware.static/-/Sites-dtc-master-catalog/default/dw13c50eee/images/large/76020_EBR.jpg"
            }
        ],
        "tag": "SHIRT"
    },
    {
        "id": 2,
        "productName": "red shirt",
        "productDescription": "aaaaa",
        "productPrice": 160.0,
        "details": [
            {
                "id":3,
                "color": "red",
                "productSizes": [
                    {
                        "quantity": "8",
                        "size": "S"
                    },
                    {
                        "quantity": "12",
                        "size": "M"
                    }
                ],
                "product_image": "https://uniworthdress.com/uploads/product/c06a513905de33b7e59742454822a84a.jpg"
            },
            {
                "id":4,
                "color": "brown",
                "productSizes": [
                    {
                        "quantity": "8",
                        "size": "S"
                    },
                    {
                        "quantity": "12",
                        "size": "M"
                    }
                ],
                "product_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvszpsj8ND16oTzMyjhzimqiTtwU_07J_-Ug&s"
            },
            {
                "id":5,
                "color": "green",
                "productSizes": [
                    {
                        "quantity": "8",
                        "size": "S"
                    },
                    {
                        "quantity": "12",
                        "size": "M"
                    }
                ],
                "product_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOuc6icET_l-qdlvAzC30pABclAngEBzBL9g&s"
            }
        ],
        "tag": "SHIRT"
    },
    {
        "id": 3,
        "productName": "green shirt",
        "productDescription": "bbbbb",
        "productPrice": 140.0,
        "details": [
            {
                "id":6,
                "color": "green",
                "productSizes": [
                    {
                        "quantity": "7",
                        "size": "S"
                    },
                    {
                        "quantity": "10",
                        "size": "L"
                    }
                ],
                "product_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQdhdfibxIdrm3Ql9CTrlxCCI15iODxUaZeVx4UeFWbNSFtY4XMDcnVqon0abgU54fus&usqp=CAU"
            }
        ],
        "tag": "SHIRT"
    },
    {
        "id": 4,
        "productName": "black pants",
        "productDescription": "ddddd",
        "productPrice": 200.0,
        "details": [
            {
                "id":7,
                "color": "black",
                "productSizes": [
                    {
                        "quantity": "5",
                        "size": "M"
                    },
                    {
                        "quantity": "6",
                        "size": "L"
                    }
                ],
                "product_image": "https://outfitters.com.pk/cdn/shop/products/F0808106901_3.jpg?v=1704259563"
            }
        ],
        "tag": "PANTS"
    },
    {
        "id": 5,
        "productName": "white dress",
        "productDescription": "eeeee",
        "productPrice": 250.0,
        "details": [
            {
                "id":8,
                "color": "white",
                "productSizes": [
                    {
                        "quantity": "4",
                        "size": "S"
                    },
                    {
                        "quantity": "6",
                        "size": "M"
                    }
                ],
                "product_image": "https://flyingcart.pk/cdn/shop/files/WHITEFRONT.jpg?v=1705320206&width=1946"
            }
        ],
        "tag": "DRESS"
    },
    {
        "id": 6,
        "productName": "yellow dress",
        "productDescription": "fffff",
        "productPrice": 230.0,
        "details": [
            {
                "id":9,
                "color": "yellow",
                "productSizes": [
                    {
                        "quantity": "9",
                        "size": "M"
                    },
                    {
                        "quantity": "11",
                        "size": "L"
                    }
                ],
                "product_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIaKWhnAcdxPgBufB8CPBXxtHJSYUKx-Ktyg&s"
            }
        ],
        "tag": "DRESS"
    },
    {
        "id": 7,
        "productName": "blue jeans",
        "productDescription": "ggggg",
        "productPrice": 180.0,
        "details": [
            {
                "id":10,
                "color": "blue",
                "productSizes": [
                    {
                        "quantity": "20",
                        "size": "M"
                    },
                    {
                        "quantity": "22",
                        "size": "L"
                    }
                ],
                "product_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEGeyfEbWhhywEYw89de-3B0VEKGXhltulnA&s"
            }
        ],
        "tag": "JEANS"
    },
    {
        "id": 8,
        "productName": "grey hoodie",
        "productDescription": "hhhhh",
        "productPrice": 190.0,
        "details": [
            {
                "id":11,
                "color": "grey",
                "productSizes": [
                    {
                        "quantity": "15",
                        "size": "M"
                    },
                    {
                        "quantity": "18",
                        "size": "L"
                    }
                ],
                "product_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLXunBhgxv-VmxTq9GhVuXvvcgSugz_WkkQ&s"
            }
        ],
        "tag": "HOODIE"
    },
    {
        "id": 9,
        "productName": "brown shoes",
        "productDescription": "iiiii",
        "productPrice": 300.0,
        "details": [
            {
                "id":12,
                "color": "brown",
                "productSizes": [
                    {
                        "quantity": "10",
                        "size": "42"
                    },
                    {
                        "quantity": "15",
                        "size": "43"
                    }
                ],
                "product_image": "https://blackberrys.com/cdn/shop/files/formal-shirt-in-wine-basim-blackberrys-clothing-1.jpg?v=1685948004"
            }
        ],
        "tag": "SHOES"
    },
    {
        "id": 10,
        "productName": "black shoes",
        "productDescription": "jjjjj",
        "productPrice": 320.0,
        "details": [
            {
                "id":13,
                "color": "black",
                "productSizes": [
                    {
                        "quantity": "12",
                        "size": "41"
                    },
                    {
                        "quantity": "18",
                        "size": "42"
                    }
                ],
                "product_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpe8FlUDgYvWItvm5jEFHrn2688CQPd4wgA&s"
            }
        ],
        "tag": "SHOES"
    }
];

module.exports = products;