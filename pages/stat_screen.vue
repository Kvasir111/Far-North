<template>
	<div>
    <h1 class="bg-white text-2xl">name = {{this.$store.state.character.name}}</h1>>
    <input type="text"  v-model="name" class="text-center border-b-2 border-red-700 px-4 py-2 " placeholder="Enter New Character Name">
    <button type="button" class="bg-red-700 px-4 py-2 rounded" v-on:click="setName">Set Name</button>

  </div>
</template>

<script>
  import StatsDisplay from '../components/statsDisplay'
  export default {
    name: 'stat_screen',
    components: { StatsDisplay },
    computed : {

    },
    data: function(){
      return{
        name: '',
      }
    },
    methods : {
      setName(){
        this.$store.commit('character/setName')
      }
    }
  }
</script>

<style scoped>

</style>
