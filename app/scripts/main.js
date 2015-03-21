var g;


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
    this.$pdf_page = null;
    this.preview_show = function(){
        var $pdf_page = $('<div>',{'id':'pdf_wrapper'});
        $.each(localStorage, function(index, val) {
            $pdf_page.append($('<div>',{'id':index}).text(val));
        });
        $('article').append($pdf_page);
        this.$pdf_page = $pdf_page;
    }
    this.preview_close = function(){
        this.$pdf_page.remove();
    }
    this.preview_toggle = function(){
        if (!$('article').has(this.$pdf_page).length){
            this.preview_show();
        }
        else{
            this.preview_close();
        }
    }
}

function init_intro(){
    'use strict';
    var pages = [
        {
            'title':'',
            'text': '<div class="intro__title"><img width="60" height="60" src="images/paper-black.svg"><h1>get<b>R</b>esume.tk</h1> Создавайте резюме просто и быстро. <br/>Пример можно посмотреть <a id="show_test" href="#test">тут</a>.</div><ul class="intro__about"><li><div class="about__title">Полностью бесплатно и очень просто</div><div class="about__content">Пошаговые инструкции сделают составление резюме легким и непринужденным. Навигация между шагами осуществляется с помощью кнопок вперед и назад. Мы не потребуем платы, никогда;</div></li><li><div class="about__title">Совместимо с браузером Chrome</div><div class="about__content">Удостоверьтесь что вы используете Google Chrome, хотя сервис может работать и в Firefox. Возможно не будет работать на мобильных устройствах, и откажется работать в Internet Explorer;</div></li><li><div class="about__title">Место прокрастинации</div><div class="about__content">Нашли что-то более веселое, чем составление своего резюме? Дерзайте, мы автоматически сохраняем текст который вы вводите, так что можете вернутся позже и продолжить с того места где вы остановились;</div></li><li><div class="about__title">Мы не воры</div><div class="about__content">Все что происходит на сайте, остается на сайте. Информация введенная вами на сайте никуда не посылается и не сохраняется ни на каких серверах, так что никто кроме вас не сможет её увидеть;</div></li><li><div class="about__title">Мы еще не закончили!</div><div class="about__content">Данный сервис находится в разработке, поэтому некоторые компоненты могут изменяться, но главная функция - создание резюме останется неизменной. Я по-прежнему работаю над улучшением сервиса, поэтому если у вас есть предложения, или вы нашли баг, пожалуйста напишите мне об этом на<a href="mailto:PodkinSA@gmail.com">почту</a>.</div></li></ul>'
        }
    ];

    var IntroSection = new Section('intro');

    IntroSection.init_pages(pages);

    // IntroSection.$element = $('<section>').attr('id', 'intro');

    return IntroSection;
}

function init_personal_information(){
    'use strict';
    var pages = [
        {
            'title':'Начнем с простого, ваши <b>ФИО</b>.',
            'inputs':[{
                'id':'full_name',
                'placeholder':'Иванов Иван Иванович'
            }]
        },
        {
            'title':'Немного сложнее, ваш <b>e-mail</b>.',
            'inputs':[{
                            'id':'e-mail',
                            'placeholder':'Ivanov@email.com'
                        }]
        },
        {
            'title':'Я понимаю, мы только что познакомились, но можешь оставить свой <b>номер телефона</b>?',
            'inputs':[{
                            'id':'phone_number',
                            'placeholder':'+7 999 333 8877'
                        }]
        },
        {
            'title':'Не сочти за наглость, но мне нужен твой <b>адрес</b>.',
            'inputs':[{
                            'id':'address',
                            'placeholder':'г.Пермь, ул. Академика Королёва, 15'
                        }]
        },
        {
            'title':'У тебя есть <b>портфолио</b>, или <b>linkedin</b>, хоть что-нибудь?',
            'inputs':[{
                            'id':'portfolio',
                            'placeholder':'www.linkedin.com'
                        }]
        },
    ];

    var PersonalInformationSection = new Section('personal_information');

    PersonalInformationSection.init_pages(pages);

    // PersonalInformationSection.$element = $('<section>').attr('id', 'personal_information');

    return PersonalInformationSection;
}

function init_personal_statement(){
    'use strict';
    var pages = [
        {
            'title':'Хочешь указать какую-либо информацию о себе? Если нет, тебя никто не осудит.',
            'inputs':[{
                'id':'personal_statement_title',
                'placeholder':'Пара слов о себе:'
            },{
                'id':'personal_statement_body',
                'placeholder':'Великодушный, гениальный, неуступчивый...',
                'type': 'textarea'
            }
            ]
        },
    ];

    var PersonalStatementSection = new Section('personal_statement');
    PersonalStatementSection.init_pages(pages);
    // PersonalInformationSection.$element = $('<section>')
    return PersonalStatementSection;
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

    $("#preview").click(function(){
        g.preview_toggle();
    })

})($, g);
