<template>
  <div id="ads">
    <a
      :href="adsUrl"
      target="_blank">
      <img :src="imgSrc"/>
    </a>
  </div>
</template>

<script>
export default {
  props: [
    'imgSrc',
    'adsUrl'
  ]
}
</script>

<style>
#ads {
  width: 300px;
}
#ads img {
  width: 300px;
}
</style>
