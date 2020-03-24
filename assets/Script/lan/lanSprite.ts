import * as lanMgr from "./lanMgr";
const { ccclass, property, executeInEditMode, menu } = cc._decorator;

@ccclass
@executeInEditMode
@menu("多语言/lanSprite")
export default class LanSprite extends cc.Sprite {
    @property({ serializable: true })
    private _spritePath: string = "";

    start() {
        lanMgr.addSprite(this);
        this.resetValue();
    }

    @property({ type: cc.String })
    get spritePath() {
        return this._spritePath;
    }

    set spritePath(value: string) {
        this._spritePath = value;
        lanMgr.lanSprite(value, (spriteFrame) => {
            if (cc.isValid(this.node)) {
                this.spriteFrame = spriteFrame;
            }
        });
    }

    resetValue() {
        this.spritePath = this._spritePath;
    }

    onDestroy() {
        lanMgr.removeSprite(this);
    }
}
