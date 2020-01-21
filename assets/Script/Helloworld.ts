import { initLan } from "./lan/lanMgr";
import LanLabel from "./lan/lanLabel";

const { ccclass, property } = cc._decorator;


@ccclass
export default class Helloworld extends cc.Component {


    start() {
        this.node.getChildByName("label2").getComponent(LanLabel).lanString = [
            { key: "zs", isLan: true },
            { key: "  ", isLan: false },
            { key: "love", isLan: false },
            { key: "  ", isLan: false },
            { key: "ls", isLan: true }
        ];
    }

    setEn() {
        initLan("en");
    }

    setZh() {
        initLan("zh");
    }
}
