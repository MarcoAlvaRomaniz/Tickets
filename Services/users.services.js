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
    async getOne(id){
        const getUser = await db.collection(this.collection).doc(id).get();
        if (!getUser.exists){
            return{
                success : false,
                message:'El usuario no existe'
            }
        }
        return{
            success:true,
            data:getUser.data()
        }
    }
    //crea un usuario nuevo
    async create(data){
        console.log('Llega:',data)
        const addNewUser = await db.collection(this.collection).add(data);
        console.log(addNewUser);
        if(addNewUser.id){
            return{
                data:{
                    ...data, id:addNewUser.id
                },
                success: true,
                message:'usuario Creado con éxito'
            }
        }else{
            return{
                success:false,
                message:'Usuario no creado'
            }
        }
    }
    async update(id,newdata){
        try{
            await db.collection(this.collection).doc(id).update(newdata);            
            return{
                success:true,
                message:'Usuario Actualizado'
            }
        }catch(error){
            return{
                success:false,
                message:'Error desconocido'
            }
        }
        
        
    }
    async delete(id){
        try{
            await this.update(id,{status:'Baja'})
            return{
                success:true,
                message:'Usuario Eliminado'
            }
        }catch(error){
            return{
                success:false,
                message:'Error desconocido'
            }
        }
    }

}
module.exports = User;