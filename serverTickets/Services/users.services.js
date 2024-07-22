const { db } = require('../bd/firebase.js');

class User {
    constructor() {
        this.collection = 'users';
    }

    async getAll(limit = 10, lastDoc = null) {
        let query = db.collection(this.collection).limit(limit);
        if (lastDoc) {
            query = query.startAfter(lastDoc);
        }

        const getUsers = await query.get();
        const users = getUsers.docs.map(item => ({ id: item.id, ...item.data() }));

        return {
            success: true,
            data: users,
            lastDoc: getUsers.docs.length > 0 ? getUsers.docs[getUsers.docs.length - 1] : null
        };
    }

    async getOne(id) {
        const getUser = await db.collection(this.collection).doc(id).get();
        if (!getUser.exists) {
            return {
                success: false,
                message: 'El usuario no existe'
            };
        }
        return {
            success: true,
            data: getUser.data()
        };
    }

    async create(data) {
        console.log('Llega:', data);
        const addNewUser = await db.collection(this.collection).add(data);
        console.log(addNewUser);

        if (addNewUser.id) {
            return {
                data: {
                    ...data, id: addNewUser.id
                },
                success: true,
                message: 'Usuario creado con éxito'
            };
        } else {
            return {
                success: false,
                message: 'Usuario no creado'
            };
        }
    }

    async update(id, newdata) {
        try {
            await db.collection(this.collection).doc(id).update(newdata);
            return {
                success: true,
                message: 'Usuario actualizado'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error desconocido'
            };
        }
    }

    async delete(id) {
        try {
            await db.collection(this.collection).doc(id).update({ status: 'Baja' });
            return {
                success: true,
                message: 'Usuario eliminado'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error desconocido'
            };
        }
    }
}

module.exports = User;