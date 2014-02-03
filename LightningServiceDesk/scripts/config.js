Ext.define('Mob2.Config', {
    singleton : true,
    config : {
        urls : {
            main : 'http://devmy.star1vn.com/MobileSvc/',
            root : 'http://devmy.star1vn.com/'
       }
       //devmy.star1vn.com
       //localhost/Lightning_My
       //lightningstar1.net
    },
    constructor: function(cfg) {        
        this.initConfig(cfg);
        return this;    
    }
});