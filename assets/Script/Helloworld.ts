import { i18nMgr } from "./i18n/i18nMgr";
import { i18nLabel } from "./i18n/i18nLabel";

const { ccclass, property } = cc._decorator;

enum E_language {
    "zh" = 1,
    "en" = 2,
}

@ccclass
export class Helloworld extends cc.Component {
    @property({ visible: false })
    private nowLanguage: E_language = E_language.zh;

    @property({ type: cc.Enum(E_language), displayName: "语言" })
    get language() {
        return this.nowLanguage;
    }
    set language(value: E_language) {
        this.nowLanguage = value;

        i18nMgr.setLanguage(E_language[value]);
    }

    start() {
        this.node.getChildByName("label2").getComponent(i18nLabel).string = [
            { key: "zs", is: true },
            { key: " love ", is: true },
            { key: "ls", is: true },
            { key: "   不变 ", is: false },

        ];
    }

    setEn() {
        i18nMgr.setLanguage("en");
    }

    setZh() {
        i18nMgr.setLanguage("zh");
    }
}
