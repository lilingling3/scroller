var listWrapper = document.querySelector('.list-wrapper-hook'),
    listContent = document.querySelector('.list-content-hook'),
    alert = document.querySelector('.alert-hook'),
    topTip = document.querySelector('.refresh-hook'),
    bottomTip = document.querySelector('.loading-hook');

    initScroll()

    function initScroll(){
      var scroll = new window.BScroll(listWrapper,{
        probeType: 1 // 会节流，滑动结束后排放scroll事件
      })
      
      // 滑动中
      scroll.on('scroll',function(position){
        if(position.y > 30){
          topTip.innerText = '释放立即刷新';
        }
      })
      // 滑动后
      scroll.on('touchend',function(position){
        console.log(position.y)
        console.log(position.y < (this.maxScrollY - 30))
        if(position.y > 30){
          // 模拟发送ajax 请求
          setTimeout(function(){
            topTip.innerText = '下拉刷新'
             // 刷新成功后的提示
           refreshAlert('刷新成功');
        // 刷新列表后,重新计算滚动区域高度
          scroll.refresh();
          },1000)
        }else if(position.y < (this.maxScrollY - 30)){
          bottomTip.innerText = '加载中...';
          setTimeout(function(){
            // 恢复文本值
            bottomTip.innerText = '查看更多'
            // 添加数据
            reloadData()
            // 重新计算
            scroll.refresh()
          },1000)
        }
      })
    }

// 加载更多
    function reloadData(){
      var template = '<li class="list-item"><div class="avatar"><img src="img/1.png" width="100" height="100" /></div>'+
          '<div class="text"><h2>只会放肆,不会说谎,好青春也是谁不想要一个深情却刺激</h2><span>2016-11-23</span></div></li>'
          // 向ul容器中添加内容
    listContent.innerHTML = listContent.innerHTML + template;
    }

    function refreshAlert(text){
      text = text || '操作成功'
      alert.innerText = text;
      alert.style.display = 'block';
      setTimeout(function(){
        alert.style.display = 'none';
      },1000);
    }