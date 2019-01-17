<template>
	<div class="modal-mask" v-if="showModal">
		<div class="modal shopping-modal">
			<div class="title">商城</div>
			<div class="modal-close" @click="close()"></div>
			<p class="tips">兑换需加收<span class="strong">10%</span>的手续费，提现需加收<span class="strong">20%</span>的手续费</p>
			<div class="modal-content">
				<div class="tabs-head">
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 1 || outerTabSelect === 5}" @click="clickOuterTab(1)">兑换商城</div>
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 2}" @click="clickOuterTab(2)">我的订单</div>
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 3}" @click="clickOuterTab(3)">兑换明细</div>
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 4}" @click="clickOuterTab(4)">地址列表</div>
					<div class="tabs-head-item" :class="{'head-select': outerTabSelect === 6}" @click="clickOuterTab(6)">企鹅提现</div>
				</div>
				<div class="tabs-content">
					<div class="tabs-content-item goodsPage" v-show="outerTabSelect === 1">
						<div id="goodsPageWrapper" class="scrollbar">
							<div class="list">
								<div class="itemContainer" v-for="item in goodsData" :key="item.id">
									<div class="item">
										<div class="imgContainer">
											<img :src="'//admin.811880.top' + item.img" class="img">
											<span class="stock" v-if="item.sum">剩余{{item.sum}}件</span>
										</div>
										<div class="btn num">{{item.name.length >= 10 ? item.name.slice(0, 10) + '...' : item.name}}</div>
										<div class="exchange" @click="exchange(item.name, item.sum, item.id, parseInt(item.fruit))">
											{{parseInt(item.fruit)}}只兑换
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<exchangeInfo-modal v-if="outerTabSelect === 5" :addressInfo="receivingAddress" :exchangeInfo="exchangeInfo" @modifyInfo="modifyInfo" @closeExchangeInfo="clickOuterTab(1)"></exchangeInfo-modal>
					<div class="tabs-content-item orderPage" v-show="outerTabSelect === 2">
						<div id="orderPageWrapper" class="scrollbar">
							<div class="list">
								<div class="item" v-for="item in orderList" :key="item.id">
									<div class="left">
										<img :src="userHeadImg" class="img">
									</div>
									<div class="right">
										<p class="info"><span class="time">{{item.created_at}}</span><span class="num">{{parseInt(item.goods.fruit)}}果</span></p>
										<p class="info2"><span class="name">收货人：{{item.name}}</span><span class="phone">{{item.phone}}</span></p>
										<p class="address">收货地址：{{item.address}}</p>
										<div class="sureReceipt" @click="sureReceipt(item.id)">确认收货</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tabs-content-item detailPage" v-show="outerTabSelect === 3">
						<div id="detailPageWrapper" class="scrollbar">
							<div class="list">
								<div class="item" v-for="item in orderDetailList" :key="item.id">
									<div class="left">
										<img class="headImg" :src="userHeadImg"></img>
									</div>
									<div class="right">
										<p class="time">{{item.created_at.split(' ')[0]}}</p>
										<p class="info"><span class="num">{{item.goods.name}}</span><span class="name">{{parseInt(item.goods.fruit)}}果</span></p>
										<!-- <p class="info2"><span class="text">花费：</span><span class="price">{{parseInt(item.goods.fruit)}}果</span></p> -->
										<div class="state">兑换成功</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tabs-content-item addressPage" v-show="outerTabSelect === 4">
						<div id="addressPageWrapper" class="scrollbar">
							<div class="list">
								<div class="item" v-for="item in addressList" :key="item.id">
									<img src="~@/assets/gou-ico2.png" class="gouIco" v-if="item.default === 1">
									<p class="address">{{item.province + item.city + item.area + item.desc}}</p>
									<p class="info">
										<span class="name">{{item.name}}</span>
										<span class="phone">{{item.phone}}</span>
									</p>
									<img src="~@/assets/setting.png" class="settingIco" @click="setAddress(item)">
								</div>
							</div>
						</div>
						<div class="add" @click="addAddress">添加</div>
					</div>
					<div class="tabs-content-item withdrawals" v-show="outerTabSelect === 6">
						<h2>个人信息</h2>
						<div class="formGroup">
							<div class="from">
								<label>账 户：</label>
								<input type="text" v-model="account" placeholder="请输入微信或支付宝账户">
							</div>
							<div class="from">
								<label>账户名：</label>
								<input type="text" v-model="accountName" placeholder="请输入姓名或昵称">
							</div>
							<div class="from">
								<label>企鹅数：</label>
								<input type="number" v-model="fruit" placeholder="请输入需要提现的企鹅数">
							</div>
							<div class="from">
								<label>类 型：</label>
								<div class="radios">
									<radio name="payType" v-model="payType" value="微信">
										微 信
									</radio>
									<radio name="payType" v-model="payType" value="支付宝">
										支付宝
									</radio>
								</div>
							</div>
							<div class="from">
								<label>备 注：</label>
								<input type="text" v-model="remark" placeholder="请填写联系方式或其他">
							</div>
							<div class="from">
								<button class="sure" @click="withdrawals">确认提现</button>
							</div>
						</div>
					</div>
				</div>
				<receiptInfoModal @loadAddressList="loadAddressList"></receiptInfoModal>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import ExchangeInfoModal from '@/components/modal/exchangeInfo-modal';
	import ReceiptInfoModal from '@/components/modal/receiptInfo-modal';
	import { getUserDate, loadGoodsData, loadAddressList, loadOrderList, sureReceipt, loadOrderDetail, fruitWithdrawals } from '@/js/allAxiosRequire';

	export default {
		data() {
			return {
				showModal: false,
				outerTabSelect: 1,
				userHeadImg: '',
				goodsData: [],
				addressList: [],
				receivingAddress: {},
				exchangeInfo: {
					name: '',
					id: 0,
					price: -1,
				},
				orderList: [],
				orderDetailList: [],
				account: '',
				accountName: '',
				fruit: '',
				payType: '微信',
				remark: ''
			}
		},
		components: {
			ExchangeInfoModal,
			ReceiptInfoModal
		},
		mounted() {
			this.modalEvent();
			this.loadGoodsData();
			this.loadAddressList();
		},
		methods: {
			modalEvent() {
				Bus.$on('openShoppingModal', function() {
					this.loadHeadImg();
					this.loadGoodsData();
					this.outerTabSelect = 1;
					setTimeout(() => {
						this.showModal = true;
					}, 500);
					this.createGoodsPageScroll();
				}.bind(this))
			},
			createGoodsPageScroll() {
				// this.$nextTick(() => {
				// 	if(!this.goodsPageScroll) {
				// 		this.goodsPageScroll = new iScroll('goodsPageWrapper', {
				// 			scrollbarClass: 'myScrollbar',
				// 			hScroll: true,
				// 			hScrollbar: true,
				// 			vScroll: true,
				// 			vScrollbar: true,
				// 			hideScrollbar: false,  
				// 			preventDefault: false
				// 		}); 
				// 	}else {
				// 		this.goodsPageScroll.refresh();
				// 	}
				// })
			},
			createOrderPageScroll() {
				// this.$nextTick(() => {
				// 	if(!this.orderPageScroll) {
				// 		this.orderPageScroll = new iScroll('orderPageWrapper', {
				// 			scrollbarClass: 'myScrollbar',
				// 			hScroll: true,
				// 			hScrollbar: true,
				// 			vScroll: true,
				// 			vScrollbar: true,
				// 			hideScrollbar: false,  
				// 			preventDefault: false
				// 		}); 
				// 	}else {
				// 		this.orderPageScroll.refresh();
				// 	}
				// })
			},
			createDetailPageScroll() {
				// this.$nextTick(() => {
				// 	if(!this.detailPageScroll) {
				// 		this.detailPageScroll = new iScroll('detailPageWrapper', {
				// 			scrollbarClass: 'myScrollbar',
				// 			hScroll: true,
				// 			hScrollbar: true,
				// 			vScroll: true,
				// 			vScrollbar: true,
				// 			hideScrollbar: false,  
				// 			preventDefault: false
				// 		}); 
				// 	}else {
				// 		this.detailPageScroll.refresh();
				// 	}
				// })
			},
			createAddressPageScroll() {
				// this.$nextTick(() => {
				// 	if(!this.addressPageScroll) {
				// 		this.addressPageScroll = new iScroll('addressPageWrapper', {
				// 			scrollbarClass: 'myScrollbar',
				// 			hScroll: true,
				// 			hScrollbar: true,
				// 			vScroll: true,
				// 			vScrollbar: true,
				// 			hideScrollbar: false,  
				// 			preventDefault: false
				// 		}); 
				// 	}else {
				// 		this.addressPageScroll.refresh();
				// 	}
				// })
			},
			loadHeadImg() {
				if(sessionStorage.userHeadImg) {
					console.log(sessionStorage.userHeadImg)
					this.userHeadImg = sessionStorage.userHeadImg;
				}
			},
			close () {
				this.showModal = false
			},
			clickOuterTab(index) {
				if(index === 1) {
					this.loadGoodsData();
				}else if(index === 2) {
					this.loadOrderList();
				}else if(index === 3) {
					this.loadOrderDetail();
				}

				this.outerTabSelect = index;
			},
			exchange(name, stock, id, price) {
				// if(stock <= 0) {
				// 	Bus.$emit('openTipModal', '该商品库存不足');
				// 	return;
				// }
				if(this.addressList.length <= 0) {
					Bus.$emit('openTipModal', '请先添加一个收货地址');
					this.outerTabSelect = 4;
				}else {
					this.exchangeInfo.name = name;
					this.exchangeInfo.id = id;
					this.exchangeInfo.price = price;
					this.outerTabSelect = 5;
				}
			},
			modifyInfo() {
				this.outerTabSelect = 4;
			},
			addAddress() {
				Bus.$emit('openReceiptInfoModal', {
					type: 'add'
				});
			},
			setAddress(address) {
				Bus.$emit('openReceiptInfoModal', {
					type: 'setting',
					address: address
				});
			},
			loadGoodsData() {
				loadGoodsData()
				.then(function (response) {
					let data = response.data;
					this.goodsData = data.goods;
					this.createGoodsPageScroll();
					// console.log(data);
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg)
						}
					}
				}.bind(this))
			},
			loadAddressList() {
				loadAddressList()
				.then(function (response) {
					let data = response.data;
					this.addressList = data.address;
					this.createAddressPageScroll();
					// console.log(data)
					if(this.addressList.length > 0) {
						let flag = false;
						//判断有没有默认地址
						for(let i = 0, j = data.address.length; i < j; i++) {
							if(data.address[i].default === 1) {
								this.receivingAddress = data.address[i];
								flag = true;
								return;
							}
						}
						// 设置第一个地址为默认地址
						if(!flag) {
							this.addressList[0].default = 1;
							this.receivingAddress = this.addressList[0];
						}
					}else {
						this.receivingAddress = {};
					}
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg)
						}
					}
				}.bind(this))
			},
			loadOrderList() {
				loadOrderList()
				.then(function (response) {
					let data = response.data.order;
					this.orderList = data;
					this.createOrderPageScroll();
					// console.log(data)
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg)
						}
					}
				}.bind(this))
			},
			sureReceipt(id) {
				sureReceipt(id)
				.then(function (response) {
					this.loadOrderList();
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
			loadOrderDetail() {
				loadOrderDetail()
				.then(function (response) {
					let data = response.data.order;
					this.orderDetailList = data;
					this.createDetailPageScroll();
					// console.log(response.data)
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg)
						}
					}
				}.bind(this))
			},
			withdrawals() {
				if(this.account === '' || this.accountName === '' || this.fruit === '' || this.remark === '') {
					Bus.$emit('openTipModal', '请先填写完整信息');
					return;
				}
				fruitWithdrawals(this.account, this.accountName, this.payType, this.remark, this.fruit)
				.then(function (respones) {
					let msg = respones.data.msg
					Bus.$emit('openTipModal', msg)
					Bus.$emit('refreshData')
				}.bind(this))
				.catch(function (err) {
					if(err && err.response) {
						if(err.response.status === 422) {
							Bus.$emit('openTipModal', err.response.data.msg)
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="less" type="text/less">
	// flex布局水平垂直居中
	.flex-both-center () {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	// 商城模态框样式
	.shopping-modal {
		.flex-both-center();
		width: 70%;
		height: 83%;

		.title {
			position: absolute;
			text-align: center;
			top: 0.5rem;
			font-size: 1.3rem;
		}

		.tips {
			position: absolute;
			bottom: 0.3rem;
			// right: 0.3rem;
			font-size: 0.7rem;
			margin: 0;

			.strong {
			}
		}

		.modal-content {
			display: flex;
			justify-content: space-between;
			width: 92%;
			height: 85%;

			.tabs-head {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				height: 100%;
				width: 25%;
				font-size: 0.85rem;
				padding-top: 1.8rem;
				box-sizing: border-box;

				.tabs-head-item { 
					margin-bottom: 30%;
					.flex-both-center();
					width: 100%;
					height: 1.5rem;
					border-radius: 1.5rem;
					background-color: rgba(0, 0, 0, 0.4);

					&.head-select {
						color: yellow;
					}
				}
			}

			.tabs-content {
        -webkit-overflow-scrolling: touch;
				position: relative;
				width: 68%;
				height: 97%;
				margin-top: 5%;
        // overflow: hidden;
        overflow-y: scroll;

				.tabs-content-item {
					background-color: rgba(0, 0, 0, 0.4);
					border: 1px solid #000;
					border-left-color: rgba(238, 158, 25, 0.5);
					border-top-color: rgba(200, 210, 10, 0.5);
					border-right-color: rgba(238, 158, 25, 0.5);
					border-bottom-color: rgba(200, 210, 10, 0.5);
					border-radius: 0.5rem;
					// overflow: hidden;
				}

				.goodsPage {
					width: 85%;
					/* height: 98%; */
					padding-right: 0.3rem;
					position: relative;

					.itemContainer {
						display: inline-block;
						width: 50%;
						height: 8.5rem;
						float: left;

						.item {
							width: 70%;
							height: 90%;
							margin: 5% auto 0 auto;

							.imgContainer {
								width: 75%;
								height: 50%;
								margin: 0 auto 5% auto;
								position: relative;

								.img {
									width: 100%;
									height: 100%;
								}

								.stock {
									display: inline-block;
									position: absolute;
									bottom: 0;
									right: 0;
									background-color: rgba(0, 0, 0, 0.4);
									border-radius: 1.5rem;
									font-size: 0.3rem;
								}
							}

							.btn {
								/* width: 75%; */
								height: 1rem;
								line-height: 1rem;
								margin: 0.6rem auto 0 auto;
								-webkit-text-size-adjust: none;
								font-size: 0.6rem;
								text-align: center;
								white-space: nowrap;
								border: 1px solid #000;
								border-left-color: rgba(238, 158, 25, 0.5);
								border-top-color: rgba(200, 210, 10, 0.5);
								border-right-color: rgba(238, 158, 25, 0.5);
								border-bottom-color: rgba(200, 210, 10, 0.5);
								border-radius: 1rem;
							}

							.exchange {
								width: 80%;
								height: 1.1rem;
								line-height: 1.1rem;
								margin: 0.7rem auto 0 auto;
								font-size: 0.8rem;
								text-align: center;
								// background-image: url('~@/assets/an-bg01.png');
                // background-size: 100% 100%;
                background: #3db3e0;
                border-radius: 1rem;
							}
						}
					}
				}

				.orderPage {
					width: 85%;
					/* height: 14.5rem; */
					padding-right: 0.3rem;
					padding-bottom: 0.5rem;
					overflow-y: scroll;

					.item {
						width: 95%;
						min-height: 6rem;
						font-size: 0.65rem;
						overflow: hidden;
						margin-top: 1rem;
						margin-right: 5%;

						.left {
							display: inline-block;
							width: 30%;
							height: 6rem;
							float: left;
							text-align: center;

							.img {
								display: inline-block;
								width: 70%;
								height: auto;

							}
						}

						.right {
							display: inline-block;
							width: 70%;
							min-height: 6rem;
							line-height: 1.2rem;
							float: right;

							.info {
								margin: 0;

								.time {

								}

								.num {
									float: right;
								}
							}

							.info2 {
								margin: 0;

								.phone {
									float: right;
								}
							}

							.address {
								margin: 0;
							}

							.sureReceipt {
								display: inline-block;
								float: right;
								background-color: #3692b6;
								font-size: 0.7rem;
								padding: 0 0.5rem;
								border-radius: 1rem;
							}
						}
					}
				}

				.detailPage {
					width: 90%;
					/* height: 90%; */
					padding-right: 0.3rem;
					padding-bottom: 0.5rem;
					overflow-y: scroll;

					.item {
						min-height: 5rem;
						margin-top: 0.5rem;
						padding-left: 0.5rem;
						overflow: hidden;
						
						.left {
							width: 40%;
							min-height: 5rem;
							float: left;
							.flex-both-center ();

							.headImg {
								width: 60%;
							}
						}

						.right {
							width: 50%;
							line-height: 1.4rem;
							float: left;
							font-size: 0.8rem;
							text-align: center;
							padding-top: 0.5rem;
							margin-left: 0.5rem;
							overflow-x: visible;

							p {
								margin: 0;
								overflow: hidden;
							}

							.time {
								font-size: 0.9rem;
							}

							.info {
								.num {
									float: left;
								}

								.name {
									float: right;
								}
							}

							.info2 {
								.text {
									float: left;
								}

								.price {
									float: right;
								}
							}

							.state {
								display: inline-block;
								margin-top: 0.3rem;
								background-color: #3692b6;
								line-height: 0.9rem;
								font-size: 0.7rem;
								padding: 0.3rem 0.6rem;
								border-radius: 1rem;
							}
						}
					}
				}

				.addressPage {
					position: relative;
					width: 90%;
					height: 16rem;
					padding-right: 0.3rem;

					.list {
						width: 100%;
						/* height: 85%; */
						overflow-y: scroll;

						.item {
							width: 90%;
							min-height: 3.3rem;
							line-height: 1rem;
							margin-left: 5%;
							position: relative;
							background-color: rgba(0, 0, 0, 0.4);
							border-radius: 0.5rem;

							.gouIco {
								position: absolute;
								top: 0rem;
								left: -0.5rem;
								width: 2rem;
								height: 2rem;
							}

							.info {
								font-size: 0.8rem;
								line-height: 0.8rem;
								padding-left: 0.5rem;

								.phone {
									position: absolute;
									bottom: 0.5rem;
									right: 2.5rem;
								}
							}

							.address {
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
								font-size: 0.8rem;
								line-height: 0.8rem;
								padding-left: 0.5rem;
								padding-top: 0.5rem;
							}

							.settingIco {
								position: absolute;
								bottom: 0.2rem;
								right: 0.2rem;
								width: 1.3rem;
								height: 1.3rem;
							}
						}
					}

					.add {
						position: absolute;
						width: 4rem;
						height: 1.5rem;
						line-height: 1.3rem;
						bottom: 0.5rem;
						right: 0.5rem;
						background-image: url('~@/assets/an-bg01.png');
						background-size: 100% 100%;
						text-align: center;
						font-size: 0.8rem;
					}
				}

				.withdrawals {
					position: relative;
					width: 90%;
					height: 16rem;

					text-align: center;
					h2 {
						font-size: 1rem;
					}
					.formGroup {
						.from {
							overflow: hidden;
							margin-top: 0.8rem;
							label {
								display: inline-block;
								width: 25%;
								text-align: right;
								float: left;
								margin-left: 1rem;
								font-size: 0.8rem;
							}
							input {
								width: 55%;
								float: right;
								margin-right: 1rem;
								border-radius: 0.5rem;
								padding-left: 0.8rem;
								height: 1rem;
								font-size: 0.8rem;
							}
							.radios {
								.radio-component {
									display: inline-block;
									font-size: 0.8rem;
									position: relative;
									top: -0.1rem;
								}
							}
							.sure {
								border: none;
								background-color: #bb6523;
								color: #fff;
								border-radius: 1rem;
								padding: 0.2rem 0.8rem;
								margin-top: 0.3rem;
								font-size: 0.8rem;
							}
						}
					}
				}
			}
		}
	}

	#goodsPageWrapper {
    -webkit-overflow-scrolling: touch;
		position: relative;
		height: 15rem;
		padding-bottom: 2rem;
		/* overflow: hidden; */
		overflow-y: scroll;
		.list {
      -webkit-overflow-scrolling: touch;
			overflow: scroll;
		}
	}

	#orderPageWrapper {
		position: relative;
		height: 15rem;
		overflow: hidden;

		.list {
			overflow: scroll;
		}
	}

	#detailPageWrapper {
		position: relative;
		height: 15rem;
		overflow: hidden;

		.list {
			overflow: scroll;
		}
	}

	#addressPageWrapper {
		position: relative;
		height: 13rem;
		overflow: hidden;

		.list {
			overflow: scroll;
		}
	}
</style>