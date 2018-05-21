<template>
	<div class="farm" ref="farm">
    <cell v-for="(item, index) in lands" :cell="item"  :key="item.id"></cell>
    <cell-message-modal></cell-message-modal>
	</div>
</template>
<script>
import CellMessageModal from '@/components/modal/cell-message-modal'
import Cell from '@/components/farm/cell'
export default {
  name: 'farm',
  props: {
    'lands': {
      type: Array,
      default () {
        let emptyLandsArray = []
        for (var i = 0; i < 15; i++) {
          emptyLandsArray.push(new Object())
        }
      }
    },
    'fertilizer': {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.setCellPosition1()
  },
  updated () {
    this.setCellPosition1()
  },
  methods: {
    setCellPosition1 () {
      let cells = $(this.$refs.farm).children('.farm-cell')
      // initX：初始第一块绿地的绝对定位的X数值（%）
      // initY：初始第一块绿地的绝对定位的Y数值（%）
      // offsetX：同一层不同颜色的土地的绝对定位的X数值的偏移量（%）
      // offsetY：同一层不同颜色的土地的绝对定位的Y数值的偏移量（%）
      // offsetx：每一块相同颜色的土地相对上一块相对颜色的土地的都绝对定位的X数值的偏移量（%）
      // offsety：每一块相同颜色的土地相对上一块相对颜色的土地的都绝对定位的X数值的偏移量（%）
      let [initX, initY, offsetX, offsetY, offsetx, offsety] = [17, -2, -9, 20, (59/4), (18/4)]
      let color = ['farm-cell-green', 'farm-cell-red', 'farm-cell-yellow']
      for (let [i, c] = [0, 0]; i < cells.length; i+=5, c++) {
        let [firstCellX, firstCellY] = [(initX + (i / 5) * offsetX), (initY + (i / 5) * offsetY)]
        for (let j = 0; j < 5; j++) {
          let [cellX, cellY, cellOrder] = [(firstCellX + offsetx * j), (firstCellY + offsety * j), (i + j)]
          cells[cellOrder].style.left = cellX + '%'
          cells[cellOrder].style.top = cellY + '%'
          $(cells[cellOrder]).addClass(color[c])
        }
      }
    }
  },
  components: {
    Cell,
    CellMessageModal
  }
}
</script>
<style scoped lang="less" type="text/less">
.farm {
	position: absolute;
	z-index: 2;
	left: 18%;
	right: 18%;
	top: 46%;
	bottom: 16%;
}
</style>