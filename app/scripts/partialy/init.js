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


