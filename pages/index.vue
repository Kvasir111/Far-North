<template>
  <div class="h-screen flex">
    <div class="bg-white w-1/3 p-4 rounded m-auto">
      <h1 class="text-center text-xl mb-2">Getting Started</h1>
      <div id="name" class="block">
      <label for="characterName">Character Name Entry</label>
      <input type="text" v-model="characterName" id="characterName" placeholder="Enter Name Here" class="text-center border-b-2 border-red-700 px-4 py-2">
      <button type="button" v-on:click="generateName">Generate Name</button>
      </div>
      <div id="race" class="block">
        <h2 class="text-center border-b-2 border-red-700">Select Race</h2>
        <ul :key="index" v-for="(race, index) in races">
          <li><input type="radio" name="raceSelection" v-bind:value="race">{{race}}</li>
        </ul>
      </div>
      <div id="homeland" class="block">
        <h2 class="text-center border-b-2 border-red-700">Select Homeland</h2>
        <ul :key="index" v-for="(land, index) in homeland">
          <li><input type="radio" name="homelandSelection" v-bind:value="land">{{land}}</li>
        </ul>
      </div>
    </div>
    </div>
</template>

<script>

import Card from "../components/card";
export default {
  components: {
      Card
  },
  data : function () {
      return{
          characterName: '',
          races: ['Witcher', 'Elf', 'Human', 'Dwarf'],
          homeland: ['Northen Kingdoms', 'Heart of Nilfgaard', 'Nilfgaarddian Vassal', 'Dol Blathanna', 'Mahakam'],
      }
  },
  methods: {
    generateName(){

    }
  }
}
</script>

<style>
  button{
    @apply bg-red-700 px-4 py-2 rounded
  }
</style>
