<template>
  <v-edit-dialog
    @open="item[`_${itemName}`] = item[itemName]"
    @cancel="item[itemName] = item[`_${itemName}`]"
    @save="updateItem"
    lazy>
    {{ item[itemName] }}
    <v-text-field
      v-if="editable !== false"
      slot="input"
      label="Edit"
      :value="item[itemName]"
      single-line
      counter="counter"
      v-model="item[itemName]">
    </v-text-field>
  </v-edit-dialog>
  <!-- <v-switch v-bind:label="`Switch 1: ${ex11.toString()}`" v-model="ex11"></v-switch> -->
</template>

<script>
import axios from '~/plugins/axios'
export default {
  props: ['itemName', 'item', 'type', 'editable', 'endpoint', 'to'],
  methods: {
    async updateItem () {
      try {
        let { data } = await axios.post(this.endpoint, { [this.itemName]: this.item[this.itemName] })
        this.$store.commit('notification/SUCCESS', data)
      } catch (error) {
        console.log(error)
        this.$store.commit('notification/FAILURE', error.response.data)
      }
    }
  }
}
</script>

