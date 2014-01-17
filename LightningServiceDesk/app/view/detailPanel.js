/*
 * File: app/view/detailPanel.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Mob2.view.detailPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.detailPanel',

    config: {
        id: 'detailPanel',
        itemId: 'detailPanel',
        layout: {
            animation: 'slide',
            type: 'card'
        },
        items: [
            {
                xtype: 'container',
                title: 'Details',
                id: 'tabDetails',
                itemId: 'tabDetails',
                layout: {
                    type: 'fit'
                },
                scrollable: false,
                items: [
                    {
                        xtype: 'formpanel',
                        height: '',
                        id: 'frmDetails',
                        itemId: 'frmDetails',
                        padding: 0,
                        ui: 'light',
                        items: [
                            {
                                xtype: 'fieldset',
                                id: 'fldDetails',
                                itemId: 'fldDetails',
                                scrollable: false,
                                title: '',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'txtCustomer',
                                        itemId: 'txtCustomer',
                                        label: 'Customer',
                                        name: 'customer',
                                        placeHolder: '',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'txtSubject',
                                        label: 'Title',
                                        name: 'subject',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'txtStreet',
                                        label: 'Street',
                                        name: 'street',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'txtSuburb',
                                        label: 'Suburb',
                                        name: 'suburb',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'txtState',
                                        label: 'State',
                                        name: 'state',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'txtPhone',
                                        label: 'Phone',
                                        name: 'phone',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'txtContact',
                                        label: 'Contact',
                                        name: 'contact',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textareafield',
                                        height: 138,
                                        id: 'txtDetailComments',
                                        width: '',
                                        label: 'Comments',
                                        name: 'comments',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'txtStart',
                                        label: 'Start',
                                        name: 'starttime',
                                        readOnly: true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'Activity',
                id: 'tabActivity',
                itemId: 'tabActivity',
                layout: {
                    type: 'fit'
                },
                scrollable: false,
                items: [
                    {
                        xtype: 'formpanel',
                        height: '',
                        id: 'frmActivity',
                        items: [
                            {
                                xtype: 'fieldset',
                                id: 'fldActivity',
                                itemId: 'fldActivity',
                                ui: '',
                                scrollable: false,
                                title: '',
                                items: [
                                    {
                                        xtype: 'container',
                                        id: 'timeinContainer',
                                        layout: {
                                            type: 'hbox'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                html: 'time start',
                                                style: 'background-color:#f7f7f7;font-size:.8em;font-weight:bold;text-shadow:#fff 0 1px 1px;color:#333333;padding:0.6em;!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
                                                ui: 'light',
                                                width: '30%'
                                            },
                                            {
                                                xtype: 'spacer',
                                                ui: 'dark'
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'cmdtimeIn',
                                                itemId: 'cmdtimeIn',
                                                ui: 'action-round',
                                                text: 'select'
                                            },
                                            {
                                                xtype: 'spacer'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'timeoutContainer',
                                        layout: {
                                            type: 'hbox'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                html: 'time end',
                                                style: 'background-color:#f7f7f7;font-size:.8em;font-weight:bold;text-shadow:#fff 0 1px 1px;color:#333333;padding:0.6em;!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
                                                ui: 'dark',
                                                width: '30%'
                                            },
                                            {
                                                xtype: 'spacer'
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'cmdtimeOut',
                                                itemId: 'cmdtimeOut',
                                                ui: 'action-round',
                                                text: 'select'
                                            },
                                            {
                                                xtype: 'spacer'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textareafield',
                                        height: '138px',
                                        id: 'txtActivityComments',
                                        width: '',
                                        label: 'comments',
                                        name: 'activityComment',
                                        placeHolder: 'enter comments here',
                                        readOnly: false
                                    },
                                    {
                                        xtype: 'selectfield',
                                        data: '',
                                        id: 'ddlStatus',
                                        label: 'status',
                                        name: 'Status',
                                        displayField: 'description',
                                        store: 'Status',
                                        valueField: 'id'
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            pack: 'center',
                                            type: 'hbox'
                                        },
                                        scrollable: false,
                                        items: [
                                            {
                                                xtype: 'button',
                                                id: 'cmdActivitySave',
                                                ui: 'action-round',
                                                text: 'save'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'Inventory',
                id: 'tabInventory',
                itemId: 'tabInventory',
                layout: {
                    type: 'fit'
                },
                scrollable: false,
                items: [
                    {
                        xtype: 'container',
                        docked: 'bottom',
                        layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        scrollable: false,
                        items: [
                            {
                                xtype: 'button',
                                id: 'cmdAppInventorySave',
                                itemId: 'cmdAppInventorySave',
                                ui: 'action-round',
                                text: 'save'
                            },
                            {
                                xtype: 'spacer',
                                id: 'spacer',
                                itemId: 'spacer',
                                width: 100
                            },
                            {
                                xtype: 'button',
                                id: 'cmdAppInventoryAdd',
                                itemId: 'cmdAppInventoryAdd',
                                ui: 'action-round',
                                text: 'add'
                            }
                        ]
                    },
                    {
                        xtype: 'dataview',
                        id: 'dvInventory',
                        itemId: 'dvInventory',
                        itemTpl: [
                            '<table border="0\' cellpadding="0" cellspacing="0" width="100%">',
                            '<tr><td align="left">{name}</td><td align="right"><input type="number" style="width:50px;" value=\'{quantity}\' id=\'txtQty{xindex}\' /></td><td width="10px">&nbsp;</td>',
                            '</table>'
                        ],
                        store: 'AppInventory',
                        useComponents: false
                    }
                ]
            }
        ],
        tabBar: {
            docked: 'top',
            layout: {
                align: 'center',
                pack: 'center',
                type: 'hbox'
            }
        }
    }

});