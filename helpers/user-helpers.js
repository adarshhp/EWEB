var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')
module.exports = {
    dosignup: (userdata) => {
        return new Promise(async (resolve, reject) => {
            try {
              //  db.get().collection('USER').insertOne(userdata);
                // Ensure that userdata contains a valid password field
                if (userdata.password) {
                    userdata.password = await bcrypt.hash(userdata.password, 10);
                    db.get().collection(collection.USER_COLLECTION).insertOne(userdata).then((data) => {
                        resolve(data.ops[0]);
                    });
                } else {
                    reject('Invalid user data. Password is missing.');
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    
    doLogin: (userdata) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userdata.email })
            console.log(user);
            if (user) {
                bcrypt.compare(userdata.password, user.password).then((status) => {
                    if (status) {
                        console.log('success');
                        response.user=user
                        response.status=true
                        resolve(response)
                    } else {
                        console.log('unsuccessful fuck off wrong password');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('failed');
                resolve({status:false})
            }
        })
    }

/*
doLogin: (userdata) => {
    return new Promise(async (resolve, reject) => {
        let loginStatus = false
        let response = {}
        let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userdata.email })
        if (user) {
            bcrypt.compare(userdata.password, user.password).then((status) => {//CHNAGED USER TO CAPITAL
                if (status) {
                    console.log('success');
                } else {
                    console.log('succlfress');
                }
            })
        }
    })
}*/
/*
doLogin: (userdata) => {
    return new Promise(async (resolve, reject) => {
        let loginStatus = false
        let response = {}
        let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userdata.email })
        console.log(user);
        if (user) {
            bcrypt.compare(userdata.password, user.password).then((status) => {
                if (status) {
                    console.log('success');
                    response.user = user;
                    response.status = true;
                    resolve(response);
                } else {
                    console.log('unsuccessful fuck off wrong password');
                    response.status = false;
                    reject(response); // Use reject to handle the error case
                }
            })
        } else {
            console.log('failed');
            response.status = false;
            reject(response); // Use reject to handle the error case
        }
    });
}
*/

}


