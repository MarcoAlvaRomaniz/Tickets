//middleware para identificar errores en la consola
function logErrors(err,req,res,next){
    console.log('[LOG ERROR]:');
    console.log(err);
    next(err);
}
//middleware para enviar al cliente
function errorHandler(err,req,res,next){
    console.log('[ERROR HANDLE]:')
    res.status(500).json({
        message:err.message,
        stack:err.stack
    })
}
module.exports = {logErrors,errorHandler}