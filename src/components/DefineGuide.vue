<template>
  <div class="home">
    <div class="container">
      <div ref="el1" style="width: 100%">
        Guide Testing
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'DefineGuide',
  data(){
    return {
      tour: null
    }
  },

  methods: {
    createTour(){
      this.tour = this.$shepherd({
        useModalOverlay: true
      });

      this.tour.addStep({
        attachTo: { element: this.$refs.el1, on: 'top' },
        text: 'this is top'
      });
    }
  },

  mounted(){
    this.createTour();
    this.tour.start();
  }
});

</script>

<style scoped lang="scss">
.home{
  padding: 120px 10%;
  .container{
    width: 100%;
  }
}
</style>
