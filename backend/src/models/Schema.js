import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema } from 'graphql';

import Db from './Db.js';

var Localidad = new GraphQLObjectType({
  name: "Localidad",
  description: "Object representation of Localidad",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Localidad) {
          return Localidad.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(Localidad) {
          return Localidad.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(Localidad) {
          return Localidad.Nombre;
        }
      },
      Poblacion: {
        type: GraphQLInt,
        resolve(Localidad) {
          return Localidad.Poblacion;
        }
      },
      Altitud: {
        type: GraphQLFloat,
        resolve(Localidad) {
          return Localidad.Altitud;
        }
      },
      Temperatura: {
        type: GraphQLFloat,
        resolve(Localidad) {
          return Localidad.Temperatura;
        }
      }
    };
  }
});


var Producto = new GraphQLObjectType({
  name: "Producto",
  description: "Object representation of Producto",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Producto) {
          return Producto.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(Producto) {
          return Producto.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(Producto) {
          return Producto.Nombre;
        }
      }
    };
  }
});


var Proveedor = new GraphQLObjectType({
  name: "Proveedor",
  description: "Object representation of Proveedor",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Proveedor) {
          return Proveedor.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(Proveedor) {
          return Proveedor.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(Proveedor) {
          return Proveedor.Nombre;
        }
      },
      Origen: {
        type: GraphQLString,
        resolve(Proveedor) {
          return Proveedor.Origen;
        }
      }
    };
  }
});


var Oferta = new GraphQLObjectType({
  name: "Oferta",
  description: "Object representation of Oferta",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Oferta) {
          return Oferta.Id;
        }
      },
      ProveedorId: {
        type: GraphQLInt,
        resolve(Oferta) {
          return Oferta.ProveedorId;
        }
      },
      ProductoId: {
        type: GraphQLInt,
        resolve(Oferta) {
          return Oferta.ProductoId;
        }
      },
      LocalidadId: {
        type: GraphQLInt,
        resolve(Oferta) {
          return Oferta.LocalidadId;
        }
      },
      Cantidad: {
        type: GraphQLFloat,
        resolve(Oferta) {
          return Oferta.Cantidad;
        }
      },
      Embalaje: {
        type: GraphQLFloat,
        resolve(Oferta) {
          return Oferta.Embalaje;
        }
      },
      Precio: {
        type: GraphQLFloat,
        resolve(Oferta) {
          return Oferta.Precio;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Oferta) {
          return Oferta.Fecha;
        }
      },
      Proveedor: {
        type: Proveedor,
        resolve(Oferta) {
          return Oferta.getProveedor();
        }
      },
      Producto: {
        type: Producto,
        resolve(Oferta) {
          return Oferta.getProducto();
        }
      },
      Localidad: {
        type: Localidad,
        resolve(Oferta) {
          return Oferta.getLocalidad();
        }
      }
    };
  }
});


var Demanda = new GraphQLObjectType({
  name: "Demanda",
  description: "Object representation of Demanda",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Demanda) {
          return Demanda.Id;
        }
      },
      LocalidadId: {
        type: GraphQLInt,
        resolve(Demanda) {
          return Demanda.LocalidadId;
        }
      },
      ProductoId: {
        type: GraphQLInt,
        resolve(Demanda) {
          return Demanda.ProductoId;
        }
      },
      ConsumoPromedio: {
        type: GraphQLFloat,
        resolve(Demanda) {
          return Demanda.ConsumoPromedio;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Demanda) {
          return Demanda.Fecha;
        }
      },
      Localidad: {
        type: Localidad,
        resolve(Demanda) {
          return Demanda.getLocalidad();
        }
      },
      Producto: {
        type: Producto,
        resolve(Demanda) {
          return Demanda.getProducto();
        }
      }
    };
  }
});


//Query
var Query = new GraphQLObjectType({
  name: "Query",
  description: "Object representation of Query",
  fields: () => {
    return {
      Hello: {
        type: GraphQLString,
        args: {},
        resolve(root, args) {
          return "world";
        }
      },
      Localidades: {
        type: new GraphQLList(Localidad),
        args: {
          Id: {type: GraphQLInt},
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Poblacion: {type: GraphQLInt},
          Altitud: {type: GraphQLFloat},
          Temperatura: {type: GraphQLFloat}
        },
        resolve(root, args) {
          return Db.models.Localidad.findAll({where: args});
        }
      },
      Productos: {
        type: new GraphQLList(Producto),
        args: {
          Id: {type: GraphQLInt},
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Producto.findAll({where: args});
        }
      },
      Proveedores: {
        type: new GraphQLList(Proveedor),
        args: {
          Id: {type: GraphQLInt},
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Origen: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Proveedor.findAll({where: args});
        }
      },
      Ofertas: {
        type: new GraphQLList(Oferta),
        args: {
          Id: {type: GraphQLInt},
          ProveedorId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          LocalidadId: {type: GraphQLInt},
          Cantidad: {type: GraphQLFloat},
          Embalaje: {type: GraphQLFloat},
          Precio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Oferta.findAll({where: args});
        }
      },
      Demandas: {
        type: new GraphQLList(Demanda),
        args: {
          Id: {type: GraphQLInt},
          LocalidadId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          ConsumoPromedio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Demanda.findAll({where: args});
        }
      }
    };
  }
});


