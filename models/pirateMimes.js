const { DataTypes } = require('sequelize'); 
//could also keep this as const sequelize
const database = require('../db'); 


module.exports = database.define('pirate-mime', {
    denim: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    specialMoves: {
        type: DataTypes.INTEGER, 
        allowNull: false
    }, 
    seaworthy: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    }, 
    heaviestPianoLift: DataTypes.DOUBLE
    
})