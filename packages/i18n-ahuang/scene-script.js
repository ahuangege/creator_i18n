module.exports = {

    'changeLan': function (event, lan) {
        let obj = cc.require("i18nMgr");
        if (obj) {
            obj.i18nMgr.setLanguage(lan);
        }
    }
};