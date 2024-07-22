//importacion de la base de datos
const {experimentalSetDeliveryMetricsExportedToBigQueryEnabled} = require('firebase/messaging/sw')
const {db} = require('../bd/firebase.js');
//definicion de clases con varios objetos
class Computers{
    constructor(){
        this.collection = 'equipos'
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
    //crear un equipo nuevo
    async create(data){
        const addNewComputer = await db.collection(this.collection).add(data);
        if(addNewComputer.id){
            return{
                data:{
                    ...data,id:addNewComputer.id
                },
                success:true,
                message:'equipo creado con exito'
            }
        }else{
            return{
                success:false,
                message:'Equipo no creado'
            }
        }
    }
//Actualizar una computadora
    async update(id,newdata,userData){
        try{            
            await db.collection(this.collection).doc(id).update(newdata);
            return{
                success:true,
                message:'Equipo actualizado exitodamente'
            }
        }catch(error){
            return{
                success:false,
                message:Error `al actualizar el equipo ${error}`
            }
        }
    }
    async delete(id){
        try{
            await this.update(id,{status:'Baja'});
            return{
                success:true,
                message:'Equipo eliminado correctamente'
            }
        }catch(error){
            return{
                success:false,
                message:'Errro al eliminar el equipo'
            }
        }
    }
}
module.exports = Computers;