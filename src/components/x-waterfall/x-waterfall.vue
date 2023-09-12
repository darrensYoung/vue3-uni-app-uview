<template>
	<view class="waterfalls-flow">
		<view v-for="(item, index) in data.column" :key="index" class="waterfalls-flow-column"
			:id="`waterfalls_flow_column_${index + 1}`" :style="{ 'width': w, 'margin-left': index == 0 ? 0 : m }">
			<view class="column-value" v-for="(item2, index2) in data[`column_${index + 1}_values`]" :key="index2"
				@click.stop="wapperClick(item2)">
				<image class="img" :src="item2[data.imageKey]" mode="widthFix" @load="imgLoad(item2)"
					@error="imgError(item2)"></image>
				<view class="inner">
					<slot :name="`slot${item2.index}`"></slot>
				</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, getCurrentInstance, onMounted } from 'vue';
const _this = getCurrentInstance();
 let emit =	defineEmits<{
	 (event: "wapperClick", item: any): void;
 }>()
interface Data {
	list?: any[],
	column?: string | number,
	columnSpace?: string | number,
	imageKey?: string,
}
const data: any = reactive<Data>({


});
const props_data = defineProps({
	value: Array,
	column: { // 列的数量 
		type: [String, Number],
		default: 2
	},
	columnSpace: { // 列之间的间距 百分比
		type: [String, Number],
		default: 2
	},
	imageKey: { // 图片key
		type: [String],
		default: 'image'
	}
});
// 数据赋值
data.list = props_data.value ? props_data.value : [];
data.column = props_data.column < 2 ? 2 : props_data.column;
data.columnSpace = props_data.columnSpace <= 5 ? props_data.columnSpace : 5;
data.imageKey = props_data.imageKey;
// 计算列宽
const w = computed(() => {
	const column_rate = `${100 / data.column - (+data.columnSpace)}%`;
	return column_rate;
})
// 计算margin
const m = computed(() => {
	const column_margin = `${(100 - +(100 / data.column - (+data.columnSpace)).toFixed(5) * data.column) / (data.column - 1)}%`;
	return column_margin;
})
// 每列的数据初始化
for (let i = 1; i <= data.column; i++) {
	data[`column_${i}_values`] = [];
}
// 获取最小值的对象
const getMin = (a: any, s: any) => {
	let m = a[0][s];
	let mo = a[0];
	for (var i = a.length - 1; i >= 0; i--) {
		if (a[i][s] < m) {
			m = a[i][s];
		}
	}
	mo = a.filter((i: any) => i[s] == m);
	return mo[0];
}
// 计算每列的高度
function getMinColumnHeight() {
	return new Promise(resolve => {
		const heightArr: any = [];
		for (let i = 1; i <= data.column; i++) {
			const query = uni.createSelectorQuery().in(_this);
			query.select(`#waterfalls_flow_column_${i}`).boundingClientRect(data => {
				heightArr.push({ column: i, height: data.height });
			}).exec(() => {
				if (data.column <= heightArr.length) {
					resolve(getMin(heightArr, 'height'));
				}
			});
		}
	})
};
async function initValue(i: any) {
	if (i >= data.list.length) return false;
	const minHeightRes: any = await getMinColumnHeight();
	data[`column_${minHeightRes.column}_values`].push({ ...data.list[i], index: i });
}
onMounted(() => {
	initValue(0);
})
// 单项点击时间
function wapperClick(item: any) {

	emit('wapperClick',item)
}
// 图片加载完成
function imgLoad(item: any) {
	const i = item.index;
	initValue(i + 1);
}
// 图片加载失败
function imgError(item: any) {
	const i = item.index;
	initValue(i + 1);
	item[data.imageKey] = null;
}
// 监听数据的变化
watch(() => props_data.value, (newValue, oldValue) => {
	const oldLength = oldValue ? oldValue.length : 0;
	data.list = newValue;
	if (oldLength > 0) initValue(oldLength);
}, { immediate: true });
</script>
<style lang="scss" scoped>
.waterfalls-flow {
	padding: 10rpx;
	box-sizing: border-box;

	&-column {
		float: left;
	}
}

.column-value {
	width: 100%;
	font-size: 0;
	padding: 10rpx;
	box-sizing: border-box;
	background: #ccc;

	.inner {
		font-size: 30rpx;
	}

	.img {
		width: 100%;

		&-error {
			background: #f2f2f2 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAiAQMAAAAatXkPAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAAIZJREFUCNdlzjEKwkAUBNAfEGyCuYBkLyLuxRYW2SKlV1JSeA2tUiZg4YrLjv9PGsHqNTPMSAQuyAJgRDHSyvBPwtZoSJXakeJI9iuRLGDygdl6V0yKDtyMAeMPZySj8yfD+UapvRPj2JOwkyAooSV5IwdDjPdCPspe8LyTl9IKJvDETKKRv6vnlUasgg0fAAAAAElFTkSuQmCC) no-repeat center center;
		}
	}
}
</style>
