<template>
	<div class="bg-transparent text-text-black sm:bg-white rounded-tl rounded-bl p-2">
    <ul :key="index" v-for="(stat, index) in characterStats.stats">
      <li>
        <h3 class="inline border-b-2 border-red-700">{{stat.stat}}</h3>
        <h3 class=" flex inline font-light text-right">{{stat.value}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'statsDisplay',
    props: ['characterStats'],
  }
</script>

<style scoped>

</style>
