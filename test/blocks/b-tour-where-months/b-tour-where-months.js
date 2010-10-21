;$(function(){
    // Инициализация основных переменных
    var arr_from = $('.b-tour-where-months__arrow_from');
    var arr_to = $('.b-tour-where-months__arrow_to');

    var months = $('.b-tour-where-months__month');

    var months_arr = [];
    months.each(function(){
        months_arr.push($(this));
    });

    var items_middle = {};


    for (var i in months_arr) {
        var this_left = parseInt(months_arr[i].offset().left);
        //items_from_to[this_left] = i;

        var this_right = parseInt(this_left + months_arr[i].realWidth());

        items_middle[parseInt((this_right + this_left) / 2)] = i;
    };


    // От и до какой выделены
    var selected_list = $('.b-tour-where-months__month_selected');

    var from_item, to_item;

    function initSelectMonths()
    {
        if (arr_from.offset().left <= arr_to.offset().left)
        {
            selectMonths(arr_from, arr_to);
        }
        else
        {
            selectMonths(arr_to, arr_from);
        }
    }

    function selectMonths(arr_from, arr_to)
    {
        var arr_from_left = arr_from.offset().left;
        var arr_to_left = arr_to.offset().left;

        var i;
        for (i in items_middle)
        {
            if (i > arr_from_left)
                break;
        }
        from_item = items_middle[i];

        var ii = 0;
        for (i in items_middle)
        {
            if (i < arr_to_left)
                ii = i;
            else
                break;
        }
        to_item = items_middle[ii];



        months.removeClass('b-tour-where-months__month_selected');
        for (i = from_item; i <= to_item; i++)
        {
             months_arr[i].addClass('b-tour-where-months__month_selected');
        }

        updateFromTo();
    }

    function updateFromTo()
    {
        selected_list = $('.b-tour-where-months__month_selected');

        from_item = months.index(selected_list.first());
        to_item = months.index(selected_list.last());
    }


    function initArrowsSet(animated)
    {
        if (arr_from.offset().left <= arr_to.offset().left)
        {
            arrowsSet(arr_from, arr_to, animated);
        }
        else
        {
            arrowsSet(arr_to, arr_from,animated);
        }
    }
    
    /**
     * Спозионировать стрелочки указывающие начало диапазона
     * @param arr_from - указатель начала диапазона
     * @param arr_to - указатель конца диапазаона
     */
    function arrowsSet(arr_from, arr_to, animated)
    {
        if (from_item == -1 && to_item == -1)
        {
            if (arr_from.hasClass('dragged'))
            {
                arr_from.animate({
                    left: arr_to.offset().left + "px"
                });
            }
            else if (arr_to.hasClass('dragged'))
            {
                arr_to.animate({
                    left: arr_from.offset().left + "px"
                });
            }
            else
            {
                arr_from.css({
                    'left': (months_arr[0].offset().left - '10') + 'px',
                    'top': months_arr[0].offset().top + 'px'
                }, 50);
                arr_to.css({
                    'left': (months_arr[0].offset().left - '10') + 'px',
                    'top': months_arr[0].offset().top + 'px'
                }, 50);
            }
        }

        else {
            /*console.log(from_item + "::::" + to_item);*/
            if (animated)
            {
                arr_from.animate({
                    'left': (months_arr[from_item].offset().left - '10') + 'px'
                }, 50);

                arr_to.animate({
                    'left': (months_arr[to_item].offset().left + months_arr[to_item].realWidth() - '8') + 'px'
                }, 50);
            }
            else
            {
                arr_from.css({
                    'left': (months_arr[from_item].offset().left - '10') + 'px',
                    'top': months_arr[from_item].offset().top + 'px'
                });

                arr_to.css({
                    'left': (months_arr[to_item].offset().left + months_arr[to_item].realWidth() - '8') + 'px',
                    'top': months_arr[to_item].offset().top + 'px'
                });
            }
        }
    }



    var container = $('.b-tour-where-months__wrapper-with-arrows');
    var container_left = container.offset().left;
    var container_right = container_left + container.realWidth();

    arr_from.css('margin-left', "-" + container_left + "px");
    arr_to.css('margin-left', "-" + container_left + "px");
    arr_from.css('margin-top', "-" + container.offset().top + "px");
    arr_to.css('margin-top', "-" + container.offset().top + "px");

    var months_mover

    // Функции для драгания
    arr_to.draggable({
        axis: 'x',
        containment: 'parent',
        drag: function(){
            initSelectMonths();
        },
        stop: function(){
            arr_to.addClass('dragged');
            initArrowsSet(true);
            arr_to.removeClass('dragged');
        }
    });

    arr_from.draggable({
        axis: 'x',
        containment: 'parent',
        drag: function(){
            initSelectMonths();
        },
        stop: function(){
            arr_from.addClass('dragged');
            initArrowsSet(true);
            arr_from.removeClass('dragged');
        }
    });


    updateFromTo();
    initArrowsSet(false);


    // Контролы

    // Считаем сколько всего занимают месяцы
    var months_width = 0;
    for (var i in months_arr)
    {
        months_width += months_arr[i].realWidth();
    }

    
});

/**
 * Получить реальную ширину элемента вместе с padding'ами и border'ами
 */
$.fn.realWidth = function(){
    return parseInt(this.width()) +
            (parseInt(this.css('padding-left')) || 0) +
            (parseInt(this.css('padding-right')) || 0) +
            (parseInt(this.css('border-left')) || 0) +
            (parseInt(this.css('border-right')) || 0)
}