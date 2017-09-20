import Path from 'path';
import Sequelize from 'sequelize';

var db = Path.resolve(__dirname, '../../db/Db.sqlite');

const Db = new Sequelize(`sqlite://${db}`);

const User = Db.define('User', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  UserName: {type: Sequelize.STRING, unique: true},
  Password: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//############# gobernación ################

//Localidad
const Localidad = Db.define('Localidad', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Codigo: {type: Sequelize.STRING, unique: true},
  Nombre: Sequelize.STRING,
  Poblacion: Sequelize.INTEGER,
  Altitud: Sequelize.DECIMAL,
  Temperatura: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});


//Producto
const Producto = Db.define('Producto', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Codigo: {type: Sequelize.STRING, unique: true},
  Nombre: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//Producto
const Proveedor = Db.define('Proveedor', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Codigo: {type: Sequelize.STRING, unique: true},
  Nombre: Sequelize.STRING,
  Origen: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//Oferta
const Oferta = Db.define('Oferta', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  ProveedorId: {type: Sequelize.INTEGER, references: {model: Proveedor, key: 'Id'}},
  ProductoId: {type: Sequelize.INTEGER, references: {model: Producto, key: 'Id'}},
  LocalidadId: {type: Sequelize.INTEGER, references: {model: Localidad, key: 'Id'}},
  Cantidad: Sequelize.DECIMAL,
  Embalaje: Sequelize.DECIMAL,
  Precio: Sequelize.DECIMAL,
  Fecha: Sequelize.DATEONLY
},
{
  timestamps: false,
  freezeTableName: true
});

Oferta.belongsTo(Proveedor);
Proveedor.hasMany(Oferta);

Oferta.belongsTo(Producto);
Producto.hasMany(Oferta);

Oferta.belongsTo(Localidad);
Localidad.hasMany(Oferta);


//Demanda
const Demanda = Db.define('Demanda', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  LocalidadId: {type: Sequelize.INTEGER, references: {model: Localidad, key: 'Id'}},
  ProductoId: {type: Sequelize.INTEGER, references: {model: Producto, key: 'Id'}},
  ConsumoPromedio: Sequelize.DECIMAL,
  Fecha: Sequelize.DATEONLY
},
{
  timestamps: false,
  freezeTableName: true
});

Demanda.belongsTo(Localidad);
Localidad.hasMany(Demanda);

Demanda.belongsTo(Producto);
Producto.hasMany(Demanda);


//open connection
Db.authenticate().then(() => {
  console.log('Db conection success');
  Db.query("PRAGMA foreign_keys=ON").spread( (Result, Metadata) => {
    Db.query("PRAGMA foreign_keys").spread( (Result, Metadata) => {
      console.log(Result);
    });
  });
}).catch(Err => {
  console.log('Db conection failed');
});


export default Db;
