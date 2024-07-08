//importacion de las bases de datos
//importacion de firestore
const {experimentalSetDeliveryMetricsExportedToBigQueryEnabled} = require('firebase/messaging/sw')
const {db} = require('../bd/firebase.js');
//definicion de clases con varios objetos
class User{
    constructor(){
        this.collection = 'users'
    }
    async getAll(){
        const getUsers = await db.collection(this.collection).get()
        const users = getUsers.docs.map(item =>({id:item.id, ...item.data()}))
        return {
            success:true,
            data: users
        }
    }
}
module.exports = User;