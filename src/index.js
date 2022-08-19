import Monitor, { sendPv } from "next-mini-monitor";
import $ from "jquery";
import "./index.css";

Monitor({
	path: "http://182.61.146.211:7001/logstore/track",
	onError: true,
	onPaint: true,
	onPV: true,
	onXHR: true,
	onTiming: true,
});

/*
 * api请求
 */
var xhr = new XMLHttpRequest();
xhr.open("get", "http://182.61.146.211:7001/");
xhr.send(null);
console.log(xhr.responseText);

$(function () {
	let y, y1;
	let flag = true;
	let clone;
	$("#lb").sortable({
		disabled: true,
		item: ".sortable",
		axis: "y",

		delay: 0,
		zIndex: 2020,
		revert: 200,
		grid: [0, 24],
		revert: true, //如果设置成true，则被拖拽的元素在返回新位置时，会有一个动画效果。

		distance: 24,
		helper: "clone",
		tolerance: "pointer",
		forcePlaceholderSize: true,
		forceHelperSize: false,

		cursor: "text",
		start: function (event, ui) {
			clone = $(ui.item[0].outerHTML).clone();
			$(ui.helper).addClass("xz");
			$(ui.item).addClass("xz");
			$("body").mousemove(function (e) {
				e = e || window.event;

				y = e.pageY || e.clientY + document.body.scrollTop;
				if (flag) {
					y1 = y;
					flag = false;
				}
				console.log(y);
				return;
			});
		},
		sort: function (event, ui) {
			let n = $(ui.placeholder).index();
			let lb = $("#lb .sortable");
			if (y > y1) {
				if (n == 19) {
					//lb.eq(20).css({"transform":"translate3d(0,-10px,0)","transtion-duration":"300ms"})
				} else {
					//lb.eq(n).css({"transform":"translate3d(0,-10px,0)","transtion-duration":"300ms"})
				}
			} else {
				if (n == 2) {
					//lb.eq(1).css({"transform":"translate3d(0,10px,0)","transtion-duration":"300ms"})
				} else {
					//lb.eq(n).css({"transform":"translate3d(0,10px,0)","transtion-duration":"300ms"})
				}
			}

			console.log(n);
		},
		placeholder: {
			element: function (clone, ui) {
				return $('<div class="item lieon"  >' + clone[0].innerHTML + "</div>");
			},
			update: function () {
				return;
			},
		},
		stop: function (event, ui) {
			$(ui.item).removeClass("xz");
			$("#lb .sortable").css({
				transform: "translate3d(0,0px,0)",
				"transtion-duration": "300ms",
			});
		},
	});
	$("#lb").disableSelection();
});
