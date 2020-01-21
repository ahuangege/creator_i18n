import * as lanMgr from "./lanMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LanLabel extends cc.Label {
    @property({ serializable: true })
    private _lanString: string | { key: string, isLan: boolean }[] = "";

    start() {
        lanMgr.addLabel(this);
        this.resetValue();
    }

    @property({ type: cc.String })
    get lanString() {
        return this._lanString;
    }

    set lanString(value: string | { key: string, isLan: boolean }[]) {
        this._lanString = value;
        this.string = lanMgr.lanLabel(value);
    }

    resetValue() {
        this.lanString = this._lanString;
    }

    onDestroy() {
        lanMgr.removeLabel(this);
    }
}

