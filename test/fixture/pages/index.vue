<template>
  <img :srcset="require('~/assets/nuxt.jpg').srcSet" />
</template>

<script>
export default {
  loading: false
}
</script>