//mutation
var Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Function to create stuf",
  fields: () => {
    return {
      CreateLocalidad: {
        type: Localidad,
        args: {
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Poblacion: {type: GraphQLInt},
          Altitud: {type: GraphQLFloat},
          Temperatura: {type: GraphQLFloat}
        },
        resolve(_, args) {
          return Db.models.Localidad.create({
            Codigo: args.Codigo,
            Nombre: args.Nombre,
            Poblacion: args.Poblacion,
            Altitud: args.Altitud,
            Temperatura: args.Temperatura
          });
        }
      },
      UpdateLocalidad: {
        type: Localidad,
        args: {
          Id: {type: GraphQLInt},
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Poblacion: {type: GraphQLInt},
          Altitud: {type: GraphQLFloat},
          Temperatura: {type: GraphQLFloat}
        },
        resolve(_, args) {
          return Db.models.Localidad.findOne({
            where: {Id: args.Id}
          }).then(R => {
            if (R !== null) {
              R.Codigo = args.Codigo;
              R.Nombre = args.Nombre;
              R.Poblacion = args.Poblacion;
              R.Altitud = args.Altitud;
              R.Temperatura = args.Temperatura;
              R.save();
            }
            return R;
          });
        }
      },
      CreateProducto: {
        type: Producto,
        args: {
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Producto.create({
            Codigo: args.Codigo,
            Nombre: args.Nombre
          });
        }
      },
      UpdateProducto: {
        type: Producto,
        args: {
          Id: {type: GraphQLInt},
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Producto.findOne({
            where: {Id: args.Id}
          }).then(R => {
            if (R !== null) {
              R.Codigo = args.Codigo;
              R.Nombre = args.Nombre;
              R.save();
            }
            return R;
          });
        }
      },
      CreateProveedor: {
        type: Proveedor,
        args: {
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Origen: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Proveedor.create({
            Codigo: args.Codigo,
            Nombre: args.Nombre,
            Origen: args.Origen,
          });
        }
      },
      UpdateProveedor: {
        type: Proveedor,
        args: {
          Id: {type: GraphQLInt},
          Codigo: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Origen: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Proveedor.findOne({
            where: {Id: args.Id}
          }).then(R => {
            if (R !== null) {
              R.Codigo = args.Codigo;
              R.Nombre = args.Nombre;
              R.Origen = args.Origen;
              R.save();
            }
            return R;
          });
        }
      },
      CreateOferta: {
        type: Oferta,
        args: {
          ProveedorId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          LocalidadId: {type: GraphQLInt},
          Cantidad: {type: GraphQLFloat},
          Embalaje: {type: GraphQLFloat},
          Precio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Oferta.create({
            ProveedorId: args.ProveedorId,
            ProductoId: args.ProductoId,
            LocalidadId: args.LocalidadId,
            Cantidad: args.Cantidad,
            Embalaje: args.Embalaje,
            Precio: args.Precio,
            Fecha: args.Fecha
          });
        }
      },
      UpdateOferta: {
        type: Oferta,
        args: {
          Id: {type: GraphQLInt},
          ProveedorId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          LocalidadId: {type: GraphQLInt},
          Cantidad: {type: GraphQLFloat},
          Embalaje: {type: GraphQLFloat},
          Precio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Oferta.findOne({
            where: {Id: args.Id}
          }).then(R => {
            if (R !== null) {
              R.ProveedorId = args.ProveedorId;
              R.ProductoId = args.ProductoId;
              R.LocalidadId = args.LocalidadId;
              R.Cantidad = args.Cantidad;
              R.Embalaje = args.Embalaje;
              R.Precio = args.Precio;
              R.Fecha = args.Fecha;
              R.save();
            }
            return R;
          });
        }
      },
      CreateDemanda: {
        type: Demanda,
        args: {
          LocalidadId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          ConsumoPromedio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Demanda.create({
            LocalidadId: args.LocalidadId,
            ProductoId: args.ProductoId,
            ConsumoPromedio: args.ConsumoPromedio,
            Fecha: args.Fecha
          });
        }
      },
      UpdateDemanda: {
        type: Demanda,
        args: {
          Id: {type: GraphQLInt},
          LocalidadId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          ConsumoPromedio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Demanda.findOne({
            where: {Id: args.Id}
          }).then(R => {
            if (R !== null) {
              R.LocalidadId = args.LocalidadId;
              R.ProductoId = args.ProductoId;
              R.ConsumoPromedio = args.ConsumoPromedio;
              R.Fecha = args.Fecha;
              R.save();
            }
            return R;
          });
        }
      }
    };
  }
});


//Public Query
var PublicQuery = new GraphQLObjectType({
  name: "PublicQuery",
  description: "Object representation of public Query",
  fields: () => {
    return {
      Hello: {
        type: GraphQLString,
        args: {},
        resolve(root, args) {
          return "Public world";
        }
      },
      Ofertas: {
        type: new GraphQLList(Oferta),
        args: {
          Id: {type: GraphQLInt},
          ProveedorId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          LocalidadId: {type: GraphQLInt},
          Cantidad: {type: GraphQLFloat},
          Embalaje: {type: GraphQLFloat},
          Precio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Oferta.findAll({where: args});
        }
      },
      Demandas: {
        type: new GraphQLList(Demanda),
        args: {
          Id: {type: GraphQLInt},
          LocalidadId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          ConsumoPromedio: {type: GraphQLFloat},
          Fecha: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Demanda.findAll({where: args});
        }
      }
    }
  }
});


//public schema
var PublicSchema = new GraphQLSchema({
  query: PublicQuery
});

//schema
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export {Schema, PublicSchema};
