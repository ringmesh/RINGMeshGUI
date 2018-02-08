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
  export default {
    data: function() {
      return {
        ringmeshPath: "",
        geomodels: []
      }
    },
    methods: {
      load () {
        const { remote } = require('electron')
        const file = remote.dialog.showOpenDialog({properties: ['openFile']})
        console.log(file)
        if (file === undefined) return;

        require('app-module-path').addPath(this.ringmeshPath + '/node')
        const geomodelCore = __non_webpack_require__('ringmesh/geomodel_core').init().lib
        const io = __non_webpack_require__('ringmesh/io').init().lib
        let gm = new geomodelCore.GeoModel3D()
        if( io.geomodel_load3D(gm, file) ) {
          this.geomodels.push(gm)
          new Notification(gm.name(), {
              body: 'Succes: loading and validating'
          })
        } else {
          new Notification(gm.name(), {
              body: 'Failed to load and validate'
          })
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
