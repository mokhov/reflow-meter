$(function(){
    var r = new reflowMeter({
        /*'blockReflowLimit' : 3*/
    });
    r.analyze($('body'));
    
    //ReflowMeter.init($('body'));
});

var reflowMeter = function(settings)
{
    var queue = new Array();
    
    // Настройки reflow-meter
    var BLOCK_REFLOW_LIMIT = settings.blockReflowLimit || 3; 
 
 
    return {
        'analyze': 
            function(b){
                queue.push($(b).get(0));
    
                while (queue.length > 0)
                {
                    var el = queue.pop();
                    
                    if (el.tagName.toLowerCase() == "br")
                        continue;
                    
                    var time = this.blockReflow(el);
                    //indicator.get(0).innerHTML += time + " ";
                    
                    $(el).attr('reflow-meter:res', time);
                    
                    if (time > BLOCK_REFLOW_LIMIT && $(el).find('>*').size() > 0)
                    {
                        $(el).find('>*').each(function(){
                            queue.push($(this).get(0));
                        });
                    }
                    else{
                        this.blockReflowResult(el, time)   
                    }
                }
            },
        /**
         * Измерить reflow блока
         */
        'blockReflow' :
            function(b){
                var $block = $(b);           
                
                $block.hide();
            
                var tmp1 = b.offsetWidth + b.offsetHeight;
                var start = new Date().getTime();
                
                
                $block.show();
            
                
                var tmp2 = b.offsetWidth + b.offsetHeight;
                var time = new Date().getTime() - start;
            
                return time;    
            },
            
        /**
         * Вывести результат в блок
         */
        'blockReflowResult' : 
            function(b, time){
                var $block = $(b);
                
                 var result = $('<div />').css({
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
                    $block.find('>*').first().before(result);
                }
                else
                {
                    $block.append(result);
                }
            } 
    };
}