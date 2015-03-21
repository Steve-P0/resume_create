//page - {title, input/text}
//inputs - {id, input, type}
function Page(page){
    'use strict';
    this.title = page.title;
    this.inputs = [];
    this.content = null;
    this.$nav = section_nav();

    if (page.inputs){
        for( var i =0, l = page.inputs.length; i<l; i++ ){
            if(page.inputs[i].type === 'textarea'){
                this.inputs.push(new Textarea(page.inputs[i]));
                continue;
            }
            this.inputs.push(new Input(page.inputs[i]));
        }
    }
    if (page.text){
        this.content = page.text;
    }

    this.get_html = function(){
        var $html = $('<div>').addClass('page');

        var $title = $('<div>').html('<h2>'+this.title+'</h2>');
        $html.append($title);
        if (this.inputs){
            $.each(this.inputs, function(index, val) {
                val.init();
                $html.append(val.get_html());
            });
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
