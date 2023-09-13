<template>
  <x-layout  :isLogo="true">
    <view class='is_fixed' :style="{ top: offsetTop + 'rpx' }">
      <u-tabs :list="list1" @change="tabsChange" :current="activeIndex"></u-tabs>
      <!-- dev  -->
    </view>

    <swiper class="swiper" :indicator-dots="data.indicatorDots" :autoplay="data.autoplay" :interval="data.interval"
      :duration="data.duration" @change="swiperChange" :current="activeIndex" :data-name="list1[activeIndex].name">
      <swiper-item class="swiper-item">
        <scroll-view class="scroll-y" scroll-y="true" @scrolltolower="ReachBottom">
          <x-waterfall :value="data2.list" :column="column" :columnSpace="1" @wapperClick="wapperClick">
            <view class="item" v-for="(item, index) in data2.list" :key="index" :slot="`slot${index}`">
              <view class="title">{{ item.title }}</view>
              <!-- <view class="icon" hover-class="none" hover-stop-propagation="false">

              </view> -->
              <view class="desc">{{ item.desc }}</view>
            </view>
          </x-waterfall>
          <!-- <view class="block" hover-class="none" hover-stop-propagation="false">
                22222121212
          </view> -->
        </scroll-view>

      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view class="scroll-y" scroll-y="true" @scrolltolower="ReachBottom">
          <view class="swiper-item-content">
            <view class="box">
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
              <view class="box-list"></view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view class="scroll-y" scroll-y="true" @scrolltolower="ReachBottom">
          <view class="swiper-item-content">
            <view v-for="item in 5">
              <u-button>提交</u-button>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>

  </x-layout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { useStore } from 'vuex'
import { testGetPer } from '@/api'
let offsetTop = ref<number>(0)
let data = ref({
  indicatorDots: false,
  autoplay: false,
  interval: 2000,
  duration: 500
})
const store = useStore()
let activeIndex = ref(0)
// let swiperHeight = ref(0)
let list1 = ref([{
  name: '关注'
}, {
  name: '推荐',
  badge: {
    isDot: true
  }
}, {
  name: '电影',
  badge: {
    value: 5,
  }
}, {
  name: '科技'
}, {
  name: '音乐'
}, {
  name: '美食'
}, {
  name: '文化'
}, {
  name: '财经'
}, {
  name: '手工1'
}])

