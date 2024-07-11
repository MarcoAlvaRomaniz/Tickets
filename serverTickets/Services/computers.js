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
    async getOne(id){
        //meter en una constante el id del documento
        const getComputer = await db.collection(this.collection).doc(id).get();
        const computer = {id:getComputer.id, ...getComputer.data()}
        return{
            success:true,
            data:computer
        }
    }
}
module.exports = Computers;