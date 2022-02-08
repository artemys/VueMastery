Vue.component('product', {
    props  :{
      premium: {
          type: Boolean,
          required: true
      }
    },
    template: `
    <div class="product" >
        <div class="product-image" >
            <img :src="image">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>

            <p v-if="inStock > 10">In stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0 ">Almost sold out !</p>
            <p v-else>Sold Out !</p>
            <p> Shipping: {{ shipping }}</p>            

            <ul>
                <li v-for="detail in details"> {{ detail }} </li>
            </ul>

            <div v-for="(variant, index) in variants"
                 :key="variant.variantsId"
                 class="color-box"
                 :style="{backgroundColor: variant.variantColor}"
                 @mouseover="updateProduct(index)">
            </div>
            
                
    <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{disabledButton: !inStock}">Add to Cart</button>

        </div>
    </div>`,
    data() {
        return {
                brand: 'Vue Mastery',
                product:'Socks:',
                description:'A pair of warm, fuzzy socks',
                inventory:10,
                selectedVariant:0,
                onSale:false,
                details: ["80% Coton", "Gender neutral", "20% Polyester"],
                variants: [
                    {
                        variantId: 2234,
                        variantColor:"green",
                        variantImage:"https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
                        variantQuantity: 10
                    },
                    {
                        variantId: 2235,
                        variantColor:"blue",
                        variantImage:"https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
                        variantQuantity: 0
                    }
                ],
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart',  this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
    },
    computed: {
        title() {
            return this.brand +' '+ this.product +' '+ this.description
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "free"
            }
            return "5,99"
        }
    },
})


var app= new Vue({
    el: '#app',
    data: {
        premium: false,
        cart:[],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})



