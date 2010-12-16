$(function(){
   //alert('reflow-meter script init');

/*if((window.location.href.split('?')[1] || '').indexOf('rm') > -1) {*/
    $(window).load(function(){
        var r = new reflowMeter({
            'blockReflowLimit' : 70
        });
	
		$('body').append($('<a></a>').css({
			'position':'fixed', 
			'top': '0', 
			'left': '0', 
			'z-index': '9999', 
			'width': '100px',
			'height': '20px',
			'background': 'red',
			'color': 'white'
			}).click(function(){
					r.analyze($('html'));
			}));
	
	$('.b-toolbar');
	//alert('reflow-meter finished');
    });
/*}*/
    
});

var reflowMeter = function(settings)
{
    var queue = new Array();
	var log = "";
				
	var stylesLink = $('link[rel="stylesheet"]');
    
    // Настройки reflow-meter
    var BLOCK_REFLOW_LIMIT = settings.blockReflowLimit || 3;
	var BLOCK_REFLOW_ATTEMPTS = settings.blockReflowAttempts || 10;
 
 
    return {
		/**
		 * Инициализация reflowMeter
		 */
		'init':
			function(){
				
			},
        'analyze': 
            function(b){
				$(b).each(function(){
					queue.push($(this).get(0));	
				});
                
    
                while (queue.length > 0)
                {
                    var el = queue.pop();
                    
                    if (el.tagName.toLowerCase() == "br")
                        continue;
					
                    var time = this.blockReflow(el);
					
					// Дальше меряем чистый reflow
					//$(this.stylesLink).attr('rel', 'alternate');
					//var timeClear = this.blockReflow(el);
					//$(this.stylesLink).attr('rel', 'stylesheet');
					
					
                    //indicator.get(0).innerHTML += time + " ";
                    
                    $(el).attr('reflow-meter:res', time);
                    //$(el).attr('reflow-meter:res-clear', timeClear);
					
					this.log += el.tagName + ":::" + $(el).attr('class') + ":::" + time + "<br />";
                    
                    if (time > BLOCK_REFLOW_LIMIT && $(el).find('>*').size() > 0)
                    {
                        $(el).find('>*').each(function(){
                            queue.push($(this).get(0));
                        });
                    }
                    else{
                       // this.blockReflowResult(el, time);
                    }
                }
				
				$('body').append($('<div></div>').css({
					'position':'absolute', 
					'top': '0', 
					'left': '0', 
					'z-index': '9998',
					'background': 'blue',
					'color': 'white',
					'top': '20px'
					}).html(this.log));
				
            },
        /**
         * Измерить reflow блока
         */
        'blockReflow' :
            function(b){
                var $block = $(b);           
                var blockCSSDisplay = $block.css('display');
				
				var result = 0;
				
				for (var i = 0; i < BLOCK_REFLOW_ATTEMPTS; i++) {
					$block.hide();
					
					var tmp1 = b.offsetWidth + b.offsetHeight;
					var start = new Date().getTime();
					
					$block.css('display', blockCSSDisplay);
					
					var tmp2 = b.offsetWidth + b.offsetHeight;
					result += new Date().getTime() - start;
				}
            
                return result / BLOCK_REFLOW_ATTEMPTS;    
            },
            
        /**
         * Вывести результат в блок
         */
        'blockReflowResult' : 
            function(b, time){
                var $block = $(b);
                
                 var result = $('<div></div>').css({
                    'position': 'absolute',
                    'height': $block.height() + "px",
                    'width': $block.width() + "px",
                    'min-height': "20px",
                    'min-width': "100px",
                    'background': 'rgba(0, 0, 0, 0.5)',
                    'color': '#fff',
                    'z-index': '9999'
                }).addClass('res');
                result.html(time);
                
                
                if ($block.find('>*').size() > 0)
                {
                    $block.find('>*').eq(0).before(result);
                }
                else
                {
                    $block.append(result);
                }
            } 
    }
}
