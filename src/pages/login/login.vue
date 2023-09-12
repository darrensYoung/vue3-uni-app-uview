<template>

    <x-layout title="登录">
        <view class="logo" hover-class="none"> </view>
        <view class="btn" hover-class="none" hover-stop-propagation="false">
             <!-- <u-button type="primary" text="微信登录" @click="getPhoneNumber"></u-button> -->
             <u-button type="primary" text="微信登录" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @click="login"></u-button>
        </view>
        <view class="" hover-class="none" hover-stop-propagation="false">
            点击登录及代表同意用户协议
        </view>
    </x-layout>
</template>
<script lang="ts" setup>

 import { wxGetUserProfile, wxLogin } from '@/utils/login'
// 获取手机号
let login = async () => {
 let resLogin = await Promise.all([wxGetUserProfile(), wxLogin()])
   console.log(resLogin)
}
let getPhoneNumber = (res: any) => {
    console.log(res)
    login()
}
</script>
<style lang="scss" scoped>
.logo {
    width: 100rpx;
    height: 100rpx;
    background-color: red;
    margin: 0 auto;
    margin-top: 100rpx;
}

.btn {
    margin: 0 auto;
    margin-top: 100rpx;
    width: 680rpx;

}
</style>
