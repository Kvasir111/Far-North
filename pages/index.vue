<template>
  <div class="h-screen flex">
    <div class="bg-white w-full md:w-1/3 lg:w-2/3 p-4 rounded m-auto">
      <h1 class="text-center text-xl mb-2">Character Generation</h1>
      <div id="name" class="block text-center">
      <label for="characterName">Character Name Entry</label>
      <input type="text" v-model="character.name" id="characterName" placeholder="Enter Name Here" class="text-center border-b-2 border-red-700 px-4 py-2">
      <button type="button" v-on:click="generateName">Generate Name</button>
      </div>
      <div id="race" class="block">
        <h2 class="text-center border-b-2 border-red-700">Select Race</h2>
        <ul :key="index" v-for="(race, index) in races">
          <li><input class="form-radio m-2" type="radio" v-model=character.homeland name="raceSelection" v-bind:value="race">{{race}}</li>
        </ul>
      </div>
      <div id="homeland" class="block">
        <h2 class="text-center border-b-2 border-red-700">Select Homeland</h2>
        <ul :key="index" v-for="(land, index) in homeland">
          <li><input class="m-2 form-radio" type="radio" name="homelandSelection" v-model=character.homeland v-bind:value="land">{{land}}</li>
        </ul>
      </div>
      <div id="familialFate" class="block">
        <h2>Familial Fate</h2>
        <ul :key="index" v-for="(fate, index) in nilfgarrdianStatus" v-if="character.homeland === 'Heart of Nilfgaard' || character.homeland === 'Nilfgaardian Vassal'">
          <li><input class="m-2 form-radio" type="radio" name="familial fate" v-model="character.familyStatus">{{fate}}</li>
        </ul>
        <ul :key="index" v-for="(fate, index) in northernStatus" v-if="character.homeland === 'Northern Kingdoms'">
          <li><input class="m-2 form-radio" type="radio" name="familial fate" v-model="character.familyStatus">{{fate}}</li>
        </ul>
        <ul :key="index" v-for="(fate, index) in elderlandStatus" v-if="character.homeland === 'Dol Blathanna' || character.homeland === 'Mahakam'">
          <li><input class="m-2 form-radio" type="radio" name="familial fate" v-model="character.familyStatus">{{fate}}</li>
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
        character :{
          name: '',
          race: '',
          homeland: '',
          familyStatus : '',

        },
          characterName: '',
          races: ['Witcher', 'Elf', 'Human', 'Dwarf'],
          homeland: ['Northern Kingdoms', 'Heart of Nilfgaard', 'Nilfgaardian Vassal', 'Dol Blathanna', 'Mahakam'],
          northernStatus: [
              'Your family was scattered to the\n' +
              'winds by the wars and you have\n' +
              'no idea where most of them\n' +
              'are.' ,
              'Your family was imprisoned\n' +
              'for crimes or on trumped-up\n' +
              'charges. You were the only one\n' +
              'to escape. You may want to free\n' +
              'them...or maybe not',
              'Your family house was cursed\n' +
              'and now either crops won’t\n' +
              'grow or specters roam the halls.\n' +
              'It became too dangerous for\n' +
              'you to stay in this home',
              'With so many wars your family’s livelihood was destroyed.\n' +
              'Your family turned to crime to\n' +
              'survive. ',
              'Your family accumulated a\n' +
              'huge debt through gambling or\n' +
              'favors from others. You need\n' +
              'money desperately.',
              'Your family has fallen into a\n' +
              'feud with another family. You\n' +
              'may not even remember why\n' +
              'this feud started in the first\n' +
              'place',
              'Due to some action or inaction\n' +
              'your family has become hated\n' +
              'in your home town and now\n' +
              'no one there wants to have anything to do with them',
              'One day everything you had\n' +
              'was ripped away by a bandit\n' +
              'mob. Your family was massacred, leaving you entirely alone.',
              'Your family has a deep, dark\n' +
              'secret that if discovered would\n' +
              'ruin you all completely. You\n' +
              'can decide what this secret is,\n' +
              'or the Game Master can decide',
              'Your family has come to despise\n' +
              'each other. No one you grew up\n' +
              'with will talk with each other\n' +
              'any more and you’re lucky to\n' +
              'get a passing hello from your\n' +
              'siblings.',
          ],
          nilfgarrdianStatus : [
              'Your family was indentured for\n' +
              'crimes against the Empire or\n' +
              'on trumped-up charges. Only\n' +
              'you escaped.',
              'Your family was exiled to the\n' +
              'Korath Desert and you likely\n' +
              'spent most of your early life\n' +
              'struggling to survive in the\n' +
              'deadly wasteland.',
              'Your family was killed by a\n' +
              'rogue mage who either had a\n' +
              'vendetta against your family, or\n' +
              'just wanted blood. Either way,\n' +
              'you are alone.',
              'Your family disappeared and\n' +
              'you have no idea where they\n' +
              'went. One day they just up and\n' +
              'left.',
              'Your family was executed for\n' +
              'treason against the Empire. You\n' +
              'were the only one to escape this\n' +
              'fate',
              'Your family was stripped of\n' +
              'its title for some reason. You\n' +
              'were evicted from your home\n' +
              'and left scrambling to survive\n' +
              'among the un-washed masses.',
              'Your family name was\n' +
              'tarnished by a magic relative\n' +
              'who flaunted their magical gift\n' +
              'disgracefully like a Northern\n' +
              'mage.',
              'You disgraced your family in\n' +
              'the eyes of the Empire. Something you did or failed to do has\n' +
              'ruined your personal name and\n' +
              'harmed your family.',
              'Your family has a deep, dark\n' +
              'secret that if discovered would\n' +
              'destroy them and their name\n' +
              'forever. You must protect this\n' +
              'secret with your life.',
              'Your family was assassinated.\n' +
              'They may have been in the way\n' +
              'of someone’s plan or they may\n' +
              'have been used to get at someone more powerful. Either way,\n' +
              'your family is gone now',
          ],
          elderlandStatus : [
              'Your family were marked as\n' +
              'human sympathizers and are\n' +
              'not particularly loved in their\n' +
              'homeland.',
              'Your family was ostracized\n' +
              'for dissenting opinions and\n' +
              'now people won’t socialize with\n' +
              'you or your family at all.',
              'Your family died in the\n' +
              'Northern Wars. They may have\n' +
              'actually fought in the war, or\n' +
              'were casualties of war who just\n' +
              'happened to get in the way.',
              'Your family has been caught in\n' +
              'a feud for centuries. You may\n' +
              'not remember why this feud\n' +
              'started, but it is dire',
              'Your family was stripped of its\n' +
              'title for some reason. You were\n' +
              'evicted from your home and\n' +
              'left scrambling to survive.',
              'Your family turned to raiding\n' +
              'human settlements early in\n' +
              'your life to get food and perhaps strike back at the humans.',
              'Your family house is haunted.\n' +
              'Most likely this is because your\n' +
              'home was the site of many,\n' +
              'many deaths during the war\n' +
              'against humans.',
              'Your family has been split by a\n' +
              'human in-law who was brought\n' +
              'into your family by a sibling or\n' +
              'relative. Some of your family\n' +
              'like them and some hate them.',
              'Your family was killed by humans who thought they were\n' +
              'Scoia’tael. They may have been\n' +
              'slaughtered or hung with no\n' +
              'court proceedings or trials.',
              'Your family is descended from\n' +
              'an infamous traitor. It taints\n' +
              'your family’s interactions with\n' +
              'others of the elder races and\n' +
              'has made living in the elderland difficult.',
          ],

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
  h2{
    @apply text-center border-b-2 border-red-700 text-xl
  }
</style>
