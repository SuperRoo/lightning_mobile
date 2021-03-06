/*
 * File: app/controller/NavController.js
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

Ext.define('Mob2.controller.NavController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            frmLogin: '#formLogin',
            listAppointment: '#listAppointment',
            navMain: {
                selector: '#navMain',
                xtype: 'navigationview'
            },
            frmCarousel: '#frmCarousel',
            tabDetails: {
                selector: 'detailPanel #tabDetails',
                xtype: 'container'
            },
            riskList: 'panRiskList',
            riskView: {
                selector: '[itemId=panRiskTask]',
                xtype: 'Ext.Panel'
            },
            riskRATools: '#RiskRATools',
            riskList: '#RiskList',
            raToolsList: '#raToolsList',
            frmDetails: '#frmCarousel #frmDetails'
        },

        control: {
            " #listAppointment": {
                itemtap: 'onListItemTap'
            },
            "button#Logoff": {
                tap: 'onLogoffTap'
            },
            "button#cmdAppointments": {
                tap: 'onCmdAppointmentsTap'
            },
            "#navMain": {
                back: 'onNavMainBack'
            },
            "button#cmdTimesheets": {
                tap: 'onCmdTimesheetsTap'
            }
        }
    },

    onListItemTap: function(dataview, index, target, record, e, eOpts) {
        var me = this;
        var viewPanel;
        var title;
        Ext.Viewport.setMasked({ message: 'Loading...' });
        var bNew = false;
        var controlCommon = me.getApplication().getController('ctlCommon');
        if(record){
            Mob2.appointmentID=record.get('appointmentID'); 
            controlCommon.loadDetail(); 
            Mob2.loading = true;
            me.getFrmCarousel().setActiveItem(0);   
            Mob2.loading = false;
            me.getNavMain().push(me.getFrmCarousel());
            me.getNavMain().show();    
            Ext.Viewport.setMasked(false);
        }

    },

    onLogoffTap: function(button, e, eOpts) {
        var me = this;
        Mob2.userID = null;
        Mob2.app.getApplication().getController('Login').saveCookie('');
        Mob2.app.getApplication().getController('ctlCommon').destroyView('formLogin');
        if (me.getFrmLogin()){me.getFrmLogin().destroy();}
        Ext.create('Mob2.view.formLogin');
        Ext.Viewport.add(me.getFrmLogin());
        Ext.Viewport.setActiveItem(me.getFrmLogin());
    },

    onCmdAppointmentsTap: function(button, e, eOpts) {
        Ext.Viewport.setMasked({ message: 'Loading...' });
        Mob2.app.getApplication().getController('ctlCommon').loadAppointments(); 
    },

    onNavMainBack: function(navigationview, eOpts) {
        alert('gone back');
        debugger;
    },

    onCmdTimesheetsTap: function(button, e, eOpts) {
        Ext.Viewport.setMasked(true);
        Mob2.app.getApplication().getController('ctlTimesheet').startApp(); 
    }

});