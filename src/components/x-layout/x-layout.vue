<template>
      <view :style="{ height: `${statusBarHeight}px`,  'background-color': bgColor }"></view>
      <!-- 自定义导航栏高度 并 居中 -->
      <view :style="{
            height: `${barHeight}px`,
            'line-height': `${barHeight}px`,
            'text-align': 'center',
            'position':'relative',
            'background-color': `${bgColor}`
      }">
            <view class="home-logo" hover-class="none" hover-stop-propagation="false">
                  <u-image class="home-logo-image" width="192" height="42" mode="widthFix"
                        src="https://static.mini.scrmcdn.cn/mini_content%2Fnew_logo.png" v-if="isLogo && !isArrow && !isHome">
                  </u-image>
            </view>
            <view class="cus-icon"  v-if="isArrow">
            <u-icon name="arrow-left" size="40" :bold="true" :color="arrowColor" @click="leftClick">
            </u-icon>
            </view>
            <view class="cus-icon" v-if="!isArrow && isHome">
            <u-icon name="home" size="40"  @click="homeClick"></u-icon>
            </view>
            <text class="txt-restriction ellipsis"
                        :style="{ color: titleColor, fontWeight: fontWeight }">{{ title }}</text>
      </view>


      <slot></slot>
</template>
<script lang="ts" setup>
import { toRefs, onMounted, ref } from 'vue'
/**
 * title 标题
 * isArrow 是否展示回退箭头
 * isHome 是否展示
 * fixed 是否
 */
interface Props {
      title?: string
      isArrow?: boolean
      isHome?: boolean
      isLogo?: boolean
      bgColor?: string
      arrowColor?: string,
      titleColor?: string,
      fontWeight?: any
}
const props = withDefaults(defineProps<Props>(), {
      title: '',
      isArrow: false,
      isHome: false,
      isLogo: false,
      bgColor: '#fff',
      arrowColor: '#000000',
      titleColor: '#000000',
      fontWeight: 'normal'

})
const { title, isArrow, isHome } = toRefs(props)

let statusBarHeight = ref<any>(0)
let barHeight = ref<any>(38)

onMounted(() => {
      statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
      const { top, height } = wx.getMenuButtonBoundingClientRect()
      barHeight.value = height ? height + (top - statusBarHeight.value) * 2 : 38
})

let leftClick = () => {
      uni.navigateBack({
            delta: 1,
      })
}
let homeClick = () => {
      uni.switchTab({
            url: '/pages/index/index',
      })
}
</script>
<style lang="scss" scoped>
.txt-restriction {
      display: inline-block;
      width: 310rpx;
      text-align: center;
}

.page-wrap {
      height: 100%;
}

.home-logo {
      :v-deep(.u-image) {
            height: 44rpx !important;
      }
}
.cus-icon {
      display: inline-block;
      text-align: left;
      position: absolute;
      left: 20rpx;
      top: 50%;
      transform: translateY(-50%);

}
</style>
