<template>
  <div id="app">
    <Canvas />
  </div>
</template>

<script>
import Canvas from "./components/Canvas"

export default {
  name: 'App',
  components: {
    Canvas,
  }
}
</script>

<style>
body {
  background: rgb(22, 22, 22);
}

</style>
