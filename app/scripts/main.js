(function(){
    $(".nav__item:not(.active)").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $($(this).attr('href')).show().siblings().hide();
    })
    $('.nav__item[href="#intro"]').click();

})($);

function PersonalInformationSection(){
    var pages = [
        {
            "title":"Начнем с простого, ваши <b>ФИО</b>.",
            "input":{
                "id":"full_name",
                "placeholder":"Иванов Иван Иванович"
            }
        },
        {
            "title":"Немного сложнее, ваш <b>e-mail</b>.",
            "input":{
                "id":"e-mail",
                "placeholder":"Ivanov@email.com"
            }
        },
        {
            "title":"Я понимаю, мы только что познакомились, но можешь оставить свой <b>номер телефона</b>?",
            "input":{
                "id":"phone_number",
                "placeholder":"+7 999 333 8877"
            }
        },
        {
            "title":"Не сочти за наглость, но мне нужен твой <b>адрес</b>.",
            "input":{
                "id":"address",
                "placeholder":"г.Пермь, ул. Академика Королёва, 15"
            }
        },
        {
            "title":"У тебя есть <b>портфолио</b>, или <b>linkedin</b>, или что-нибудь?",
            "input":{
                "id":"portfolio",
                "placeholder":"www.linkedin.com"
            }
        },
    ]

    self = new Section("pers_information");

    self.init_pages(pages)

    return self;
}
