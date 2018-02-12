<template>
  <v-layout column justify-center class="text-xs-center">
    <v-flex>
      <v-text-field
        label="RINGMesh install location"
        v-model="ringmeshPath"
        hint="Path to RINGMesh build directory or package"
      ></v-text-field>
      <v-btn color="primary" @click.native="load">Load GeoModel3D</v-btn>
      <v-list v-if="geomodels.length != 0">
          <v-list-tile v-for="geomodel in geomodels">
            {{ geomodel.name() }}
          </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    methods: {
      load_plugin(plugin) {
        require('app-module-path').addPath(this.ringmeshPath + '/node')
        return __non_webpack_require__(plugin).init().lib
      },
      load () {
        const { remote } = require('electron')
        const file = remote.dialog.showOpenDialog({properties: ['openFile']})
        if (file === undefined) return;

        const geomodelCore = this.load_plugin('ringmesh/geomodel_core')
        let gm = new geomodelCore.GeoModel3D()
        const io = this.load_plugin('ringmesh/io')
        if( io.geomodel_load3D(gm, file) ) {
          this.$store.commit('GeoModels/add_geomodel', gm)
          new Notification(gm.name(), {
              body: 'Succes: loading and validating'
          })
        } else {
          new Notification(gm.name(), {
              body: 'Failed to load and validate'
          })
        }
      }
    },
    computed: {
      ...mapGetters({
          geomodels: 'GeoModels/geomodels'
      }),
      ringmeshPath: {
        get(){
          return this.$store.getters['Settings/ringmeshPath']
        },
        set(value) {
          this.$store.commit('Settings/set_ringmesh_path', value)
        }
      }
    }
  }
</script>

<style scoped>
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>
