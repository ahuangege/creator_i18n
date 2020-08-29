let fs = require('fs');

Editor.Panel.extend({
    config: {

    },

    style: `
        :host { margin: 5px; }
        .top {
            text-align:center
        }
        .list {
            text-align:center
        }
    `,

    template: `
        <div class="top">
            <ui-input placeholder="..." id="lan_input"></ui-input>   
            <ui-button id="btn_add">添加</ui-button>  
            <ui-button id="btn_del">删除</ui-button>
        </div>

        <hr>

        <div class="list">
            <ui-select class="huge" value="0" id="select">
            </ui-select>
        </div>

    `,

    $: {
        btn_add: '#btn_add',
        btn_del: '#btn_del',
        lan_input: '#lan_input',
        select: "#select",
    },

    ready() {
        this.$btn_add.addEventListener('confirm', this.btn_add.bind(this));
        this.$btn_del.addEventListener('confirm', this.btn_del.bind(this));
        this.$select.addEventListener('confirm', this.on_select.bind(this));

        let buf = fs.readFileSync(Editor.url("packages://i18n-ahuang/panel/config.json", 'utf8'));
        let config = JSON.parse(buf.toString());
        this.config = config;

        for (let i = 0; i < config.arr.length; i++) {
            this.$select.addItem(i, config.arr[i]);
        }
        this.$select.value = config.arr.indexOf(config.now);
    },

    btn_add() {
        let str = this.$lan_input.value.trim();
        if (!str) {
            return;
        }
        if (this.config.arr.indexOf(str) !== -1) {
            return;
        }
        this.config.arr.push(str);
        this.$select.addItem((this.config.arr.length - 1).toString(), str);
        if (this.config.arr.length === 1) {
            this.config.now = str;
            Editor.Scene.callSceneScript('i18n-ahuang', 'changeLan', str);
        }
        this.save();
    },



    btn_del() {
        let str = this.$lan_input.value.trim();
        if (!str) {
            return;
        }
        let config = this.config;
        let index = config.arr.indexOf(str);
        if (index === -1) {
            return;
        }
        Editor.UI.clear(this.$select);

        setTimeout(() => {
            config.arr.splice(index, 1);
            if (str === config.now && config.arr.length > 0) {
                config.now = config.arr[0];
                Editor.Scene.callSceneScript('i18n-ahuang', 'changeLan', config.now);
            }

            for (let i = 0; i < config.arr.length; i++) {
                this.$select.addItem(i.toString(), config.arr[i]);
            }
            this.$select.value = config.arr.indexOf(config.now);
            this.save();
        }, 50);

    },

    on_select() {
        this.config.now = this.config.arr[Number(this.$select.value)];
        this.save();
        Editor.Scene.callSceneScript('i18n-ahuang', 'changeLan', this.config.now);
    },

    save() {
        fs.writeFileSync(Editor.url("packages://i18n-ahuang/panel/config.json", 'utf8'), JSON.stringify(this.config));
    }

});