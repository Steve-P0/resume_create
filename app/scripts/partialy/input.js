function Input(init){
    'use strict';
    this.id = init.id;
    this.type = init.type === undefined? 'text':init.type;
    this.max_length = init.max_length === undefined? '60': init.max_length;
    this.placeholder = init.placeholder;
    this.$element = null;

    this.init = function(){
        this.$element = $('<input>',{
            'id': this.id,
            'type': this.type,
            'maxlength': this.max_length,
            'placeholder': this.placeholder
        });
        if(localStorage.getItem(this.id)){
                this.$element.attr('value',localStorage.getItem(this.id));
        }
        $(document).on('input', '#'+this.id,
            function(){
                localStorage.setItem($(this).attr('id'),$(this).val());
            }
        );
    };

    this.get_html = function(){
        return $('<div>').append(this.$element.clone()).html();
    };
    return this;
}

function Textarea(init){
    'use strict';
    var self = new Input(init);
    self.type = '';
    self.rows = init.rows?init.rows:5;
    self.cols = init.cols?init.cols:60;
    self.max_length = init.max_length === undefined? '1200': init.max_length;


    self.init = function(){
        self.$element = $('<textarea>',{
            'id': self.id,
            'placeholder': self.placeholder,
            'rows': self.rows,
            'cols': self.cols,
            'maxlength': self.max_length
        });
        if(localStorage.getItem(self.id)){
                self.$element.text(localStorage.getItem(self.id));
        }
        $(document).on('input', '#'+self.id,
            function(){
                localStorage.setItem($(this).attr('id'),$(this).val());
            }
        );
    };

    return self;
}
