/*
 * File: app/view/DetailCarousel.js
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

Ext.define('Mob2.view.DetailCarousel', {
    extend: 'Ext.carousel.Carousel',

    config: {
        id: 'DetailCarousel',
        indicator: false,
        items: [
            {
                xtype: 'formpanel',
                title: 'Details',
                height: '',
                id: 'frmDetails',
                itemId: 'frmDetails',
                padding: 0,
                ui: 'light',
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Details'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtCustomer',
                        label: 'Customer',
                        name: 'customer',
                        placeHolder: '',
                        readOnly: false
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtSubject',
                        label: 'Title',
                        name: 'subject',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtStreet',
                        label: 'Street',
                        name: 'street',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtSuburb',
                        label: 'Suburb',
                        name: 'suburb',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtState',
                        label: 'State',
                        name: 'state',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtPhone',
                        label: 'Phone',
                        name: 'phone',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtContact',
                        label: 'Contact',
                        name: 'contact',
                        readOnly: true
                    },
                    {
                        xtype: 'textareafield',
                        height: 138,
                        id: '',
                        itemId: 'txtDetailComments',
                        width: '',
                        label: 'Comments',
                        name: 'comments',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtStart',
                        label: 'Start',
                        name: 'starttime',
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'formpanel',
                height: '',
                id: 'frmActivity',
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Activity'
                    },
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
                                        action: 'cmdTimeIn',
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
                                        action: 'cmdTimeOut',
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
                                        action: 'cmdActivitySave',
                                        id: 'cmdActivitySave',
                                        ui: 'action-round',
                                        text: 'save'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                id: 'frmInventory',
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'component',
                        flex: 1,
                        height: '20px',
                        html: '<table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr><td align="left">Name</td><td align="left" width="25%" >Qty</td><td align="left" width="25%" style=\'visibility:visible\'>Cost</td></tr> </table>',
                        itemId: 'dvLabel'
                    },
                    {
                        xtype: 'list',
                        flex: 2,
                        itemId: 'dvInventory',
                        itemTpl: [
                            '<table border="0" cellpadding="0" cellspacing="0" width="100%">',
                            '    <tr><td align="left" width="50%">{name}</td><td align="left" width="25%"><input type="number" value=\'{quantity}\' style="width:50px;" id=\'txtQty{xindex}\' /></td><td align="left" width="25%"><input type="number" style="width:50px;" value=\'{cost}\' id=\'txtCost{xindex}\' /></td></tr>',
                            '</table>'
                        ],
                        store: 'InventoryUserLocal'
                    },
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Inventory'
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        title: '',
                        layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'button',
                                action: 'cmdInventoryAdd',
                                id: 'cmdInventoryAdd',
                                itemId: '',
                                padding: '',
                                ui: 'action-round',
                                text: 'add'
                            },
                            {
                                xtype: 'button',
                                action: 'cmdInventorySave',
                                id: 'cmdInventorySave',
                                itemId: 'mybutton4',
                                ui: 'action-round',
                                text: 'save'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                id: 'frmAttachments',
                layout: {
                    type: 'fit'
                },
                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Attachments'
                    },
                    {
                        xtype: 'list',
                        itemId: 'lstAttachments',
                        emptyText: 'no attachments available',
                        itemTpl: [
                            '<div>{name}</div>'
                        ],
                        store: 'AttachmentsLocal'
                    }
                ]
            }
        ]
    }

});