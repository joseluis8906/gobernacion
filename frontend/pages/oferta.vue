<template lang="pug">
v-layout( align-center justify-center )
  v-snackbar(
    :timeout="snackbar.timeout"
    :success="snackbar.context === 'success'"
    :info="snackbar.context === 'info'"
    :warning="snackbar.context === 'warning'"
    :error="snackbar.context === 'error'"
    :primary="snackbar.context === 'primary'"
    :secondary="snackbar.context === 'secondary'"
    :multi-line="snackbar.mode === 'multi-line'"
    :vertical="snackbar.mode === 'vertical'"
    :top="true"
    v-model="loading" )
      h6(class="grey--text text--lighten-4 mb-0") {{ snackbar.text }}
      v-icon autorenew

  v-flex( xs12 mt-3 md8 lg6 )
    v-card
      v-layout(row wrap pt-3 light-blue)
        v-flex( xs12 )
          h5(class="grey--text text--lighten-4 text-xs-center bold")
            v-icon(ma) local_shipping
            |  Oferta
      v-card-text
        v-layout( row wrap)
          v-flex( xs12 )
            v-select(
              v-bind:items="ItemsProveedor"
              v-model="ProveedorId"
              item-value="Id"
              item-text="Nombre"
              label="Proveedor"
              single-line
              autocomplete
              bottom )

            v-select(
              v-bind:items="ItemsProducto"
              v-model="ProductoId"
              item-value="Id"
              item-text="Nombre"
              label="Producto"
              single-line
              autocomplete
              bottom )

            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )

              v-text-field( slot="activator"
                            label="Fecha"
                            v-model="Fecha"
                            readonly )

              v-date-picker( :months="months"
                           :days="days"
                           first-day-of-week="D"
                           :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                           v-model="Fecha"
                           no-title
                           dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar

            v-text-field( label="Cantidad" v-model="Cantidad" dark )

            v-text-field( label="Embalaje" v-model="Embalaje" dark )

            v-text-field( label="Precio" v-model="Precio" dark )


      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
</template>

<script>

import OFERTAS from '~/queries/Ofertas.gql'
import CREATE_OFERTA from '~/queries/CreateOferta.gql'
import UPDATE_OFERTA from '~/queries/UpdateOferta.gql'


export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Id: null,
    ProveedorId: null,
    ProductoId: null,
    Cantidad: null,
    Embalaje: null,
    Precio: null,
    Fecha: null,
    ItemsProveedor: [],
    ItemsProducto: [],
    menu1: false,
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'],
    days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    loading: 0
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  apollo: {
    Ofertas: {
      query: OFERTAS,
      variables () {
        return {
          Codigo: this.Codigo
        }
      },
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.LoadUi(data.Ofertas)
      }
    },
  },
  methods: {
    CreateOrUpdate () {
      if (this.Id === null) {
        this.Create();
      }else{
        this.Update();
      }
    },
    Create () {
      const Oferta = {
        Codigo: this.Codigo,
        Nombre: this.Nombre,
        Poblacion: this.Poblacion,
        Altitud: this.Altitud,
        Temperatura: this.Temperatura
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: CREATE_OFERTA,
        variables: {
          Codigo: Oferta.Codigo,
          Nombre: Oferta.Nombre,
          Poblacion: Oferta.Poblacion,
          Altitud: Oferta.Altitud,
          Temperatura: Oferta.Temperatura
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        //console.log(Ente);
        try{
          var data = store.readQuery({
            query: OFERTAS,
            variables: {
              Codigo: res.CreateOferta.Codigo,
            }
          })

          data.Ofertas.push(res.CreateOferta)

          store.writeQuery({
            query: OFERTAS,
            variables: {
              Codigo: res.CreateOferta.Codigo
            },
            data: data
          })

        } catch (Err) {

          var data = {Ofertas: []}

          data.Ofertas.push(res.CreateOferta)

          store.writeQuery({
            query: OFERTAS,
            variables: {
              Codigo: res.CreateOferta.Codigo
            },
            data: data
          })

        }

      },
      }).then( data => {
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Update () {
      const Oferta = {
        Id: this.Id,
        Codigo: this.Codigo,
        Nombre: this.Nombre,
        Poblacion: this.Poblacion,
        Altitud: this.Altitud,
        Temperatura: this.Temperatura
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: UPDATE_OFERTA,
        variables: {
          Id: Oferta.Id,
          Codigo: Oferta.Codigo,
          Nombre: Oferta.Nombre,
          Poblacion: Oferta.Poblacion,
          Altitud: Oferta.Altitud,
          Temperatura: Oferta.Temperatura
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          try {
            var data = store.readQuery({
              query: OFERTAS,
              variables: {
                Codigo: res.UpdateOferta.Codigo
              }
            })

            for (let i=0; i<data.Ofertas.length; i++) {
              if (data.Ofertas[i].Id === res.UpdateOferta.Id) {
                data.Ofertas[i].Codigo = res.UpdateOferta.Codigo
                data.Ofertas[i].Nombre = res.UpdateOferta.Nombre
                data.Ofertas[i].Poblacion = res.UpdateOferta.Poblacion
                data.Ofertas[i].Altitud = res.UpdateOferta.Altitud
                data.Ofertas[i].Temperatura = res.UpdateOferta.Temperatura
              }
            }

            store.writeQuery({
              query: OFERTAS,
              variables: {
                Codigo: res.UpdateOferta.Codigo
              },
              data: data
            })

          } catch (Err) {

            var data = {Ofertas: []}

            data.Ofertas.push(res.UpdateOferta)

            store.writeQuery({
              query: OFERTAS,
              variables: {
                Codigo: res.UpdateOferta.Codigo
              },
              data: data
            })

          }

        },
      }).then( data => {
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Reset () {
      this.Id = null
      this.Codigo = null
      this.Nombre = null
      this.Poblacion = null
      this.Altitud = null
      this.Temperatura = null
    },
    LoadUi (Ofertas) {
      if( Ofertas.length === 0 ) {
        this.Id = null
        this.Nombre = null
        this.Poblacion = null
        this.Altitud = null
        this.Temperatura = null
      }

      for (let i=0; i<Ofertas.length; i++) {
        if ( this.Codigo === Ofertas[i].Codigo ) {
          this.Id = Ofertas[i].Id
          this.Codigo = Ofertas[i].Codigo
          this.Nombre = Ofertas[i].Nombre
          this.Poblacion = Ofertas[i].Poblacion
          this.Altitud = Ofertas[i].Altitud
          this.Temperatura = Ofertas[i].Temperatura
          break
        }else{
          this.Id = null
          this.Nombre = null
          this.Poblacion = null
          this.Altitud = null
          this.Temperatura = null
        }
      }

    }
  }
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

</style>
