/*
 * File: app/controller/ctlTimesheet.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Mob2.controller.ctlTimesheet', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            lstDay: '#tsDayList #lstContainer #lstTSDay',
            lstTitle: '#tsDayList #lstTitle',
            tsDayDetails: '#tsDayDetails',
            navMain: '#navMain',
            dayID: '#tsDayList #dayID',
            tsDayList: '#tsDayList',
            startDate: '#tsDayList #startDate',
            dayDetails: '#tsDayDetails',
            timeStart: '#tsDayDetails #txtTimeStart',
            timeEnd: '#tsDayDetails #txtTimeEnd',
            lastTime: '#tsDayDetails #hidLastTime',
            lblDate: '#tsDayDetails #lblDate ',
            picker: '#timePicker',
            tsToolBar: '#tsDayList #tsToolBar',
            leaveType: {
                selector: '#tsDayDetails #ddlLeave',
                xtype: 'Ext.field.Select'
            }
        },

        control: {
            "textfield#txtTimeStart": {
                tap: 'onTimeStartTap'
            },
            "textfield#txtTimeEnd": {
                tap: 'onTimeEndTap'
            },
            "button#cmdBlockAdd": {
                tap: 'onCmdBlockAddTap'
            },
            "button#cmdTimeSave": {
                tap: 'oncmdTimeSaveTap'
            },
            "list#lstTSDay": {
                itemsingletap: 'onLstTSDayItemSingletap'
            },
            "button#cmdBlockCommit": {
                tap: 'onCmdBlockCommitTap'
            },
            "button#cmdBlockSave": {
                tap: 'onCmdBlockSaveTap'
            },
            "container#tsDayList": {
                swipe: 'onTsDayListSwipe'
            }
        }
    },

    onTimeStartTap: function(textfield) {
        var me = this;
        Mob2.pickerControl = me.getTimeStart();
        me.openPicker(Mob2.pickerControl.getValue(),'Time Start');


    },

    onTimeEndTap: function(textfield) {
        var me = this;
        Mob2.pickerControl = me.getTimeEnd();
        me.openPicker(Mob2.pickerControl.getValue(),'Time End');

    },

    onCmdBlockAddTap: function(button, e, eOpts) {
        var me = this;
        if(me.getDayDetails()){me.getDayDetails().destroy();}
        Ext.create('Mob2.view.tsDayDetails');
        var store = Ext.getStore('TSBlockLocal');
        var lastTime = '';
        var col = 0;
        store.each(function(rec){
            if(col < rec.get('col')){
                lastTime = rec.get('timeOut');
            }
        });
        me.getLastTime().setValue(lastTime);
        me.getNavMain().push(me.getDayDetails());
        me.getNavMain().getNavigationBar().setTitle('Add');
    },

    oncmdTimeSaveTap: function(button, e, eOpts) {
        //check startTime with previu
        var me = this;
        var timeCheck = Mob2.app.getApplication().getController('Details').isTimeValid;
        var previousTime = me.getLastTime().getValue();
        var result = ''
        if(previousTime !== '' ){
            result = timeCheck(previousTime,me.getTimeStart().getValue(),false);
            if(result !== ''){
                result='  a previous time block finished at: ' + previousTime + '<br>and you are starting at: ' + me.getTimeStart().getValue() +'<br> cannot save';
            } 
        }
        if(result === ''){
            result = timeCheck(me.getTimeStart().getValue(),me.getTimeEnd().getValue(),false);
        }
        if(result === ''){
            //check past midnight
            result = me.midnightCheck(me.getTimeStart().getValue(),me.getTimeEnd().getValue());
        }
        if(result ===''){
            var store = Ext.getStore('TSBlockLocal') ;  
            var row = 0;
            store.each(function(rec){
                if(row < parseInt(rec.get('row'),10)){row = parseInt(rec.get('row'),10);}
            })
            if(row===0){row=1;}else{row+=1;}
            var duration = me.duration(me.getTimeStart().getValue(),me.getTimeEnd().getValue());
            if(me.getNavMain().getNavigationBar().getTitle() === 'Add'){
                store.add({'col':me.getDayID().getValue(),
                    'row':row,
                    'timeIn':me.getTimeStart().getValue(),
                    'timeOut':me.getTimeEnd().getValue(),
                    'type': me.getLeaveType().getValue(),
                    'difference':duration,
                    'difPeriod':me.timeToPeriod(duration),
                'mode':1});
            }else{
                var record = store.findRecord('row',me.getDayDetails().down('#hidRow').getValue());
                var mode = 1;
                if(record.get('mode') !== 1){mode = 2;}
                record.set({'timeIn':me.getTimeStart().getValue(),
                    'timeOut':me.getTimeEnd().getValue(),
                    'type': me.getLeaveType().getValue(),
                    'difference':duration,
                    'difPeriod':me.timeToPeriod(duration),
                    'mode':mode
                });
            }
            store.sync();    
            me.getNavMain().pop();    
        }else{
            Ext.Msg.alert('Lightning','validation error:<br>' + result);
        }
    },

    onLstTSDayItemSingletap: function(dataview, index, target, record, e, eOpts) {
        var me = this;
        var bWarn = false;
        var lastRow = 0;
        if(record && !me.isCommitted()){
            if(!me.sdTime(record)){
                Ext.Msg.confirm('Lightning','changing this row will delete all rows after<br>do you want to continue?',function(btn){
                    if(btn === 'yes'){
                        var store = Ext.getStore('TSBlockLocal');
                        store.each(function(rec){
                            if(record.get('row') < rec.get('row') && record.get('mode') !== 0 ){
                                store.remove(rec);
                            }else if(record.get('row') < rec.get('row') && record.get('mode') === 0 ){
                                rec.set('mode',3);
                            }
                        });
                        store.sync();
                        if(me.getDayDetails()){me.getDayDetails().destroy();}
                        Ext.create('Mob2.view.tsDayDetails');
                        var lastTime = '';            
                        var rec = store.findRecord('row',record.get('row') - 1);
                        if(!rec){
                            lastTime = '';
                        }else{
                            lastTime = rec.get('timeOut'); 
                        }
                        me.getLastTime().setValue(lastTime);
                        me.getTimeStart().setValue(record.get('timeIn'));
                        me.getTimeEnd().setValue(record.get('timeOut'));
                        me.getLeaveType().setValue(record.get('type'));
                        me.getNavMain().push(me.getDayDetails());
                        me.getDayDetails().down('#hidRow').setValue(record.get('row'));
                        me.getNavMain().getNavigationBar().setTitle('Edit'); 
                    }
                });
            }
        }else if(me.isCommitted()){
            Ext.Msg.alert('Lightning','this timesheet has been committed<br>and is read-only');
        }
    },

    onCmdBlockCommitTap: function(button, e, eOpts) {
        var me = this;
        Ext.Msg.confirm('Lightning','are you sure you want to commit this timesheet?',function(btn){
            if(btn === 'yes'){
                var store = Ext.getStore('TSWeekLocal');
                var rec = store.first();
                var now = new Date();
                rec.set({'commitDate':now.toUTCString(),'mode':2});
                store.sync();
                var dayID = me.getDayID().getValue();
                me.saveTime(dayID);
                me.setTSDay(dayID);
            }
        });
    },

    onCmdBlockSaveTap: function(button, e, eOpts) {
        var me = this;
        me.saveTime(me.getDayID());
    },

    onTsDayListSwipe: function(container, direction) {
        var me = this;
        var day = parseInt(me.getDayID().getValue(),10);
        if(direction === 'right'){
            day -= 1;
            if(day<0){day=6;}
        }else{
            day += 1;
            if(day>6){day=0;}
        }
        me.setTSDay(day);

    },

    sdTime: function(record) {
        //check that this item is not SD Time
        //check that time after this item is not sd time
        //returns true if SDTime & cannot edit
        var msg = '';
        if(record.get('isSD')){
            msg = 'this time has been inserted by Service Desk\ncannot edit';
        }
        if(msg ===''){
            var store = Ext.getStore('TSBlockLocal');
            store.each(function(rec){
                if(rec.get('row') > record.get('row')){
                    if( rec.get('isSD')){
                        msg = 'there are times after this one that have been inserted by Service Desk\ncannot edit';
                        return false;
                    }
                }
            });
        }
        if(msg === ''){
            return false;
        }else{
            Ext.Msg.alert('Lightning',msg);
            return true;
        }

    },

    startApp: function() {
        var me = this;
        if(Mob2.isOnline){
            if(Mob2.userID){
                //get leave type async
                var strTSType = Ext.getStore('TSType');
                var proxyTsType = strTSType.getProxy();
                proxyTsType.setUrl(Mob2.apiURL + 'tsType?id=' + Mob2.userID );
                strTSType.load(function(records, operation, success) {
                    strTypeLocal = Ext.getStore('TSTypeLocal');
                    strTypeLocal.removeAll();
                    strTSType.each(function(item){
                        strTypeLocal.add(item);                
                    });
                });   
                var strBlockLocal = null;
                var now = new Date().toUTCString();
                var url = Mob2.apiURL + 'tsWeek?id=' + Mob2.userID + '&selectedDate=' + encodeURIComponent(now);
                var strWeek = Ext.getStore('TSWeek');
                strWeek.removeAll();
                var proxyWeek = strWeek.getProxy();
                var weekID = null;
                proxyWeek.setUrl(url);
                strWeek.setProxy(proxyWeek);
                strWeek.load(function(records, operation, success) {
                    //load to local
                    if(success){
                        var strWeekLocal = Ext.getStore('TSWeekLocal');
                        strWeekLocal.clearFilter();
                        strWeekLocal.getProxy().clear();  
                        strWeekLocal.data.clear();
                        strWeekLocal.sync();
                        strWeek.each(function(item){
                            strWeekLocal.add(item);
                            weekID = item.get('weekID');
                        });
                        strWeekLocal.sync();
                        var strTSBlock = Ext.getStore('TSBlock');
                        var proxyTsBlock = strTSBlock.getProxy();
                        if(weekID){
                            proxyTsBlock.setUrl(Mob2.apiURL + 'tsBlock?id=' + weekID );
                            strTSBlock.load(function(records, operation, success) {
                                if(success){
                                    var strBlockLocal = Ext.getStore('TSBlockLocal');
                                    strBlockLocal.clearFilter();
                                    strBlockLocal.getProxy().clear();  
                                    strBlockLocal.data.clear();
                                    strBlockLocal.sync();
                                    strTSBlock.each(function(item){
                                        strBlockLocal.add(item);
                                        weekID = item.get('weekID');
                                    });
                                    strBlockLocal.sync(); 
                                    //set filter
                                    var day = new Date().getDay() -1;            
                                    if(!me.getTsDayList()){Ext.create('Mob2.view.tsDayList');}  
                                    me.getLstDay().setStore(strBlockLocal);
                                    me.getLstDay().refresh();
                                    var rec = Ext.getStore('TSWeekLocal').first();
                                    me.getStartDate().setValue(rec.get('startDate'));
                                    me.getNavMain().push(me.getTsDayList());
                                    if (day < 0){day = 6;}
                                    me.setTSDay(day);            
                                    Ext.Viewport.setMasked(false); 
                                    me.getNavMain().getNavigationBar().setTitle('Time Summary');
                                }else{
                                    Mob2.app.getApplication().getController('ctlCommon').internetError(); 
                                }
                            }); 
                        }else{
                            Ext.Msg.alert('lightning',' please refresh');
                        }
                    }else{
                        Mob2.app.getApplication().getController('ctlCommon').internetError();  
                    }
                });
            }else{
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Lightning','you will need to login again');
                if(!me.getFrmLogin()){Ext.create('Mob2.view.formLogin');}
                Ext.Viewport.removeAll();
                Ext.Viewport.add(me.getFrmLogin());
            }
        }else{
            Mob2.app.getApplication().getController('ctlCommon').internetError();
        }
    },

    setTSDay: function(day) {
        var me = this;
        var startDate = new Date(me.getStartDate().getValue());
        var recWeek = Ext.getStore('TSWeekLocal').first();
        startDate.setDate(startDate.getDate() + day);
        var store = Ext.getStore('TSBlockLocal');
        store.clearFilter();            
        store.filterBy(function(rec){
            return rec.get('mode') !== 3 && parseInt(rec.get('col'),10) === parseInt(day,10);
        });
        if(me.isCommitted()){
            var toolBar = me.getTsDayList().down('#tsToolBar')
            if(!toolBar.getTitle() || toolBar.getTitle() === ''){        
                toolBar.down('#cmdBlockAdd').hide();
                toolBar.down('#cmdBlockCommit').hide();
                toolBar.down('#cmdBlockSave').hide();
                toolBar.setTitle('Time Committed');
            }
        }
        me.getLstTitle().setHtml('<div style="text-align:center;"><span style="font-size:large;">' + startDate.toDateString() + '</span></div>');
        me.getDayID().setValue(day);
    },

    openPicker: function(dateVal, title) {
        var me = this;
        if (!me.getPicker()){
            Ext.create('Mob2.view.timePicker', {
                useTitles : true
            });
            var slots = me.getPicker().query('pickerslot');
            var data =[];
            var textVal;
            //set hours
            var x = 0;
            for(x=1;x<=12;x++){
                textVal = (x < 10) ? ('0' + x) : x;
                data.push({text:textVal,value:x});
            }
            slots[0].getStore().setData(data);
            //set minutes
            var timeInt = parseInt(me.getApplication().getController('ctlCommon').getSysValue('TimeInterval'),10);    
            if(timeInt === 'NaN'){timeInt=1};
            data = [];
            for(x=0;x<60;x+=timeInt){
                textVal = (x < 10) ? ('0' + x) : x;
                data.push({text:textVal,value:x});
            }
            //console.log('minute slot length: ' + data.length); //60 items
            slots[1].getStore().setData(data);  

        } 

        me.getPicker().child('#pickerBar').setTitle(title);
        me.getPicker().setValue(me.convertTime(dateVal),true);
        Ext.Viewport.add(me.getPicker());
        me.getPicker().show();
    },

    convertTime: function(arg) {
        //arg must be in format of hh:mm am
        var me = this;
        if(arg === '00:00 AM'){arg = '';}
        var t = new Date();
        var retVal = {};

        if ( arg===''){
            if (t.getHours() >= 12){
                retVal.ampm = 1;
                retVal.hours =t.getHours() - 12;        
            }else{
                retVal.ampm = 0;
                retVal.hours = t.getHours();
            }
            if(retVal.hours === 0) retVal.hours = 12;
            retVal.minutes = t.getMinutes();
            retVal.minutes = me.getMinute(retVal.minutes);
            if(retVal.minutes === 60){
                retVal.minutes = 0;
                if ( retVal.hours === 12 ){
                    //12pm
                    retVal.hours = 1;           
                } else{
                    retVal.hours = retVal.hours+1;
                }        
            }
            return retVal;
        }else{
            return  me.timeToObject(arg);
        }
    },

    getMinute: function(val) {
        var me = this;
        var timeInt = parseInt(me.getApplication().getController('ctlCommon').getSysValue('TimeInterval'),10);    
        if(timeInt === 'NaN'){timeInt=1};
        if (timeInt === 1){
            return val;
        }
        var arr = [];
        var counter = 0;
        while(counter < 60){
            arr.push(counter);
            counter += timeInt;
        }
        var x = 0;
        var retVal = 0;
        for(;x<arr.length;x++){
            if(arr[x] > val){
                retVal = arr[x]
            break;}     
        }
        if(x == 0){
            if(val >arr[0] + timeInt/2 ){
                val = arr[1];
            }
        }else if(retVal === 0 && x === arr.length){
            retVal = 60;
        }else{
            if (val < (arr[x-1] + timeInt/2 )){
                retVal = arr[x-1];
            }else if(val > arr[x]){
                retVal = 60;
            }
        }
        return retVal

    },

    timeToObject: function(arg) {
        //arg must be of format 'hh:mm am' -returns array{hours:minutes:ampm}
        var resVar = {};
        arg = arg.trim();
        resVar.hours=  parseInt(arg.substr(0,2),10);
        resVar.minutes=  parseInt(arg.substr(arg.indexOf(':',0)+1,2),10);
        var tmp = arg.substr(arg.indexOf(' ',0)+1,2);
        if(tmp=='am'){
            resVar.ampm = 0;
        }else{
            resVar.ampm = 1;
        }
        return resVar;
    },

    refreshDayList: function(store) {
        store.filterBy(function(rec){
            rec.get('mode') !== 3 && rec.get('col') === me.getDayID().getValue();
        }); 
        me.getLstDay().setStore(strDay);
        me.getLstDay().refresh();
    },

    duration: function(timeStart, timeEnd) {
        //gets variable off page of 
        var me = this;
        var resVarIn,resVarOut = {};
        var resResult = 0;
        var tmp = 0;
        var hrs, mins = 0;
        resVarIn = me.timeToObject(timeStart);
        resVarOut = me.timeToObject(timeEnd);
        if(resVarIn.ampm === 1 && resVarIn.hours !== 12){ resVarIn.hours += 12;}
        if(resVarOut.ampm === 1  && resVarOut.hours !== 12){ resVarOut.hours += 12;}
        resResult = (resVarOut.hours *60 + resVarOut.minutes) - (resVarIn.hours *60 + resVarIn.minutes);
        hrs = parseInt(resResult/60,10);
        mins = resResult - (hrs*60);
        if (hrs<10){hrs = '0' + hrs;}
        if (mins<10){mins = '0' + mins;}
        return hrs + ':' + mins; 

    },

    timeToPeriod: function(arg) {
        //arg is hh:mm
        var hr = parseInt(arg.substring(0,2),10);
        var min = parseInt(arg.substring(3,5),10);

        return hr*60 + min;
    },

    saveTime: function(col) {
        var me = this;
        var cols = [];
        var data = [];
        var bFound = false;
        var week = {};
        var strWeek = Ext.getStore('TSWeekLocal');
        var strDay = Ext.getStore('TSBlockLocal');
        Ext.Viewport.setMasked(true);
        if(Mob2.isOnline){
            //load week
            var recWeek = strWeek.first();
            week.weekID = recWeek.get('weekID');
            week.mode =  recWeek.get('mode');
            week.commitDate =  recWeek.get('commitDate');
            week.mobUri = Mob2.userID;
            //get adjusted cols
            //me.getLstDay().setStore(null);
            me.getLstDay().hide();
            strDay.clearFilter();
            var stmp = '';
            strDay.each(function(rec){
                if(rec.get('mode') !== 0){  
                    if(cols.length === 0 ){
                        cols.push(rec.get('col'));
                    }else{
                        bFound = false;
                        for(x=0;x<cols.length;x++){
                            if(cols[x] == rec.get('col')){bFound = true;}  
                        }
                        if(!bFound){cols.push(rec.get('col'));}
                    }
                }            
            });
            if (cols.length !== 0){
                var record = null;
                for(x=0;x < cols.length;x++){
                    strDay.clearFilter();
                    strDay.filter('col',cols[x]);
                    strDay.setSorters('row');
                    strDay.each(function(rec){
                        data.push({'row':rec.get('row'),
                            'col':rec.get('col'),
                            'timeIn':rec.get('timeIn'),
                            'timeOut':rec.get('timeOut'),
                            'type':rec.get('type'),
                            'mode':rec.get('mode')
                        });
                    });

                }        
            }else{
                data.push({'row':0,
                    'col':0,
                    'timeIn':0,
                    'timeOut':0,
                    'type':0,
                    'mode':0
                });
            }
            week.data = data;
            strDay.setSorters([]);
            if(cols.length !==0 || (week.commitDate !=='' || !week.commitDate)){
                debugger;
                console.log('data sent: ' + JSON.stringify(week));
                Ext.Ajax.request({
                    url: Mob2.apiURL + 'timeSave',
                    disableCaching: false,
                    jsonData: JSON.stringify(week), 
                    method:'POST',
                    success: function(result){
                        debugger;
                        if(result.statusText === 'OK'){ 
                            console.log('dataIn: ' +result.responseText);
                            var vals = Ext.JSON.decode(result.responseText,true);
                            if(vals && vals.status === 'success'){
                                var rec = strWeek.first();
                                rec.set({'weekId': vals.data.weekID,
                                    'commitDate':vals.data.commitDate,
                                    'mode':0
                                });
                                var recBlock = null;
                                strDay.removeAll();
                                strDay.sync();
                                Ext.Array.each(vals.data.data,function(rec){  
                                    if(rec){
                                        recBlock =  Ext.create('Mob2.model.TSBlock');
                                        recBlock.set({'row':rec.row,
                                            'col':rec.col,
                                            'timeIn':rec.timeIn,
                                            'timeOut':rec.timeOut,
                                            'difference':rec.difference,
                                            'type': rec.type,         
                                            'mode':0,
                                            'isSD':rec.isSD

                                        });
                                        strDay.add(recBlock);
                                    }
                                });
                                strDay.sync();
                                strWeek.sync();  
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('Lightning','all time data saved');
                            }else{
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('Lightning','error saving data<br>please contact supervisor');
                            }                    
                        }else{
                            Ext.Viewport.setMasked(false);
                            Ext.Msg.alert('Lightning','error saving data<br>please contact supervisor');
                        }
                    },
                    failure: function(response, opts){ 
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('Lightning','an error occurred: ' +  response.status + '<br>' +  response.responseText);
                    }
                });	
                me.getLstDay().show();
            }else{
                strDay.filterBy(function(rec){
                    rec.get('mode') !== 3 && parseInt(rec.get('col'),10) === parseInt(me.getDayID().getValue(),10);
                }); 
                Ext.Viewport.setMasked(false)
                me.getLstDay().show();
                Ext.Msg.alert('Lightning','all time data saved');

            }
        }else{
            Mob2.app.getApplication().getController('ctlCommon').internetError();
        }

    },

    midnightCheck: function(timeStart, timeEnd) {
        var me = this;
        var result = ''
        var start = new Array(parseInt(timeStart.substring(0,2),10),parseInt(timeStart.substring(3,5),10),timeStart.substring(6,8));
        var end = new Array(parseInt(timeEnd.substring(0,2),10),parseInt(timeEnd.substring(3,5),10),timeEnd.substring(6,8));
        if(start[0] ===12 && start[2] === 'am' && start[1] !== 0){
            result = 'invalid start time<br> cannot go past midnight';
        }else if(end[0] ===12 && end[2] === 'am' && end[1] !== 0){
            result = 'invalid end time<br> cannot go past midnight';
        }
        return result;
    },

    updateDayList: function(store) {
        var me = this;
        store.clearFilter();
        store.filterBy(function(rec){
            rec.get('mode') !== 3 && parseInt(rec.get('col'),10) === parseInt(me.getDayID().getValue(),10);
        }); 
        //me.getLstDay().setStore(store);
        me.getLstDay().refresh();
        me.setTSDay(me.getDayID().getValue());
    },

    isCommitted: function() {
        var me = this;
        var store = Ext.getStore('TSWeekLocal');
        var result = false;
        if(store.getCount() !==0){
            var rec = store.first();
            if(!rec.get('commitDate') || rec.get('commitDate') ==='' ){
                result = false;
            }else{
                result = true;
            }
        }
        return result;


    }

});