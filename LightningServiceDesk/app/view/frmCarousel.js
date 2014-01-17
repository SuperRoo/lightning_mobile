/*
 * File: app/view/frmCarousel.js
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

Ext.define('Mob2.view.frmCarousel', {
    extend: 'Ext.carousel.Carousel',

    requires: [
        'Mob2.view.txtReadOnly'
    ],

    config: {
        title: 'Details>',
        itemId: 'frmCarousel',
        indicator: false,
        items: [
            {
                xtype: 'formpanel',
                title: 'Details >',
                height: '',
                itemId: 'frmDetails',
                padding: 0,
                ui: 'light',
                items: [
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
                        placeHolder: '',
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
                title: '< Activity >',
                height: '',
                itemId: 'frmActivity',
                layout: {
                    type: 'fit'
                },
                scrollable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        id: 'fldActivity',
                        itemId: 'fldActivity',
                        ui: '',
                        scrollable: true,
                        title: '',
                        items: [
                            {
                                xtype: 'txtreadonly',
                                itemId: 'txtTimeIn',
                                label: 'Start',
                                name: 'activityStart',
                                placeHolder: 'tap to set'
                            },
                            {
                                xtype: 'txtreadonly',
                                itemId: 'txtTimeOut',
                                label: 'End',
                                name: 'activityEnd',
                                placeHolder: 'tap to set'
                            },
                            {
                                xtype: 'togglefield',
                                height: '50px',
                                itemId: 'tglOvernight',
                                style: 'valign:middle;',
                                label: 'Overnight',
                                name: 'isOvernight'
                            },
                            {
                                xtype: 'spacer',
                                cls: '$form-label-background-color ',
                                height: '20px'
                            },
                            {
                                xtype: 'textareafield',
                                height: '138px',
                                itemId: 'txtActivityComments',
                                width: '',
                                label: 'comments',
                                name: 'activityComment',
                                placeHolder: 'enter comments here'
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'txtKilometres',
                                label: 'KM\'s',
                                name: 'kilometres'
                            },
                            {
                                xtype: 'selectfield',
                                data: '',
                                itemId: 'ddlStatus',
                                label: 'status',
                                name: 'activityStatus',
                                displayField: 'description',
                                store: 'Status',
                                usePicker: true,
                                valueField: 'id'
                            },
                            {
                                xtype: 'toolbar',
                                docked: 'bottom',
                                layout: {
                                    pack: 'center',
                                    type: 'hbox'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        action: 'cmdActivitySave',
                                        itemId: 'cmdActivitySave',
                                        ui: 'round',
                                        text: 'save'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'formpanel',
                title: '< Materials >',
                itemId: 'frmInventory',
                layout: {
                    type: 'fit'
                },
                scrollable: false,
                items: [
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
                                itemId: 'cmdInventoryAdd',
                                padding: '',
                                ui: 'round',
                                text: 'add'
                            },
                            {
                                xtype: 'button',
                                action: 'cmdInventorySave',
                                itemId: 'cmdInventorySave',
                                ui: 'round',
                                text: 'save'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                title: '< Attachments >',
                itemId: 'frmAttachments',
                layout: {
                    type: 'fit'
                },
                items: [
                    {
                        xtype: 'list',
                        itemId: 'lstAttachments',
                        deferEmptyText: false,
                        emptyText: 'no attachments available',
                        itemTpl: [
                            '<div>{name}</div>'
                        ],
                        store: 'AttachmentsLocal'
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        itemId: 'mytoolbar4',
                        layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'cmdAttachmentAdd',
                                ui: 'round',
                                text: 'add'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                title: '< Contractors >',
                itemId: 'frmContractors',
                layout: {
                    type: 'vbox'
                },
                scrollable: true,
                items: [
                    {
                        xtype: 'component',
                        html: '<table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="height:30px;"><td align="left" width="50%">Name</td><td align="left" width="25%" >Start</td><td align="left" width="25%" >End</td></tr> </table>',
                        itemId: 'lstConLabel'
                    },
                    {
                        xtype: 'list',
                        flex: 1,
                        itemId: 'lstContractors',
                        emptyText: 'no contactors available',
                        itemTpl: [
                            '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" width="50%">{name}</td><td align="left" width="25%">{startTime}</td><td align="left" width="25%">{endTime}</td></tr></table>'
                        ],
                        store: 'ContractorsLocal'
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'cmdContractorAdd',
                                ui: 'round',
                                text: 'add'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});