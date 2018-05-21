<template>
	<div class="receiptInfo-modal" v-show="showModal">
		<div class="title" v-if="type === 'add'">填写收货信息</div>
		<div class="title" v-else>修改收货信息</div>
		<div class="close" @click="close">
			<img src="~@/assets/close.png" class="img">
		</div>
		<div class="form">
			<div class="formGroup">
				<div class="left">收货人：</div>
				<div class="right">
					<input type="text" name="name" v-model="name">
				</div>
			</div>
			<div class="formGroup">
				<div class="left">联系电话：</div>
				<div class="right">
					<input type="number" name="phone" v-model="phone">
				</div>
			</div>
			<div class="formGroup">
				<div class="left">所在省市：</div>
				<div class="right select">
					<v-distpicker :province="defaultSelect.province" :city="defaultSelect.city" :area="defaultSelect.area"  @selected="onSelected"></v-distpicker>
				</div>
			</div>
			<div class="formGroup">
				<div class="left">具体地址：</div>
				<div class="right">
					<input type="text" name="address" v-model="specificAddress">
				</div>
			</div>
		</div>
		<div class="add" @click="add" v-if="type === 'add'">添加</div>
		<div class="btnGroup" v-else>
			<div class="btn modify" @click="modifyAddress">修改</div>
			<div class="btn delete" @click="deleteAddress">删除</div>
		</div>
		<div class="defaultAddress">
			<p class="text">设为默认收货地址</p>
			<input type="checkbox" name="defaultAddress" v-model="defaultAddress" class="checkbox">
		</div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import VDistpicker from '@/components/v-distpicker/Distpicker';
	import { addAddress, modifyAddress, deleteAddress } from '@/js/allAxiosRequire';
	Vue.component('v-distpicker', VDistpicker);

	export default {
		data() {
			return {
				showModal: false,
				type: 'add',
				id: 0,
				name: '',
				phone: '',
				defaultSelect: { 
					province: '',
					city: '',
					area: '' 
				},
				select: { 
					province: '',
					city: '',
					area: '' 
				},
				specificAddress: '',
				defaultAddress: false
			}
		},
		components: { 
			VDistpicker 
		},
		mounted() {
			this.modalEvent();
		},
		methods: {
			modalEvent() {
				Bus.$on('openReceiptInfoModal', function(info) {
					this.type = info.type;
					if(info.address) {
						this.id = info.address.id;
						this.name = info.address.name;
						this.phone = info.address.phone;
						this.defaultSelect.province = info.address.province;
						this.defaultSelect.city = info.address.city;
						this.defaultSelect.area = info.address.area;
						this.specificAddress = info.address.desc;
						this.defaultAddress = info.address.default === 1 ? true : false;
					}else {
						this.name = '';
						this.phone = '';
						this.defaultSelect.province = '';
						this.defaultSelect.city = '';
						this.defaultSelect.area = '';
						this.specificAddress = '';
						this.defaultAddress = false;
					}
					this.showModal = true;
				}.bind(this));
			},
			close() {
				this.showModal = false;
			},
			onSelected(data) {
				this.select.province = data.province.value;
				this.select.city = data.city.value;
				this.select.area = data.area.value;
			},
			add() {
				if(this.name === '' || this.phone === '' || this.select.area === '' || this.specificAddress === '') {
					Bus.$emit('openTipModal', '请填写完整信息');
					return;
				}

				let reg = /^1[0-9]{10}$/;
				if(!reg.test(this.phone)) {
					Bus.$emit('openTipModal', '请填写正确的手机号码');
					return;
				}

				addAddress({
					name: this.name,
					phone: this.phone,
					province: this.select.province,
					city: this.select.city,
					area: this.select.area,
					desc: this.specificAddress,
					default: this.defaultAddress === true ? 1 : 0
				}) 
				.then(function (response) {
					this.$emit('loadAddressList');
					Bus.$emit('openTipModal', response.data.msg);
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg);
						}
					}
				}.bind(this))
			},
			modifyAddress() {
				if(this.name === '' || this.phone === '' || this.select.area === '' || this.specificAddress === '') {
					Bus.$emit('openTipModal', '请填写完整信息');
					return;
				}

				let reg = /^1[0-9]{10}$/;
				if(!reg.test(this.phone)) {
					Bus.$emit('openTipModal', '请填写正确的手机号码');
					return;
				}

				modifyAddress(this.id, {
					name: this.name,
					phone: this.phone,
					province: this.select.province,
					city: this.select.city,
					area: this.select.area,
					desc: this.specificAddress,
					default: this.defaultAddress === true ? 1 : 0
				}) 
				.then(function (response) {
					this.$emit('loadAddressList');
					Bus.$emit('openTipModal', response.data.msg);
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg);
						}
					}
				}.bind(this))
			},
			deleteAddress() {
				deleteAddress(this.id)
				.then(function (response) {
					this.$emit('loadAddressList');
					this.showModal = false;
					Bus.$emit('openTipModal', response.data.msg);
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg);
						}
					}
				}.bind(this))
			}
		}
	}
</script>

<style scoped lang="less" type="text/less">
	.receiptInfo-modal {
		position: absolute;
		top: 3rem;
		right: 3rem;
		z-index: 100;
		width: 60%;
		height: 85%;
		background-color: #fff;
		color: #040404;
		border-radius: 0.3rem;

		.title {
			height: 2rem;
			text-align: center;
			font-size: 1.15rem;
			font-weight: 600;
			margin-top: 0.8rem
		}

		.close {
			position: absolute;
			top: -0.7rem;
			right: -0.7rem;
			width: 2.1rem;
			height: 2.1rem;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.form {
			margin-top: 0.5rem;
			padding-right: 1.5rem;

			.formGroup {
				height: 2rem;
				line-height: 2rem;
				margin-bottom: 0.4rem;

				.left {
					width: 32%;
					float: left;
					font-size: 0.9rem;
					text-align: right;
				}

				.right {
					float: left;
					margin-left: 0.5rem;
					width: 58%;

					input {
						width: 100%;
						height: 1.4rem;
						padding-left: 0.8rem;
						color: #fff;
						background-color: rgba(0, 0, 0, 0.3);
						border-radius: 1rem;
						background-color: rgba(0, 0, 0, 0.4);
						border: 1px solid #000;
						border-left-color: rgba(228, 25, 226, 0.5);
						border-top-color: rgba(228, 25, 226, 0.5);
						border-right-color: rgba(238, 158, 25, 0.5);
						border-bottom-color: rgba(238, 158, 25, 0.5);
					}
				}

				.select {
					width: 65%;
				}
			}
		}

		.add {
			width: 4rem;
			margin: 1rem auto 0 auto;
			padding: 0.2rem 0.1rem;
			font-size: 0.85rem;
			text-align: center;
			color: #fff;
			background-image: url('~@/assets/an-bg01.png');
			background-size: 100% 100%;
		}

		.btnGroup {
			margin-top: 1rem;
			text-align: center;
			.btn {
				display: inline-block;
				width: 4rem;
				padding: 0.2rem 0.1rem;
				font-size: 0.85rem;
				text-align: center;
				color: #fff;
				background-image: url('~@/assets/an-bg03.png');
				background-size: 100% 100%;
			}

			.delete {
				background-image: url('~@/assets/an-bg02.png');
			}
		}

		.defaultAddress {
			margin-top: 1rem;

			.text {
				width: 78%;
				float: left;
				margin: 0;
				font-size: 0.8rem;
				text-align: right;
			}

			.checkbox {
				position: relative;
				top: -0.15rem;
				left: 0.5rem;
			}
		}
	}
</style>