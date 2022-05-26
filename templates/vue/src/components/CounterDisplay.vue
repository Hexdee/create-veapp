<template>
  <div class="counter">
    <p id="count">{{count}}</p>
  </div>
</template>

<script>
import {Contract, ticker} from "../config/connex"
export default {
  data() {
    return {
      count: undefined
    }
  },
  created() {
    this.getCount()
  },
  methods: {
    getCount() {
      ticker.next().then(() =>{
        Contract.count().then((res) => {
          this.count = Number(res.data)
          this.getCount()
        })
      })
    }
  }
}
</script>

<style scoped>

.counter {
  background-color: white;
  min-width: 200px;
  min-height: 200px;
  text-align: center;
  border-radius: 16px;
}

#count {
  font-size: 128px;
  margin: 0;
}

</style>
