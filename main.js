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
            :class="{disabledButton: !inStock}">
            Add to Cart</button>
    <product-review @review-submitted="addReview"></product-review>
    <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length" >There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>{{ review.review }}</p>
            <p>{{ review.rating }}</p>
             </li>
        </ul>
    </div>
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
            reviews: []
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart',  this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
    <b>Please correct those following errors.</b>
    <ul>
    <li v-for="error in errors">
    {{error}}
        
</li>
</ul>
</p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit" @submit.prevent="onSubmit">  
      </p>    
    
    </form>
`,
    data() {
        return {
            name: null,
            review: null,
            rating: 5,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if (this.name && this.review && this.rating) {
                let productReview ={
                    name:this.name,
                    review:this.review,
                    rating: this.rating
                }
            }
            else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
            }

            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
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



