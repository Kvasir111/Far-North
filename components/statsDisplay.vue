<template>
	<div class="bg-white  mx-auto float-left rounded-tl rounded-bl p-2">
    <ul :key="index" v-for="(stat, index) in characterStats.stats">
      <li>
        <h2>{{stat.stat}}</h2>
        <h3>{{stat.value}}</h3>
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
