import { i18nLabel } from "./i18nLabel";
import { i18nSprite } from "./i18nSprite";

export class i18nMgr {
    private static language = "";     // 当前语言
    private static labelArr: i18nLabel[] = [];        // i18nLabel 列表
    private static labelData: { [key: string]: string } = {};   // 文字配置
    private static spriteArr: i18nSprite[] = [];       // i18nSprite 列表

    /**
     * 设置语言
     */
    public static setLanguage(language: string) {
        if (this.language === language) {
            return;
        }
        this.language = language;
        this.reloadLabel();
        this.reloadSprite();
    }

    /**
     * 添加或移除 i18nLabel
     */
    public static _addOrDelLabel(label: i18nLabel, isAdd: boolean) {
        if (isAdd) {
            this.labelArr.push(label);
        } else {
            let index = this.labelArr.indexOf(label);
            if (index !== -1) {
                this.labelArr.splice(index, 1);
            }
        }
    }

    public static _getLabel(opt: string | { key: string, is: boolean }[]): string {
        if (typeof opt === "string") {
            return this.labelData[opt] || opt;
        }
        let endStr = "";
        for (let one of opt) {
            if (one.is) {
                endStr += this._getLabel(one.key);
            } else {
                endStr += one.key;
            }
        }
        return endStr;
    }


    /**
     * 添加或移除 i18nSprite
     */
    public static _addOrDelSprite(sprite: i18nSprite, isAdd: boolean) {
        if (isAdd) {
            this.spriteArr.push(sprite);
        } else {
            let index = this.spriteArr.indexOf(sprite);
            if (index !== -1) {
                this.spriteArr.splice(index, 1);
            }
        }
    }

    public static _getSprite(path: string, cb: (spriteFrame: cc.SpriteFrame) => void) {
        cc.loader.loadRes("i18n/sprite/" + this.language + "/" + path, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                return cb(null);
            }
            cb(spriteFrame);
        });
    }


    private static reloadLabel() {
        let url = "i18n/label/" + this.language;
        cc.loader.loadRes(url, (err, data) => {
            if (err) {
                console.error(err);
                this.labelData = {};
            } else {
                this.labelData = data.json;
            }
            for (let one of this.labelArr) {
                one._resetValue();
            }
        });
    }

    private static reloadSprite() {
        for (let one of this.spriteArr) {
            one._resetValue();
        }
    }

}

i18nMgr.setLanguage("zh");