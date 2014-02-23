/*
 * File: app/controller/ctlCommon.js
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

Ext.define('Mob2.controller.ctlCommon', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            navMain: {
                selector: '#navMain',
                xtype: 'Ext.navigation.View'
            },
            frmCarousel: '#frmCarousel',
            frmDetails: '#frmDetails',
            frmActivity: '#frmActivity',
            frmInventory: '#frmCarousel #frmInventory',
            frmAttachments: '#frmAttachments',
            frmContractors: '#frmContractors',
            frmSignOff: {
                selector: '#frmSignOff',
                xtype: '#frmCarousel #frmSignOff'
            },
            frmLogin: '#formLogin',
            picker: '#timePicker',
            cmdTimesheets: '#navMain #conSwitchBoard #cmdTimesheets',
            frmAppointments: '#AppointmentContainer',
            cmdAppointments: '#navMain #conSwitchBoard #cmdAppointments'
        },

        control: {
            "button#tpCmdDone": {
                tap: 'onTpCmdDoneTap'
            },
            "button#tpCmdCancel": {
                tap: 'onTpCmdCancelTap'
            }
        }
    },

    onTpCmdDoneTap: function(button, e, eOpts) {
        var me = this;
        Mob2.pickerControl.setValue(me.objectToTime(me.getPicker().getValues()));

    },

    onTpCmdCancelTap: function(button, e, eOpts) {

    },

    checkNavMain: function() {
        var me = this;
        if(!me.getNavMain()){  
            Ext.create('Mob2.view.navMain', {fullscreen: true}); 
        }
        if( !me.IsSysValue('IsSDUser')){
            me.getCmdAppointments().hide();
        }else{
            me.getCmdAppointments().show();
        }
        if( !me.IsSysValue('IsTSUser')){
            me.getCmdTimesheets().hide();
        }else{
            me.getCmdTimesheets().show();
        }

    },

    objectToTime: function(arg) {
        //arg = array{hours:minutes:ampm} - returns 00:00 am/pm
        var ampm;
        if(arg.ampm === 0){
            ampm = 'am';
        }else{
            ampm='pm';
        }
        return this.timeCheck(arg.hours) + ':' + this.timeCheck(arg.minutes) + ' ' + ampm;
    },

    timeCheck: function(arg) {
        //returns 2 digit time
        if (parseInt(arg,10) <10){
            return '0' + arg;
        }else{
            return arg;
        }
    },

    startApp: function() {
        var me = this;
        if(Mob2.userID){
            if(Mob2.isOnline){
                //load system store
                var store = Ext.getStore('System');
                var proxy = store.getProxy();
                proxy.setUrl( Mob2.apiURL +'system?id=' + Mob2.userID);
                store.setProxy(proxy);
                store.load(function(records, operation, success) {
                    //load to local
                    var strLocal = Ext.getStore('SystemLocal');
                    strLocal.getProxy().clear();  
                    strLocal.data.clear();
                    strLocal.sync();
                    store.each(function(item){
                        strLocal.add(item);
                    });
                    strLocal.sync();
                    me.checkNavMain();
                    if ( me.IsSysValue('IsSDUser') && !me.IsSysValue('IsTSUser')){
                        //go straight to appointments
                        me.loadAppointments();
                    }else{                
                        //go to switchboard...ts, appointments, settings
                        Ext.Viewport.add(me.getNavMain());
                        Ext.Viewport.setActiveItem(me.getNavMain());
                        Ext.Viewport.setMasked(false);
                    } 

                });
            }else{
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Lightning','you will need to login');
                if (me.getFrmLogin()){me.getFrmLogin().destroy();}
                Ext.create('Mob2.view.formLogin');
                Ext.Viewport.removeAll();
                Ext.Viewport.add(me.getFrmLogin());
            }
        }else{
            Ext.Msg.alert('Lightning','your device appers to be offline<br/>please try again later');
        }

    },

    IsSysValue: function(field) {
        var store = Ext.getStore('SystemLocal');
        var result = false;
        if(store.getCount() !== 0){
            result =  store.first().get(field);
        }

        return result;
    },

    getSysValue: function(val) {
        var store = Ext.getStore('System');
        var result = null;
        store.each(function (item, index, length) {
            result =  item.get(val);
        });
        return result;
    },

    copyStore: function(str) {
        var records = [];
        str.each(function(r){
            records.push(r.copy());
        });
        var store2 = new Ext.data.Store({
            recordType: store.recordType
        });
        store2.add(records);
        return store2;
    },

    loadStore: function(url, storeID) {

        var store = Ext.getStore(storeID);
        var proxy = store.getProxy();
        proxy.setUrl(url);
        store.setProxy(proxy);
        store.load(function(records, operation, success){
            var strLocal = Ext.getStore(storeID + 'Local');
            console.log('storeID' + storeID);
            strLocal.getProxy().clear();  
            strLocal.data.clear();
            store.each(function(item){
                strLocal.add(item);
            });
            strLocal.sync();
        });

    },

    loadNavMain: function() {
        var me = this;
        Ext.Viewport.setMasked(false);                
        Ext.Viewport.setActiveItem(me.navMain);
        Mob2.navParent = 'navMain'
    },

    loadAppointments: function() {
        console.log('loading Appointments');
        var me = this;
        if(Mob2.isOnline){ 
            //check that data has been saved
            var dirtyCount = Ext.getStore('DirtyLocal').getCount()
            if(dirtyCount === 0){   
                var check;
                var now = new Date().toUTCString();
                console.log('appointment selected date: ' + now);
                var url = Mob2.apiURL + 'appointments?id=' + Mob2.userID + '&selectedDate=' + encodeURIComponent(now);
                //get appointments
                var appointments = Ext.getStore('Appointments');
                var proxy = appointments.getProxy();
                proxy.setUrl(url);
                appointments.setProxy(proxy);
                appointments.load(function(records, operation, success) {
                    if(success){
                        var aptList = '';
                        if( appointments.getCount !== 0){
                            var aptLocal = Ext.getStore('AppointmentsLocal');
                            aptLocal.clearFilter();            
                            aptLocal.getProxy().clear();  
                            aptLocal.data.clear();
                            aptLocal.sync();
                            appointments.each(function(record){
                                aptList += record.get('id') + ',';
                                aptLocal.add(record);
                            });
                            aptLocal.filter('activityStatus',1);
                            //if( me.IsSysValue('SD_IsInventorySynched')){ 
                            me.loadStore(Mob2.apiURL + 'inventory?id=' +  Mob2.userID ,'InventoryMain');
                            //}
                            aptLocal.sync();
                            //remove all dirty records
                            Ext.getStore('DirtyLocal').removeAll();       
                            //get contractor details
                            var con = Ext.getStore('Contractors');
                            var conproxy = con.getProxy();
                            conproxy.setUrl(Mob2.apiURL + 'contractor?id=' +  Mob2.userID +  '&aptList=' +  aptList);
                            con.load(function(records, operation, success){
                                if(success){
                                    var conLocal = Ext.getStore('ContractorsLocal');
                                    conLocal.clearFilter();
                                    conLocal.getProxy().clear();  
                                    conLocal.data.clear();
                                    conLocal.sync();
                                    con.each(function(item){
                                        conLocal.add(item);
                                    });
                                    conLocal.sync();
                                    //get attachment details
                                    var attach = Ext.getStore('Attachments');
                                    var attachproxy = attach.getProxy();
                                    attachproxy.setUrl(Mob2.apiURL + 'attachmentlist?id=' +  Mob2.userID + '&aptlist=' +  aptList );
                                    attach.load(function(records, operation, success){
                                        if(success){
                                            var attachLocal = Ext.getStore('AttachmentsLocal');
                                            attachLocal.clearFilter();
                                            attachLocal.getProxy().clear();  
                                            attachLocal.data.clear();
                                            attachLocal.sync();
                                            attach.each(function(item){
                                                attachLocal.add(item);
                                            });
                                            attachLocal.sync();
                                            //get inventory User details
                                            var invUser = Ext.getStore('InventoryUser');
                                            var invUserProxy = invUser.getProxy();
                                            invUserProxy.setUrl(Mob2.apiURL + 'inventoryuser?id=' + Mob2.userID + '&aptList=' +  aptList );
                                            invUser.load(function(records, operation, success){
                                                if(success){
                                                    var invUserLocal = Ext.getStore('InventoryUserLocal');
                                                    invUserLocal.clearFilter();
                                                    invUserLocal.getProxy().clear();  
                                                    invUserLocal.data.clear();
                                                    invUserLocal.sync();
                                                    invUser.each(function(item){
                                                        invUserLocal.add(item);
                                                    });
                                                    invUserLocal.sync();
                                                    //check for risk
                                                    if(me.IsSysValue('SD_RARRequired') ){
                                                        Mob2.toolDirty = false;
                                                        //get raMain
                                                        var storeRA = Ext.getStore('RAMain');
                                                        var storeRAProxy = storeRA.getProxy();
                                                        storeRAProxy.setUrl(Mob2.apiURL + 'ramain?id=' +  Mob2.userID );
                                                        storeRA.load(function(records, operation, success){
                                                            if(success){
                                                                if(storeRA.getCount() !== 0){
                                                                    storeRALocal = Ext.getStore('RAMainLocal');
                                                                    storeRALocal.clearFilter();
                                                                    storeRALocal.getProxy().clear();  
                                                                    storeRALocal.data.clear();
                                                                    storeRALocal.sync(); 
                                                                    storeRA.each(function(item){
                                                                        storeRALocal.add(item);
                                                                    });
                                                                    storeRALocal.sync();
                                                                }                                                 
                                                                //get RiskMain details
                                                                var riskMain = Ext.getStore('RiskMain');                        
                                                                var riskMainProxy = riskMain.getProxy();
                                                                riskMainProxy.setUrl(Mob2.apiURL + 'riskMain?id=' +  Mob2.userID );
                                                                riskMain.load(function(records, operation, success){
                                                                    if(success){
                                                                        var riskMainLocal = Ext.getStore('RiskMainLocal');
                                                                        riskMainLocal.clearFilter();
                                                                        riskMainLocal.getProxy().clear();  
                                                                        riskMainLocal.data.clear();
                                                                        riskMainLocal.sync(); 
                                                                        riskMain.each(function(item){
                                                                            riskMainLocal.add(item);
                                                                        });
                                                                        riskMainLocal.sync();
                                                                        //get RiskTask details
                                                                        var riskTask = Ext.getStore('RiskTasks');
                                                                        riskTask.clearFilter();
                                                                        var riskTaskProxy = riskTask.getProxy();
                                                                        riskTaskProxy.setUrl(Mob2.apiURL + 'riskTasks?id=' +  Mob2.userID + '&aptlist=' +  aptList);
                                                                        riskTask.load(function(records, operation, success){
                                                                            if(success){
                                                                                var riskTaskLocal = Ext.getStore('RiskTasksLocal');
                                                                                riskTaskLocal.clearFilter();
                                                                                riskTaskLocal.getProxy().clear();  
                                                                                riskTaskLocal.data.clear();
                                                                                riskTaskLocal.sync(); 
                                                                                riskTask.each(function(item){
                                                                                    riskTaskLocal.add(item);
                                                                                });
                                                                                riskTaskLocal.sync();  
                                                                                //get raTools if there is a main
                                                                                if(Ext.getStore('RAMain').getCount() !== 0){
                                                                                    var toolStore = Ext.getStore('RATool');
                                                                                    var toolStoreProxy = toolStore.getProxy();
                                                                                    toolStoreProxy.setUrl(Mob2.apiURL + 'ratools?id=' +  Mob2.userID + '&aptlist=' +aptList);
                                                                                    toolStore.load(function(records, operation, success){
                                                                                        if(success){
                                                                                            if(toolStore.getCount() !== 0){
                                                                                                toolStoreLocal = Ext.getStore('RAToolLocal');
                                                                                                toolStoreLocal.clearFilter();
                                                                                                toolStoreLocal.getProxy().clear();  
                                                                                                toolStoreLocal.data.clear();
                                                                                                toolStoreLocal.sync(); 
                                                                                                toolStore.each(function(item){
                                                                                                    toolStoreLocal.add(item);
                                                                                                });
                                                                                                toolStoreLocal.sync();
                                                                                            }
                                                                                        }else{              
                                                                                            me.internetError();
                                                                                        }//eo toolstore.load success
                                                                                    })//eo toolstore load
                                                                                }//eo Ext.getStore('RAMain') 
                                                                            }else{              
                                                                                me.internetError();//riskTask.load !success
                                                                            }
                                                                        });//  riskTask.load
                                                                    }else{              
                                                                        me.internetError();
                                                                    }
                                                                }); // riskMain.load
                                                            }else{              
                                                                me.internetError();//riskMain.loa !success
                                                            }
                                                        });//eo  storeRA.load
                                                    }// eo SD_RARRequired'
                                                    me.openAppointments();//no risk so open appointments
                                                }else{              
                                                    me.internetError();//invUser.load !success
                                                }                      
                                            });//eo invUser.load
                                        }else{              
                                            me.internetError();
                                        } 
                                    });//attach.load
                                }else{              
                                    me.internetError();
                                } 
                            });//eo Conload 
                        }
                    }else{              
                        me.internetError();//Conload !success
                    } 
                });
            }else{        
                Ext.Msg.alert('Lightning','unsaved data please try again<br>cannot load new data');
                me.openAppointments();
            }
        }else{//not online
            me.internetError();
            me.openAppointments();
        }


    },

    destroyView: function(viewID) {
        if(Ext.getCmp(viewID)){            
            Ext.getCmp(viewID).destroy();
        }
    },

    saveDirty: function() {
        if(Ext.device.Connection.isOnLine()){
            var isDirty = Mob2.Config.getIsDirty();
            if (isDirty.all){
                var store;
                if (isDirty.appointment){
                    store = Ext.getStore('AppointmentsLocal');
                    store.clearFilter;
                    store.each(function(rec){
                        if (rec.get('mode') !== 0){
                            me.postData('activity',rec);
                        }
                    });
                }else if (isDirty.Risk){
                    store = Ext.getStore('RiskTasksLocal');
                    store.clearFilter;
                    store.each(function(rec){
                        if (rec.get('mode') !== 0){
                            me.postData('risktasks',rec);
                        }
                    });        
                }else if (isDirty.Contractor){
                    store = Ext.getStore('ContractorsLocal');
                    store.clearFilter;
                    store.each(function(rec){
                        if (rec.get('mode') !== 0){
                            me.postData('contractors',rec);
                        }
                    });      
                }
            }else{
                console.log('not dirty'); 
            }
        }else{
            Ext.Msg.alert('Lightning','Device is offline..please sync when in range');
        }
    },

    postData: function(URL, data) {

        Ext.Ajax.request({
            url: Mob2.apiURL + URL,
            jsonData: JSON.stringify(data),
            method:'POST',
            async:false    
        });
    },

    loadDetail: function() {
        console.log('loading details');
        var me = this;
        var record = Mob2.app.getApplication().getController('Details').getAppointmentRecord(Mob2.appointmentID);
        var bNew;
        Mob2.loading = true;
        if(me.getFrmCarousel()){me.getFrmCarousel().destroy();}
        Mob2.loading = false;
        Ext.create('Mob2.view.frmCarousel');
        var carousel  = me.getFrmCarousel();
        //filter inventory
        var userInventory = Ext.getStore('InventoryUserLocal');
        userInventory.clearFilter();
        userInventory.filterBy(function(rec){
            return rec.get('mode') !== 3 && rec.get('appointmentID') === Mob2.appointmentID;
        });
        //set inventory on form
        Mob2.app.getApplication().getController('Details').writeInventory();
        //set Contractor
        var lstCon = me.getFrmContractors().down('#lstContractors');
        var lstConLabel= me.getFrmContractors().down('#lstContLabel');
        //set contractor filter
        var conStore = Ext.getStore('ContractorsLocal');
        conStore.clearFilter();
        conStore.filterBy(function(rec){
            return rec.get('mode') !== 3 && rec.get('appointmentID') === Mob2.appointmentID;
        });
        //get contractor references
        lstCon.setStore(conStore);
        lstCon.refresh();

        //set sign-off if applicable - appointment Table
        if(me.IsSysValue('SD_CompleteRequired')){
            if(!me.getFrmSignOff()){
                Ext.create('Mob2.view.frmSignOff');
            }
            var fld =  me.getFrmSignOff().down('#txtCustomerSignature');
            if(record.get('customerSignature') ===''){
                fld.setValue(Mob2.sigPlaceholder);
                fld.setIsSigValid(false);

            }else{
                fld.setValue(record.get('customerSignature'));
                fld.setIsSigValid(true);
            }
            fld =  me.getFrmSignOff().down('#txtEmployeeSignature');
            if(record.get('employeeSignature') ===''){
                fld.setValue(Mob2.sigPlaceholder);
                fld.setIsSigValid(false);
            }else{
                fld.setValue(record.get('employeeSignature'));
                fld.setIsSigValid(true);
            }
            me.getFrmSignOff().down('#txtCustomerName').setValue(record.get('customerName'));
            carousel.add(me.getFrmSignOff());
        }

        //filer attachments store according to appointment
        var attachmentStore = Ext.getStore('AttachmentsLocal');
        attachmentStore.clearFilter();
        attachmentStore.filterBy(function(rec){
            return rec.get('mode') !== 3 && rec.get('appointmentID') === Mob2.appointmentID;
        });
        //get form references
        var attachList =me.getFrmAttachments().child('#lstAttachments'); 
        attachList.setStore(attachmentStore);
        attachList.refresh();
        //set records in tabs
        me.getFrmDetails().setRecord(record);
        me.getFrmActivity().setRecord(record);

        //set status drop down & load Activity Form particular
        var fields =  me.getFrmActivity().down('#fldActivity').getItems();
        fields.each(function(field) {   
            if (field.getItemId()) {
                if(field.getItemId() == 'ddlStatus'){
                    if(bNew){
                        var statStore = Ext.getStore('Status');
                        statStore.load(function(records, operation, success) {
                            field.setValue(record.get('activityStatus'));
                        });
                    }else{
                        field.setValue(record.get('activityStatus'));
                    }
                }else if(field.getItemId()==='txtTimeIn'){
                    field.setValue(record.get('activityStart'));
                }else if (field.getItemId()==='txtTimeOut'){
                    field.setValue(record.get('activityEnd'));
                }else if (field.getItemId()==='txtActivityComments'){
                    field.setValue(record.get('activityComment'));
                }else if (field.getItemId()==='txtKilometres'){
                    if(record.get('isKM')){
                        field.setHidden(false);
                        field.setValue(record.get('kilometres'));
                    }else{
                        field.setHidden(true);
                    }          
                }else if (field.getItemId()==='tglOvernight'){
                    field.setValue(record.get('isOvernight'));

                }
            }
        });


    },

    getMaxID: function(store) {
        var maxNo=0;
        store.each(function(record){
            if(record.get('recordID') !== Number.NaN){
                if(record.get('recordID') > maxNo){
                    maxNo = record.get('recordID');
                }
            }

        });
        console.log('maxNo; ' + maxNo);
        return maxNo+1;
    },

    checkTimeIn: function(arg) {
        if(arg !==''){
            return arg;
        }
    },

    getRAList: function(appointmentID) {
        var me = this;
        var retString = '';
        var local  = Ext.getStore('RAToolLocal');
        if (local.getCount() !== 0){
            //get checked list 
            var ar = null;
            local.each(function(record){
                ar = record.get('aptList').toString().split(',');
                Ext.Array.each(ar, function(rec) {
                    if (appointmentID.toString() === rec){
                        retString = record.get('list');
                        return false;
                    }
                });
                if(retString !== ''){return false;}
            });
        }
        return retString

    },

    clearRAList: function(appointmentID) {
        var me = this;
        var bSet = false;
        var local  = Ext.getStore('RAToolLocal');
        if (local.getCount() !== 0){
            //get checked list 
            var ar = null;
            local.each(function(record){
                ar = record.get('aptList').toString().split(',');
                Ext.Array.each(ar, function(rec) {
                    if (appointmentID.toString() === rec){
                        record.set('mode',0);
                        bSet = true;
                        return false;
                    }
                });
                if(bSet){return false;}
            });
        }
    },

    openAppointments: function() {
        var me = this;
        me.getNavMain().remove(me.getFrmAppointments(),true);
        Ext.create('Mob2.view.Appointments');
        var lst =  me.getFrmAppointments().down('#listAppointment');
        lst.setStore(Ext.getStore('AppointmentsLocal'));
        lst.refresh();
        me.getNavMain().push(me.getFrmAppointments()); 
        Ext.Viewport.setActiveItem(me.getNavMain());
        Ext.Viewport.setMasked(false);
    },

    internetError: function() {
        Ext.Msg.alert('Lightning','there has been a failure trying to connect to the internet<br/>please try again later');
        Ext.Viewport.setMasked(false);
    },

    onFileError: function(error) {

    }

});