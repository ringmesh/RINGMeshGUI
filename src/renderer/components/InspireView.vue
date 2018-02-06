<template>
  <v-layout column justify-center class="text-xs-center">
    <v-flex>
      <img src="/static/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="text-xs-center">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <v-btn color="primary" @click.native="load">Load GeoModel3D</v-btn>
      <v-list v-if="geomodels.length != 0">
          <template v-for="geomodel in geomodels">
            <v-list-tile>
              <v-list-tile-title>
                {{ geomodel.name() }}
              </v-list-tile-title>
            </v-list-tile>
          </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: function() {
      return {
        geomodels: []
      }
    },
    methods: {
      load () {
        const { remote } = require('electron')
        const file = remote.dialog.showOpenDialog({properties: ['openFile']})
        console.log(file)
        if (file === undefined) return;

        require('app-module-path').addPath('/home/botella/RING/RINGMesh/build/Debug/ringmesh/node')
        const geomodelCore = __non_webpack_require__('ringmesh/geomodel_core').init().lib
        const io = __non_webpack_require__('ringmesh/io').init().lib
        let gm = new geomodelCore.GeoModel3D()
        io.geomodel_load3D(gm, file)
        this.geomodels.push(gm)
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
