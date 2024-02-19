<template>
<!--      <h5>Draggable {{ draggingInfo }}</h5>-->
  <a-list>
    <draggable
        :list="list"
        :disabled="!enabled"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
    >
        <template #item="{ element }">
          <a-list-item>
            {{ element.name }}
          </a-list-item>
        </template>
    </draggable>
  </a-list>
</template>

<script>
import draggable from "vuedraggable";
let id = 1;
export default {
  name: "DragBox",
  display: "Simple",
  order: 0,
  components: {
    draggable
  },
  props: {
    list: {
      required: true,
      type: Array,
      default: []
    }
  },
  data() {
    return {
      enabled: true,
      dragging: false
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    }
  }
};
</script>
<style scoped>
.not-draggable {
  cursor: no-drop;
}

</style>
