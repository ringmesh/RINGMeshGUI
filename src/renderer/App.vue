<template>
  <div id="app">
    <v-app dark>
      <v-toolbar app>
        <v-toolbar-title>RINGMesh</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
            <inspire-view></inspire-view>
        </v-container>
      </v-content>
      <v-footer app>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import InspireView from './components/InspireView.vue'
  export default {
    name: 'ringmesh-gui',
    components: {
      InspireView
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
