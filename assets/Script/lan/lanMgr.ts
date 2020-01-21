import LanLabel from "./lanLabel";
import LanSprite from "./lanSprite";

let nowLan = "";
let labels: LanLabel[] = [];
let labelData: { [key: string]: string } = {};
let sprites: LanSprite[] = [];
initLan("zh");


/**
 * 设置语言
 */
export function initLan(lan: string) {
    if (nowLan === lan) {
        return;
    }
    nowLan = lan;
    resetLabel();
    resetSprite();
}

/**
 * 添加label
 */
export function addLabel(label: LanLabel) {
    labels.push(label);
}

/**
 * 移除label
 */
export function removeLabel(label: LanLabel) {
    let index = labels.indexOf(label);
    if (index !== -1) {
        labels.splice(index, 1);
    }
}

// 重新设置label
function resetLabel() {
    let url = "lan/label/" + nowLan;
    cc.loader.loadRes(url, (err, data) => {
        if (err) {
            console.error(err);
            labelData = {};
        } else {
            labelData = data.json;
        }
        for (let one of labels) {
            one.resetValue();
        }
    });
}

/**
 * 获取文字
 */
export function lanLabel(opt: string | { key: string, isLan: boolean }[]): string {
    if (typeof opt === "string") {
        return labelData[opt] || opt;
    }
    let endStr = "";
    for (let one of opt) {
        if (one.isLan) {
            endStr += lanLabel(one.key);
        } else {
            endStr += one.key;
        }
    }
    return endStr;
}

/**
 * 添加sprite
 */
export function addSprite(sprite: LanSprite) {
    sprites.push(sprite);
}

/**
 * 移除sprite
 */
export function removeSprite(sprite: LanSprite) {
    let index = sprites.indexOf(sprite);
    if (index !== -1) {
        sprites.splice(index, 1);
    }
}

// 重新设置sprite
function resetSprite() {
    for (let one of sprites) {
        one.resetValue();
    }
}

/**
 * 获取图片
 */
export function lanSprite(path: string, cb: (spriteFrame: cc.SpriteFrame) => void) {
    cc.loader.loadRes("lan/sprite/" + nowLan + "/" + path, cc.SpriteFrame, (err, spriteFrame) => {
        if (err) {
            return cb(null);
        }
        cb(spriteFrame);
    });
}