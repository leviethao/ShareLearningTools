<!-- app -->
<template>
  <div>
    <!-- <modal :toggleModal="toggleModal"/> -->
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <image-modal
      v-if="showModal"
      @close="showModal = false"
      :imgSrc="imgSrc">
      <!--
        you can use custom content here to overwrite
        default content
      -->
    </image-modal>    
  </div>
</template>

<script>
import ImageModal from './ImageModal'

export default {
  components: {
    ImageModal
  },
  data () {
    return {
      showModal: false,
      imgSrc: '../assets/images/catalog/item.png'
    }
  }
}
</script>