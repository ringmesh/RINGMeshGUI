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
      <v-btn color="primary" @click.native="load">Load GM3D</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
function requireDynamically(path)
{
    path = path.split('\\').join('/'); // Normalize windows slashes
    return eval(`require('${path}');`); // Ensure Webpack does not analyze the require statement
}
  export default {
    methods: {
      load () {
        const remote = require('electron').remote
        const geomodelCore = requireDynamically('/home/botella/RING/RINGMeshGUI/build/geomodel_core').init('/home/botella/RING/RINGMeshGUI/build').lib
        let gm = new geomodelCore.GeoModel3D()
        const file = remote.dialog.showOpenDialog({properties: ['openFile']})
        console.log(file)
        const io = requireDynamically('/home/botella/RING/RINGMesh/build/Debug/ringmesh/node/ringmesh/io').init('/home/botella/RING/RINGMeshGUI/build').lib
        io.geomodel_load3D(gm, '/home/botella/RING/RINGMesh/data/modelA1.ml')
        console.log(gm)
        io.geomodel_save3D(gm, '/home/botella/RING/RINGMeshGUI/toto.gm')
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
