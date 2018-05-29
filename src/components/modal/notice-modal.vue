<template>
	<div class="noticeModal">
		<p ref="noticeModalText">欢迎您进入企鹅乐园，祝您游戏愉快！</p>
	</div>
</template>

<script>
	export default {
		name: 'noticeModal',
		mounted: function () {
			let text = this.$refs.noticeModalText;
			(function() {
				var left = 10;
				var interval1 = setInterval(function() {
					left -= 1;
					text.style.left = left + 'px';
					if(left === -233) {
						left = 250;
					}
				}, 100);
			})();
		}

	}
</script>

<style lang="less" type="text/less">
	.noticeModal {
    width: 50%!important;
    height: 1.5rem!important;
    line-height: 1.5rem!important;
		position: absolute;
		top: 3.5rem;
		left: 0;
		width: 300px;		
		color: #fff;
		overflow-y: hidden;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 1rem;
		overflow-x: hidden;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		-webkit-justify-content: center;
		justify-content: center;
		p {
			font-size: 0.6rem;
			position: relative;
		}
	}

</style>