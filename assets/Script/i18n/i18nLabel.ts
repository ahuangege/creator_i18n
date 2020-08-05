import { i18nMgr } from "./i18nMgr";
const { ccclass, property, executeInEditMode, disallowMultiple, requireComponent, menu } = cc._decorator;

@ccclass
@executeInEditMode
@requireComponent(cc.Label)
@disallowMultiple
@menu("多语言/i18nLabel")
export class i18nLabel extends cc.Component {

    @property({ visible: false })
    private i18n_string: string | { key: string, is: boolean }[] = "";

    onLoad() {
        i18nMgr._addOrDelLabel(this, true);
        this._resetValue();
    }

    @property({ type: cc.String })
    get string() {
        return this.i18n_string;
    }

    set string(value: string | { key: string, is: boolean }[]) {
        this.i18n_string = value;

        let label = this.getComponent(cc.Label);
        if (cc.isValid(label)) {
            label.string = i18nMgr._getLabel(value);
        }
    }

    _resetValue() {
        this.string = this.i18n_string;
    }

    onDestroy() {
        i18nMgr._addOrDelLabel(this, false);
    }
}