const data2 = reactive({
  list: [
    { image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
    { image: 'https://via.placeholder.com/200x200.png/2878ff', title: '我是标题2', desc: '描述描述描述描述描述描述描述描述2' },
    { image: 'https://via.placeholder.com/200x100.png/FFB6C1', title: '我是标题3', desc: '描述描述描述描述描述描述描述描述3' },
    { image: 'https://via.placeholder.com/200x300.png/9400D3', title: '我是标题4', desc: '描述描述描述描述描述描述描述描述4' },
    { image: 'https://via.placeholder.com/100x240.png/B0E0E6', title: '我是标题5', desc: '描述描述描述描述描述描述描述描述5' },
    { image: 'https://via.placeholder.com/140x280.png/7FFFAA', title: '我是标题6', desc: '描述描述描述描述描述描述描述描述6' },
    { image: 'https://via.placeholder.com/40x60.png/EEE8AA', title: '我是标题7', desc: '描述描述描述描述描述描述描述描述7' },
    { image: 'https://via.placeholder.com/40x60.png/EEE8AA', title: '我是标题7', desc: '描述描述描述描述描述描述描述描述8' },
  ]
})
const column = ref(2);
let loading = ref(true)
testGetPer({ mini_id: 1 }).then((res: any) => {
  console.log(res)
})
  console.log( store)


const click = () => {

  uni.$u.route('pagesA/my/my')


  // store.commit("login/increment")
  // uni.$u.sleep(2000).then(() => {
  // 		 loading.value = false
  // 	})
}
const setOffestTop = () => {
  let systemInfo = uni.$u.sys()
  console.log(systemInfo.statusBarHeight)
  let topPx = systemInfo.statusBarHeight + 43 // 顶部状态栏+沉浸式自定义顶部导航
  offsetTop.value = topPx / (uni.upx2px(topPx) / topPx) // px转rpx


}

// 获取当前swiper的高度
// const getCurrentSwiperHeight = async () => {
//   nextTick(() => {
//     const query = uni.createSelectorQuery();
//     query.selectAll('.swiper-item-content').boundingClientRect(async (data: any) => {
//       console.log("得到布局位置信息：", data);
//       // swiperHeight.value = data[activeIndex.value].height

//     }).exec();
//   }
//   )

// }
const wapperClick = (item: any) => {
  console.log(item.image)
  // 跳转视频号主页
  wx.openChannelsUserProfile({
    finderUserName: 'sphymc6hJtMI4i6',
    success(res: any) {
      console.log(res)
    }
  })
}
const tabsChange = (item: any) => {
  console.log(item)
  activeIndex.value = item.index
  // getCurrentSwiperHeight()
}
const swiperChange = (event: any) => {
  console.log(event)
  activeIndex.value = event.detail.current
  // getCurrentSwiperHeight()
}
const ReachBottom = (e: any) => {
  console.log('22222222211')
  console.log(e)//在这里调用追加数据的方法即可
  uni.showToast({
    title: '2'
  })
}
const clickVideo = () => {
  console.log('2222')
  // 跳转视频号主页
  wx.openChannelsUserProfile({
    finderUserName: 'sphymc6hJtMI4i6',
    success(res: any) {
      console.log(res)
    }
  })
  // 跳转视频号
  // wx.openChannelsActivity({
  //   finderUserName: 'sphmCN6IMLiKIs9',
  //   feedId: 'export/UzFfAgtgekIEAQAAAAAAtbAZ7CFOOgAAAAstQy6ubaLX4KHWvLEZgBPEx4IIbydEH9-DzNPgMJoJGWOl4wra2sMd8hTpu831',
  //   success(res: any) {
  //     console.log(res)
  //   }
  // })
}

onLoad(() => {
  // getCurrentSwiperHeight()
  // 获取直播信息
  wx.getChannelsLiveInfo({
    finderUserName: 'sphmCN6IMLiKIs9',
    success(res: any) {
      console.log(res)
    }
  })


})
onShow(() => {
  setOffestTop()
})

// onReachBottom(() => {
//   // console.log('2')

// })
// onPageScroll((e) => {
//   // console.log(e)
//   rect.value = e.scrollTop
//   console.log(menutop.value + '------>' + e.scrollTop)
//   if (rect.value > menutop.value) {
//     isfixed.value = true
//   } else {
//     isfixed.value = false
//   }
// })
</script>

<style lang="scss">
.swiper {
  // height: v-bind(swiperHeight + 'px')
  height: calc(100% - 264rpx);
  // margin-bottom: 120rpx;
}


.scroll-y {
  width: 100%;
  height: 100%;
  padding-bottom: 300rpx;
}

.is_fixed {
  position: sticky;
  position: -webkit-sticky;
  top: 200rpx;
  background-color: #fff;
  color: #fff;
  z-index: 9999;

}


.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

/* //瀑布流 */
page {
  background-color: #eee;
  height: 100%;
}

// .pubuBox {
//   padding: 22rpx;
// }

.swiper-item-content {
  height: auto;
}

.swiper-item {
  // height: calc(100% - 264rpx) !important;
  // overflow: auto !important;
}

.swiper-item-cloum {
  column-count: 2;
  column-gap: 20rpx;
  padding: 20rpx;
  box-sizing: border-box;
}

.item-masonry {
  box-sizing: border-box;
  border-radius: 15rpx;
  overflow: hidden;
  background-color: #fff;
  break-inside: avoid;
  /*避免在元素内部插入分页符*/
  box-sizing: border-box;
  margin-bottom: 20rpx;
  box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
}

.item-masonry image {
  width: 100%;
}

.listtitle {
  padding-left: 22rpx;
  font-size: 24rpx;
  padding-bottom: 22rpx;

  .listtitle1 {
    line-height: 39rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 39rpx;
    max-height: 78rpx;
  }

  .listtitle2 {
    color: #ff0000;
    font-size: 32rpx;
    line-height: 32rpx;
    font-weight: bold;
    padding-top: 22rpx;

    .listtitle2son {
      font-size: 32rpx;
    }
  }

  .listtitle3 {
    font-size: 28rpx;
    color: #909399;
    line-height: 32rpx;
    padding-top: 22rpx;
  }
}

.icon {
  width: 20rpx;
  height: 20rpx;
  background-color: yellow;

}

.box {
  //  display: flex;
  //  flex-wrap: wrap;
  //  justify-content: space-between;
  //  padding: 20rpx;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 10rpx;
  box-sizing: border-box;

  .box-list {
    display: inline-block;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    width: 355rpx;
    height: 300rpx;
    background-color: red;

    // margin: 0 5rpx ;
    &:nth-child(1n) {
      margin-right: 10rpx;
    }

    &:nth-child(2n) {
      margin-right: 0;
      margin-left: 10rpx;
    }
  }
}

.block {
  width: 100%;
  height: 20rpx;

}
</style>
