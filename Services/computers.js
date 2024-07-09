//importacion de la base de datos
const {experimentalSetDeliveryMetricsExportedToBigQueryEnabled} = require('firebase/messaging/sw')
const {db} = require('../bd/firebase.js');
//definicion de clases con varios objetos
class Computers{
    constructor(){
        this.collection = 'computers'
    }
    async getAll(){
        const getComputers = await db.collection(this.collection).get();
        const computers = getComputers.docs.map(item =>({id:item.id, ...item.data()}))
        return {
            success:true,
            data:computers
        }
    }
}
module.exports = Computers;