//importacion de las bases de datos
//importacion de firestore
const {experimentalSetDeliveryMetricsExportedToBigQueryEnabled} = require('firebase/messaging/sw');
const {db} = require('../bd/firebase.js');
const { getALL } = require('firebase/remote-config');
//definicion de clases
class Tickets{
    constructor(){
        this.collection = 'tickets'
    }
    // async create(data){
    //     //
    //     console.log('Llega:',data)
    //     const addNewTicket = await db.collection(this.collection).add(data)
    //     console.log(addNewTicket);
    //     if(addNewTicket.id){
    //         return{
    //             data:{
    //                 ...data,id:addNewTicket.id
    //             },
    //             success:true,
    //             message:`Creado exitosamente ${addNewTicket}`
    //         }
    //     }else{
    //         return{success:false,message:`Ticket no creado`};
    //     }
    // }
    // async getAll(){
    //     try{
    //     const resDB = await db.collection(this.collection).get();
    //     const data = resDB.docs.map(item => ({id:item.id,...item.data()}))
    //     return {success:true,data:data}
    //     }catch(error){
    //         console.log('[ERROR]:',error)
    //         return{success:false,message:`Algo salio mal al consultar la base de datos: ${error}`}
    //     }
    // }
    // async getOne(id){
    //     try{
    //         const resDB = await db.collection(this.collection).doc(id).get();
    //         if(resDB.exists){
    //             return{
    //                 success:true, data:resDB.data()
    //             }
    //         }
    //         return{success:false,message:`Id no encontrado ${id}`}
    //     }catch(error){
    //         return{success:false,message:`Algo salio mal en la Base de Datos ${error}`}
    //     }
    // }
    

}
