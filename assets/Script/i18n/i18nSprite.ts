import { i18nMgr } from "./i18nMgr";
const { ccclass, property, executeInEditMode, disallowMultiple, requireComponent, menu } = cc._decorator;

@ccclass
@executeInEditMode
@requireComponent(cc.Sprite)
@disallowMultiple
@menu("多语言/i18nSprite")
export class i18nSprite extends cc.Component {

    @property({ visible: false })
    private i18n_string: string = "";

    start() {
        i18nMgr._addOrDelSprite(this, true);
        this._resetValue();
    }

    @property({ type: cc.String })
    get string() {
        return this.i18n_string;
    }

    set string(value: string) {
        this.i18n_string = value;

        let sprite = this.getComponent(cc.Sprite);
        if (cc.isValid(sprite)) {
            i18nMgr._getSprite(value, (spriteFrame) => {
                if (cc.isValid(sprite)) {
                    sprite.spriteFrame = spriteFrame;
                }
            });
        }
    }

    _resetValue() {
        this.string = this.i18n_string;
    }

    onDestroy() {
        i18nMgr._addOrDelSprite(this, false);
    }
}
