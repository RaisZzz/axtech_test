<template>
  <div class="loader"></div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/variables"

.loader
  width: 120px
  height: 20px
  background: linear-gradient($primary 50%, #0000 0), linear-gradient(#0000 50%, $primary 0), linear-gradient($primary 50%, #0000 0), linear-gradient(#0000 50%, $primary 0), linear-gradient($primary 50%, #0000 0), linear-gradient(#0000 50%, $primary 0) $background
  background-size: calc(100%/6 + 1px) 200%
  background-repeat: no-repeat
  animation: loader 2s infinite

@keyframes loader
  0%
    background-position: calc(0*100%/5) 100%, calc(1*100%/5) 0, calc(2*100%/5) 100%, calc(3*100%/5) 0, calc(4*100%/5) 100%, calc(5*100%/5) 0
  16.67%
    background-position: calc(0*100%/5) 0, calc(1*100%/5) 0,calc(2*100%/5) 100%,calc(3*100%/5) 0, calc(4*100%/5) 100%, calc(5*100%/5) 0
  33.33%
    background-position: calc(0*100%/5) 0,calc(1*100%/5) 100%,calc(2*100%/5) 100%,calc(3*100%/5) 0,calc(4*100%/5) 100%,calc(5*100%/5) 0
  50%
    background-position: calc(0*100%/5) 0,calc(1*100%/5) 100%,calc(2*100%/5) 0, calc(3*100%/5) 0, calc(4*100%/5) 100%, calc(5*100%/5) 0
  66.67%
    background-position: calc(0*100%/5) 0,calc(1*100%/5) 100%,calc(2*100%/5) 0, calc(3*100%/5) 100%, calc(4*100%/5) 100%, calc(5*100%/5) 0
  83.33%
    background-position: calc(0*100%/5) 0, calc(1*100%/5) 100%, calc(2*100%/5) 0, calc(3*100%/5) 100%, calc(4*100%/5) 0, calc(5*100%/5) 0
  100%
    background-position: calc(0*100%/5) 0, calc(1*100%/5) 100%, calc(2*100%/5) 0, calc(3*100%/5) 100%, calc(4*100%/5) 0, calc(5*100%/5) 100%
</style>
<script setup lang="ts"></script>
