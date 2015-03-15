var g;

function Input(init){
    'use strict';
    this.id = init.id;
    this.type = init.type === undefined? 'text':init.type;
    this.placeholder = init.placeholder;
    this.$element = null;

    this.init = function(){
        this.$element = $('<input>').attr({
            'id': this.id,
            'type': this.type,
            'placeholder': this.placeholder
        });
        if(localStorage.getItem(this.id)){
                this.$element.attr('value',localStorage.getItem(this.id));
        }
        $(document).on('change', '#'+this.id,
            function(){
                localStorage.setItem($(this).attr('id'),$(this).val());
            }
        );
    };

    this.get_html = function(){
        return this.$element;
    };

    (function(self){self.init();})(this);
    return this;
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

//page - {title, input/text}
//input - {id, input, type}
function Page(page){
    'use strict';
    this.title = page.title;
    this.input = null;
    this.content = null;
    this.$nav = section_nav();

    if (page.input){
        this.input = new Input(page.input);
    }
    if (page.text){
        this.content = page.text;
    }

    this.get_html = function(){
        var $html = $('<div>').addClass('page');

        var $title = $('<div>').html('<h2>'+this.title+'</h2>');
        $html.append($title);
        if (this.input){
            var $input = this.input.get_html();
            $html.append($input);
        }
        if(this.content){
            var $content = this.content;
            $html.append($content);
        }
        $html.append(this.$nav);

        return $('<div>').append($html.clone()).html();
    };

    return this;
}

function Section(name){
    'use strict';
    this.name = name;
    this.pages = [];
    this.current_page = 0;
    this.$element = null;
    this.$wrapper = $('#section_wrapper');

    this.init_pages = function(pages){
        for (var i=0,l=pages.length; i<l; i++){
            var page = new Page(pages[i]);
            this.pages.push(page);
        }

        return true;
    };

    this.open_page = function(page_num){
        this.$element.html(this.pages[page_num].get_html());
        this.current_page = page_num;
    };
    this.next_page = function(){
        var next = this.current_page+1;
        if(next < this.pages.length){
            this.open_page(next);
            return true;
        }
        return false;
    };
    this.prev_page = function(){
        var prev = this.current_page-1;
        if(prev > -1){
            this.open_page(prev);
            return true;
        }
        return false;
    };

    this.show = function(){
        this.$wrapper.append(this.$element);
        this.open_page(this.current_page );
    };
    this.close = function(){
        this.$element.detach();
    };

    return this;
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
        var temp = this.current_section;
        if (!this.current_section.next_page()){
            return this.next_section()
        }
        return false;
    }
    this.prev = function(){
        if (!this.current_section.prev_page()){
            return this.prev_section()
        }
        return false;
    }

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
            this.current_section.show();
            $("#"+this.current_section.name).addClass('active').siblings().removeClass('active');
            if (temp){
                temp.close();
            }
            return true;
        }
        else{
            return false;
        }
    };
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

    IntroSection.$element = $('<section>').attr('id', 'intro');

    return IntroSection;
}

function init_personal_information(){
    'use strict';
    var pages = [
        {
            'title':'Начнем с простого, ваши <b>ФИО</b>.',
            'input':{
                'id':'full_name',
                'placeholder':'Иванов Иван Иванович'
            }
        },
        {
            'title':'Немного сложнее, ваш <b>e-mail</b>.',
            'input':{
                'id':'e-mail',
                'placeholder':'Ivanov@email.com'
            }
        },
        {
            'title':'Я понимаю, мы только что познакомились, но можешь оставить свой <b>номер телефона</b>?',
            'input':{
                'id':'phone_number',
                'placeholder':'+7 999 333 8877'
            }
        },
        {
            'title':'Не сочти за наглость, но мне нужен твой <b>адрес</b>.',
            'input':{
                'id':'address',
                'placeholder':'г.Пермь, ул. Академика Королёва, 15'
            }
        },
        {
            'title':'У тебя есть <b>портфолио</b>, или <b>linkedin</b>, хоть что-нибудь?',
            'input':{
                'id':'portfolio',
                'placeholder':'www.linkedin.com'
            }
        },
    ];

    var PersonalInformationSection = new Section('personal_information');

    PersonalInformationSection.init_pages(pages);

    PersonalInformationSection.$element = $('<section>').attr('id', 'personal_information');

    return PersonalInformationSection;
}

g = new RenderHandler();

(function(){
    'use strict';
    g.sections = [
        init_intro(),
        init_personal_information()
    ];
    $('.nav__item:not(.active)').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        g.show($(this).data('link'));
    });
    g.show('intro');


})($, g);
