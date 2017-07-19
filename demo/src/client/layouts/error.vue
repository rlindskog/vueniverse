<template>
  <v-container>
    <h1>
      {{ error.statusCode }}
    </h1>
    <h2>
      {{ error.message }}
    </h2>
    <v-btn router to="/" v-if="error.statusCode === 404">Home</v-btn>
  </v-container>
</template>

<script>
export default {
  props: ['error']
}
</script>
