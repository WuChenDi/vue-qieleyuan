<template>
	<div class="exchangeInfo-modal">
		<div class="header">
			<img :src="userHeadImg" class="headImg">
		</div>
		<div class="content">
			<p>商品：{{exchangeInfo.name}}</p>
			<p class="info1">
				<span>{{time}}</span>
				<span class="num">{{exchangeInfo.price}}果</span>
			</p>
			<p class="info2">
				<span>收货人：{{addressInfo.name}}</span>
				<span class="phone">{{addressInfo.phone}}</span>
			</p>
			<p class="address" v-if="exchangeInfo.id">收货地址：{{addressInfo.province + addressInfo.city + addressInfo.area + addressInfo.desc}}</p>
		</div>
		<div class="footer" v-if="exchangeInfo.id !== 2">
			<div class="modifyInfo btn" @click="modifyInfo">修改地址</div>
			<div class="sureExchange btn" @click="sureExchange">确认兑换</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { sureExchange } from '@/js/allAxiosRequire';

	export default {
		props: ['addressInfo', 'exchangeInfo'],
		data() {
			return {
				userHeadImg: ''
			}
		},
		mounted() {
			this.loadHeadImg();
		},
		methods: {
			loadHeadImg() {
				if(sessionStorage.userHeadImg) {
					this.userHeadImg = sessionStorage.userHeadImg;
				}
			},
			modifyInfo() {
				this.$emit('modifyInfo');
			},
			sureExchange() {
				sureExchange(this.exchangeInfo.id, this.addressInfo.id)
				.then(function (response) {
					if(response.data.data) {
						Bus.$emit('openTipModal', response.data.data.info);
						this.$emit('closeExchangeInfo');
					}else {
						Bus.$emit('openTipModal', response.data.msg);
						this.$emit('closeExchangeInfo');
					}
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg);
						}
					}
				}.bind(this))
			}
		},
		computed: {
			time() {
				let time = new Date();
				return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
			}
		}
	}
</script>

<style scoped lang="less" type="text/less">
	.exchangeInfo-modal {
		position: absolute;
		top: 0;
		left: 0;
		width: 80%;
		height: 95%;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 0.5rem;

		background-color: rgba(0, 0, 0, 0.4);
		border: 1px solid #000;
		border-left-color: rgba(238, 158, 25, 0.5);
		border-top-color: rgba(200, 210, 10, 0.5);
		border-right-color: rgba(238, 158, 25, 0.5);
		border-bottom-color: rgba(200, 210, 10, 0.5);
		border-radius: 0.5rem;
		overflow: hidden;

		.header {
			height: 40%;
			display: flex;
			justify-content: center;
			align-items: center;

			.headImg {
				width: 5rem;
				height: 5rem;
			}
		}

		.content {
			min-height: 42%;
			line-height: 1.7rem;
			font-size: 0.85rem;
			padding: 0 0.8rem;

			p {
				margin: 0;
			}

			.num {
				float: right;
			}

			.phone {
				float: right;
			}

			.address {
				word-wrap: break-word;
				word-break: break-all;
			}
		}

		.footer {
			padding: 0.5rem 0.8rem 0 0.8rem;

			.btn {
				display: inline-block;
				background-color: #3692b6;
				font-size: 0.9rem;
				padding: 0 0.5rem;
				border-radius: 1rem;
			}

			.modifyInfo {
				float: left;
			}

			.sureExchange {
				float: right;
			}
		}
	}
</style>