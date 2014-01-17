/*
 * File: app/controller/ctlRiskRating.js
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

Ext.define('Mob2.controller.ctlRiskRating', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            riskRating: '#RiskRating',
            hidConsequences: {
                selector: '#RiskRating #hidConsequences',
                xtype: 'Ext.field.Hidden'
            },
            hidColour: '#RiskRating #hidColour',
            hidLikelihood: {
                selector: '#RiskRating #hidLikelihood',
                xtype: 'Ext.field.Hidden'
            },
            txtRisk: '#RiskRating #txtRisk',
            txtResidual: '#RiskRating #txtResidual',
            finalRiskRating: '#RiskTask #txtRiskRating',
            finalResidual: '#RiskTask #txtResidual',
            riskTask: '#RiskTask',
            finalColour: '#RiskTask #hidRRColour',
            navRisk: '#navRisk'
        },

        control: {
            "selectfield#ddlLikelihood": {
                change: 'onDdlLikelihoodChange'
            },
            "selectfield#ddlConsequences": {
                change: 'onDdlConsequencesChange'
            },
            "#RiskRating #cmdRatingSave": {
                tap: 'onCmdSaveTap'
            }
        }
    },

    onDdlLikelihoodChange: function(selectfield, newValue, oldValue, eOpts) {
        var me = this;
        me.getHidLikelihood().setValue(newValue);
        me.calcChange();

    },

    onDdlConsequencesChange: function(selectfield, newValue, oldValue, eOpts) {
        var me = this;
        me.getHidConsequences().setValue(newValue);
        me.calcChange();

    },

    onCmdSaveTap: function(button, e, eOpts) {
        var me = this;
        me.getFinalRiskRating().setValue(me.getTxtRisk().getValue());
        me.getFinalResidual().setValue(me.getTxtResidual().getValue());
        me.getFinalColour().setValue(me.getHidColour().getValue());
        me.getFinalRiskRating().addCls(me.getHidColour().getValue());
        //Ext.Viewport.remove(1);
        //Ext.Viewport.setActiveItem(me.getRiskTask());
        me.getNavRisk().pop();

    },

    calcChange: function() {
        var me = this;
        var con = me.getHidConsequences().getValue();
        var like =  me.getHidLikelihood().getValue();
        if (con !=='' && like !==''){
            con = parseInt(con);
            like = parseInt(like);
            var likeValue = new Array("E", "D", "C", "B", "A");
            var divText = '';
            var divColour = '';
            if (con === 5 || (con === 4 && like <= 2)) {
                //green
                divColour = 'm_text_RiskGreen';
                divText = 'Implement agreed risk mitigation controls before proceeding';
            } else if ((con === 4 && like > 2) || (con === 3 && like === 2) || (con === 3 && like === 3) || (like === 1 && con <= 2)) {
                //yellow
                divColour = 'm_text_RiskYellow';
                divText = 'Approval to commence at this level must be obtained from the Worker in Charge';
            } else if ((con === 3 && like > 3) || (con <= 2 && like > 1)) {
                //red
                divText = 'Approval to commence at this level must be obtained from the Technical Endorsee, the Worker in Charge';
                divColour = 'm_text_RiskRed';
            }
            var txtRisk = me.getTxtRisk();
            txtRisk.setValue(con + likeValue[like-1]);
            txtRisk.addCls(divColour);
            me.getTxtResidual().setValue(divText);
            me.getHidColour().setValue(divColour);

        }

    }

});