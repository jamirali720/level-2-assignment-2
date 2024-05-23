# level-2-assignment-2



#### Express Typescript project

 *  Express Typescript project's code has been deployed github: [Go to the github](https://github.com/jamirali720/level-2-assignment-2) 
 *  Express Typescript project Live server has been deployed in vercel: [Go to vercel](https://level-2-assignment-2-github.vercel.app) 


#### How to run the application locally

Firstly to run the application have to install dependency :   
* Run command in CLI -  npm install.   
* all dependency will be  install.
* this project has been validated using zod.

#### Create new product 
    I have created a route  myServerLink/api/products: in which I can create new product.

##### Retrieve a List of All Products
 1. I have create a route  myServerLink/api/products: in which I can get all products.   
 2. I can get products by searching with searchTerm : such as myServerLink/api/products?searchTerm=iphone   
 3. If there is no searchTerm, return all products,   
 4. Products searching will be in three criteria : such as    
    - products searched by name.  
    - products searched by description.
    - products searched by category.
#### Retrieve a Specific Product by ID:
1. I have created a route  myServerLink/api/products:productId . productId as a params 
2. Product will be returned as specific productId. 
#### Update Product by ID:
1. I have created a route  myServerLink/api/products:productId . productId as a params 
2. product will be updated as specific productId.

 * If a product  has to update all properties , then: product all properties will be provided like this. 

 ```javascript
    
     {
        "name": "iPhone 13",
        "description": "A sleek and powerful smartphone with cutting-edge features.",
        "price": 999,
        "category": "Electronics",
        "tags": ["smartphone", "Apple", "iOS"],
        "variants": [
            {
                "type": "Color",
                "value": "Midnight Blue"
            },
            {
                "type": "Storage Capacity",
                "value": "256GB"
            }
        ],
        "inventory": {
            "quantity": 50,
            "inStock": true
        }
    
    }

 ```  


#### Partial Update product
    *  If a product  has to update partial properties , then: product partial properties will be provided like this.
```javascript
    inventory: {
            "quantity": 50,
            "inStock": true
        }
``` 


####  Delete a Product : 
 * I have created a route  myServerLink/api/products:productId. productId has been received as a params 
 * Then product will be deleted from database permanently 

#### Create a New Order:
 * I have created a route  myServerLink/api/orders.
 * In which I can create new order.
 * While creating  new order, order quantity will check with the product quantity. if order quantity greater then product quantity, then return error message :Insufficient quantity available in inventory. Otherwise new order will be proceeded. 
 * If product.inventory.quantity === 0, then product.inventory.inStock = false



#### Retrieve All Orders and retrieve Orders by User Email:

 * I have created a route  myServerLink/api/orders.
 * In which I can get all orders. 
 * I can get orders by query  such as myServerLink/api/orders?email=level2@programming-hero.com   
 * If there is no query email, return all orders. 

#### Error Handling: 
 * If product quantity less than order quantity, then throw error message: "Insufficient quantity available in inventory" 
 * If Product not found by specific Id, then throw error message : product not found
 * If order not found by specific user email, then throw error message : orders not found
 * If unwanted route will be hit, then throw error message : Route not found

