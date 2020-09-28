import Vue from 'vue';
import { formatDate, dateAdd } from 'lib/dateformat.js';
import NP from 'number-precision'
Vue.directive('numberInt', {
	bind: function (el, binding, vnode) {
		const element = el.getElementsByTagName('input')[0]
		const len = binding.arg  // 初始化设置 
		element.value = Number(element.value).toFixed(len)  // 失焦时候格式化
		element.addEventListener('keyup', function () {
			vnode.data.model.callback(element.value.replace(/[^\d\.]/g, ''))
		});
		element.addEventListener('blur', function () {
			let val = element.value && element.value.replace(/[^\d\.]/g, '');
			val = val && NP.round(val, len);
			vnode.data.model.callback(val)
		})
	}
})
Vue.directive('amount', {
	bind: function (el, binding, vnode) {
		const element = el.getElementsByTagName('input')[0]
		const len = binding.arg  // 初始化设置 
		element.value = Number(element.value).toFixed(len)  // 失焦时候格式化
		element.addEventListener('keyup', function () {
			let val = element.value.replace(/[^-\d\.]/g, '');
			if ((/\d-+/.test(val) && /^-+/.test(val)) || /^-+/.test(val) && !/\d-+/.test(val)) {
				val = '-' + val.replace(/[-]/g, '');
			} else if (!/^-+/.test(val) && /\d-+/.test(val)) {
				val = val.replace(/[-]/g, '');
			}
			val = val.replace(/^\.+/g, '');
			// val = val && NP.round(val, 2);
			vnode.data.model.callback(val)
		});
		element.addEventListener('blur', function () {
			let val = element.value.replace(/[^-\d\.]/g, '');
			if ((/\d-+/.test(val) && /^-+/.test(val)) || /^-+/.test(val) && !/\d-+/.test(val)) {
				val = '-' + val.replace(/[-]/g, '');
			} else if (!/^-+/.test(val) && /\d-+/.test(val)) {
				val = val.replace(/[-]/g, '');
			}
			if (/[\d]/.test(val)) {
				val = val && NP.round(val, 2);
			} else {
				val = 0;
			}
			vnode.data.model.callback(val)
		})
	}
})


Vue.filter('date', function (value, format = 'YYYY-MM-DD') {
	return formatDate(value, format);
})
Vue.filter('money', function (value) {
	let amount = value && value.toString() || '';
	if (amount) {
		let rex = /\d{1,3}(?=(\d{3})+$)/g
		amount = amount.replace(/^(-?)(\d+)((\.\d+)?)$/, function (s, s1, s2, s3) {
			return s1 + s2.replace(rex, '$&,') + s3
		});
	}
	return amount || 0;
})
