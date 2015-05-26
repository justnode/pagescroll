##基于jQuey的单页滚动插件

###简介
此插件最大的特点就是会检测浏览器是否支持3d加速，如果支持就采用3d加速来实现页面的切换，如果不支持那么就向下降级，采用jQuery的animate函数来实现动画。

###demo延时
[单页动画效果](http://itkaoyan.cn/zui/demo/onepagescroll/test/index.html)

###API
 - duration:页面切换动画的执行时间
 - direction：页面是垂直切换还是水平切换
 - showpages：是否显示右侧的圆点按钮

###示例：
```js
$(selector).onepagescroll({
	duration : 600,
	showpages : true
})
```