var g;

var inputs_aliases={
    'full_name':'ФИО',
    'e-mail':'электронная почта',
    'phone_number':'номер телефона',
    'address':'адрес',
    'portfolio':'портфолио',
    'personal_statement_title':'О себе',
    'personal_statement_body':'',
}

function section_nav(){
    'use strict';
    var $nav = $('<div>').addClass('page__nav');
    var $prev = $('<div>').addClass('prev').html('назад')
        .attr({
            onclick: 'g.prev()',
            onselectstart: 'return false;'
        });
    var $next = $('<div>').addClass('next').html('вперед')
        .attr({
            onclick: 'g.next()',
            onselectstart: 'return false;'
        });
    $nav.append($prev, $next);
    return $nav;
}

function RenderHandler(){
    'use strict';
    this.current_section_num = null;
    this.current_section = null;
    this.sections = null;

    this.next_section = function(){
        return (this.show(this.current_section_num+1));
    };

    this.prev_section = function(){
        return (this.show(this.current_section_num-1));
    };

    this.next = function(){
        // var temp = this.current_section;
        if (!this.current_section.next_page()){
            return this.next_section();
        }
        return false;
    };
    this.prev = function(){
        if (!this.current_section.prev_page()){
            return this.prev_section();
        }
        return false;
    };

    this.set_section_by_name = function(section_name){
        for (var i =0;i<this.sections.length; i++){
            if (this.sections[i].name === section_name){
                this.current_section =  this.sections[i];
                this.current_section_num = i;
                return true;
            }
        }
    };

    this.set_section_by_num = function(section_num){
        for (var i =0;i<this.sections.length; i++){
            if (i === section_num){
                this.current_section =  this.sections[i];
                this.current_section_num = i;
                return true;
            }
        }
    };

    this.show = function(section){
        var temp = this.current_section;

        if(this.set_section_by_name(section) || this.set_section_by_num(section)){
            if (this.current_section === temp){
                return false;
            }
            this.current_section.show();
            $('#'+this.current_section.name).addClass('active').siblings().removeClass('active');
            if (temp){
                temp.close();
            }
            return true;
        }
        else{
            return false;
        }
    };
    this.$pdf = null;
    this.preview_show = function(){
        var $pdf = $('<div>',{'id':'pdf'}).append(
            $('<div>',{'id':'close'}).click(function(){g.preview_toggle()})
        );
        var $pdf_page = $('<div>',{'id':'pdf_page','class':'pdf__page'});
        $.each(inputs_aliases, function(index, val) {
            var $item = $('<div>',{'id':index,'class':'page__item'});
                if (val != ''){
                    $item.append($('<h3>',{'class':'title'}).text(val))
                }
                $item.append($('<span>',{'class':'content'}).text(localStorage[index]));
            $pdf_page.append($item);
        });
        $pdf.append($pdf_page);
        $('article').append($pdf);
        $pdf.siblings().hide();
        this.$pdf = $pdf;
    }
    this.preview_close = function(){
        this.$pdf.siblings().show();
        this.$pdf.remove();
    }
    this.preview_toggle = function(){
        if ($('.main').has(this.$pdf).length == 0){
            this.preview_show();
            $('#preview').addClass('active').children().toggle();
        }
        else{
            this.preview_close();
            $('#preview').removeClass('active').children().toggle();
        }
    }

    this.print = function(){

        $('body').append($('<div>',{'id':'print_page'}).append($('#pdf_page').clone()));
        window.print();
        $('#print_page').remove();
    }
}

g = new RenderHandler();

(function(){
    'use strict';
    g.sections = [
        init_intro(),
        init_personal_information(),
        init_personal_statement()
    ];
    $('.nav__item').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        g.show($(this).attr('id'));
    }).on('selectstart', function() {
        event.preventDefault();
    });
    g.show('intro');
    $('#preview div').on('selectstart', function() {
        event.preventDefault();
    });
    $('#preview .show').click(function(){
        g.preview_toggle();
    });
    $('#preview .back').click(function(){
        g.preview_toggle();
    });
    $('#preview .print').click(function(){
        g.print();
    });

})($, g);
