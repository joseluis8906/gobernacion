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
            v-icon(ma) backup
            |  Cargue Masivo
      v-card-text
        v-layout( row wrap)
          v-flex( xs12 )

            label Formatos xlsx

            br

            v-chip( class="green white--text" )
              v-avatar
                v-icon assignment
              a(href="/ModeloOferta.xlsx") Oferta

            v-chip( class="green white--text" )
              v-avatar
                v-icon assignment
              a(href="/ModeloDemanda.xlsx") Demanda

            br
            br

            v-select(
              v-bind:items="ItemsTipo"
              v-model="Tipo"
              item-value="text"
              label="Tipo"
              autocomplete
              bottom )

            upload-button( title="Subir Archivo" :selectedCallback="ArchivoSeleccionado")

      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
</template>

<script>

import DEMANDAS from '~/queries/Demandas.gql'
import CREATE_DEMANDA from '~/queries/CreateDemanda.gql'
import UPDATE_DEMANDA from '~/queries/UpdateDemanda.gql'
import LOCALIDADES from '~/queries/Localidades.gql'
import PRODUCTOS from '~/queries/Productos.gql'
import PROVEEDORES from '~/queries/Proveedores.gql'
import XLSX from 'xlsx'

import UploadButton from '~/components/UploadButton'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Tipo: null,
    ItemsTipo: [
      {text: "Oferta"},
      {text: "Demanda"}
    ],
    loading: 0
  }),
  components: {
    UploadButton,
  },
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  apollo: {
    Localidades: {
      query: LOCALIDADES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsLocalidad = data.Localidades
      }
    },
    Productos: {
      query: PRODUCTOS,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsProducto = data.Productos
      }
    },
    Proveedores: {
      query: PROVEEDORES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsProveedor = data.Proveedores
      }
    },
  },
  methods: {
    ArchivoSeleccionado (Archivo) {
      var reader = new FileReader()
      var ProcesarOfertaCallback = this.ProcesarOferta
      var ProcesarDemandaCallback = this.ProcesarDemanda
      reader.onload = function(e) {
        var data = e.target.result
        var LibroDeTrabajo = XLSX.read(data, {type: 'binary'})
        var NombrePrimeraHoja = LibroDeTrabajo.SheetNames[0]

        var HojaDeTrabajo = LibroDeTrabajo.Sheets[NombrePrimeraHoja]
        var DireccionDeCelda = 'A1'

        var CeldaSeleccionada = HojaDeTrabajo[DireccionDeCelda]

        var ValorSeleccionado = (CeldaSeleccionada ? CeldaSeleccionada.v : undefined)
        if (ValorSeleccionado === 'Oferta') {
          ProcesarOfertaCallback(HojaDeTrabajo)
        }
        else if (ValorSeleccionado === 'Demanda') {
          ProcesarDemandaCallback(HojaDeTrabajo)
        }
      }
      reader.readAsBinaryString(Archivo);
    },
    ProcesarOferta (HojaDeTrabajo) {
      
    },
    ProcesarDemanda (HojaDeTrabajo) {

    }
  }
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

a
  color: white !important
  text-decoration none !important
</style>
