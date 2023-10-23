var db = require('../config/connection')
var collection = require('../config/collection')
var ObjectId = require('mongodb').ObjectId
module.exports = {

  addProduct: (products, callback) => {
    //  console.log(products);
    db.get().collection('products').insertOne(products).then((data) => {
      console.log(data)
      callback(data.ops[0]._id)
    })
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
      resolve(products)
    })
  },
  deleteProduct: (proId) => {
    return new Promise((resolve, reject) => {
      db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: ObjectId(proId) }).then((response) => {
        console.log(response)
        resolve(response)
      })
    })
  },

  getProductDetails: (proId) => {
    return new Promise((resolve, reject) => {
      db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: ObjectId(proId) }).then((product) => {
        resolve(product)
      })
    })
  },
  updateProduct: (proId, proDetails) => {
    return new Promise((resolve, reject) => {
      db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ _id: ObjectId(proId) }, {
        $set: {
          name: proDetails.name,
          description: proDetails.description,
          Price: proDetails.Price,
          category: proDetails.category

        }
      }).then((response) => {
        resolve()
      })
    })
  }
}

