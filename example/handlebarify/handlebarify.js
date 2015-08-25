import {Builder, template, method} from 'es6/lib/ceb.js';
import handlebars from 'handlebars';

export class HandlebarsBuilder extends Builder {

    constructor(tpl) {
        super();
        this.data = {tpl};
    }

    build(proto, on) {
        var tpl = handlebars.compile(this.data.tpl);
        template(tpl).build(proto, on);
        method('render').invoke(el => {
            template.applyTemplate(el, tpl(el));
        }).build(proto, on);
    }

}

export function handlebarify(tpl) {
    return new HandlebarsBuilder(tpl);
}
