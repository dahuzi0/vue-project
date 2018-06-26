/**
* Author: earl
* Create Time: 2018-06-26 14:27
* Description: 图片
*/

<template>
  <div>
    <div class="clearfix _cropper">
      <div class="_pic">
        <vueCropper
          ref="cropper"
          :img="this.option.img"
          :outputSize="this.option.size"
          :outputType="this.option.outputType"
          :info="true"
          :full="this.option.full"
          :canMove="this.option.canMove"
          :canMoveBox="this.option.canMoveBox"
          :fixedBox="this.option.fixedBox"
          :original="this.option.original"
          @realTime="realTime"
        ></vueCropper>
      </div>
    </div>
    <div class="test-button">
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
             accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
      <button @click="startCrop" v-if="!crap" class="btn">start</button>
      <button @click="stopCrop" v-else class="btn">stop</button>
      <button @click="clearCrop" class="btn">clear</button>
      <button @click="finish('base64')" class="btn">preview(base64)</button>
      <button @click="finish('blob')" class="btn">preview(blob)</button>
      <a @click="down('base64')" class="btn">download(base64)</a>
      <a @click="down('blob')" class="btn">download(blob)</a>
      <div style="display:block; width: 100%;">
        <label class="c-item">
          <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
          <input type="checkbox" v-model="option.original">
        </label>
        <label class="c-item">
          <span>能否拖动图片</span>
          <input type="checkbox" v-model="option.canMove">
        </label>
        <label class="c-item">
          <span>能否拖动截图框</span>
          <input type="checkbox" v-model="option.canMoveBox">
        </label>
        <label class="c-item">
          <span>截图固定大小</span>
          <input type="checkbox" v-model="option.fixedBox">
        </label>
        <label class="c-item">
          <span>是否输出原图比例的截图</span>
          <input type="checkbox" v-model="option.full">
        </label>
        <p>输出图片格式</p>
        <label class="c-item">
          <label>jpg  <input type="radio" name="type" value="jpeg" v-model="option.outputType"></label>
          <label>png  <input type="radio" name="type" value="png" v-model="option.outputType"></label>
          <label>webp <input type="radio" name="type" value="webp" v-model="option.outputType"></label>
        </label>
      </div>
    </div>
    <div class="show-preview"
         :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
  </div>
</template>
<script>
  import vueCropper from 'vue-cropper'

  export default {
    data: function () {
      return {
        crap: false,
        previews: {},
        lists: [
          {
            img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
          }
        ],
        option: {
          img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: false
        },
        downImg: '#'
      }
    },
    created: function () {

    },
    methods: {
      startCrop() {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      stopCrop() {
        //  stop
        this.crap = false
        this.$refs.cropper.stopCrop()
      },
      clearCrop() {
        // clear
        this.$refs.cropper.clearCrop()
      },
      // 实时预览函数
      realTime(data) {
        this.previews = data
      },
      finish(type) {
        // 输出
        var test = window.open('about:blank')
        test.document.body.innerHTML = '图片生成中..'
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var test = window.open('')
            test.location.href = window.URL.createObjectURL(data)
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            test.location.href = data
          })
        }
      },

      down(type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },

      uploadImg(e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      }
    },
    components: {
      vueCropper
    },
  }
</script>

<style scoped>
  ._pic {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    user-select: none;
  }

  ._cropper{
    position: relative;
    height: 700px;
  }

  .show-preview{
    margin-bottom: 10px;
  }
</style>
