<template>
  <div class="sphere_container">
      <div class="floor floor_one"></div>
      <div class="floor floor_two"></div>
      <div class="floor floor_three"></div>
      <div class="floor floor_four"></div>
      <div class="floor floor_five"></div>


    <div class="right_anchor">
      <ul>
        <li class="dot" @click="anchors(1)"></li>
        <li :class="steps == 1?'lines':'no_line'"></li>
        <li class="dot" @click="anchors(2)"></li>
        <li :class="steps == 2?'lines':'no_line'"></li>
        <li class="dot" @click="anchors(3)"></li>
        <li :class="steps == 3?'lines':'no_line'"></li>
        <li class="dot" @click="anchors(4)"></li>
        <li :class="steps == 4?'lines':'no_line'"></li>
        <li class="dot" @click="anchors(5)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      steps:0,
      scrolltop : 0 ,//滑轮 距顶部的距离
      floorOne:0,
      floorTwo:0,
      floorThree:0,
      floorFour:0,
      floorFive:0
    }
  },
  mounted(){
    this.getFloorDistance();
    this.getPulleyTopDistance();
  },
  methods:{
    anchors(val){
      switch (val){
        case 1 :
          this.pulleyRoll(this.floorOne,this.scrolltop);
          break;
        case 2 :
          this.pulleyRoll(this.floorTwo,this.scrolltop);
          break;
        case 3 :
          this.pulleyRoll(this.floorThree,this.scrolltop);
          break;
        case 4 :
          this.pulleyRoll(this.floorFour,this.scrolltop);
          break;
        case 5 :
          this.pulleyRoll(this.floorFive,this.scrolltop);
          break;
      }
    },

    /**
     * 滑轮 向上滚动和向下滚动的函数
     * top是楼层距窗体顶部的距离,distance当前滚动条与窗体顶部的距离
     * */
    pulleyRoll(top,distance){
      /*向下滚动*/
      if(distance < top){
        var small_interval = (top-distance)/50;
        var i = 0;
        var timer = setInterval(()=>{
          i++;
          console.log(distance+= small_interval);
          document.documentElement.scrollTop = distance;
          if(i == 50){
            clearInterval(timer);
          }
        },10)
      }
      /*向上滚动*/
      else if(distance > top){
        var small_interval = (distance - top)/50;
        var i = 0;
        var timer = setInterval(()=>{
          i ++;
          console.log(distance -= small_interval);
          document.documentElement.scrollTop = distance;
          if(i == 50){
            clearInterval(timer);
          }
        },10);
      }
    },

    /**
     * 拿到所有 楼层距窗体顶部的距离
     * */
    getFloorDistance(){
      //拿到每个 楼层距窗体顶部的距离
      let floorOne = document.getElementsByClassName("floor_one")[0].offsetTop;
      let floorTwo = document.getElementsByClassName('floor_two')[0].offsetTop;
      let floorThree = document.getElementsByClassName('floor_three')[0].offsetTop;
      let floorFour = document.getElementsByClassName('floor_four')[0].offsetTop;
      let floorFive = document.getElementsByClassName('floor_five')[0].offsetTop;
      this.floorOne = floorOne;
      this.floorTwo = floorTwo;
      this.floorThree = floorThree;
      this.floorFour = floorFour;
      this.floorFive = floorFive;
    },

    /**
     * 滑轮滚动事件 返回滑轮距顶部的距离
     * */
    getPulleyTopDistance(){
      var that = this;
      window.onscroll = function(){
        that.scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
      }
    }
  },
  watch:{
    //监听 滑轮滚动的值的变化 来实现自动锚点
    scrolltop(val){
      val += 200;
      if(val > this.floorOne && val <= this.floorTwo){
        this.steps = 0;
      } else if(val > this.floorTwo && val <= this.floorThree){
        this.steps = 1;
        console.log(1)
      }else if(val > this.floorThree && val <= this.floorFour){
        this.steps = 2;
        console.log(2)
      }else if(val > this.floorFour && val <= this.floorFive){
        this.steps = 3;
        console.log(3)
      }else if(val > this.floorFive){
        this.steps = 4;
        console.log(4)
      }
    },
    steps(res){
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sphere_container{
    .floor{
      height: 1000px;
    }
    .floor_one{
      background: #ff7488;
    }
    .floor_two{
      background: #b5ff8a;
    }
    .floor_three{
      background: #6db9ff;
    }
    .floor_four{
      background: #c277ff;
    }
    .floor_five{
      background: #4139ff;
    }

    .no_line{
      width: 2px;
      height: 40px;
      background: none;
      text-align: center;
      border-radius: 0;
      margin: 0 auto;
    }
    .lines{
      width: 2px;
      height: 40px;
      background: #fff;
      text-align: center;
      border-radius: 0;
      margin: 0 auto;
    }

    .right_anchor{
      position: fixed;
      right: 30px;
      top: 30%;
      width: 20px;
      height: 100px;
      z-index: 999;
      ul{
        .dot{
          width: 15px;
          height: 15px;
          border-radius: 100%;
          margin: 0 auto;
          background: #fff;
        }
        .dot{
          cursor: pointer;
        }
      }
    }
  }

</style>
