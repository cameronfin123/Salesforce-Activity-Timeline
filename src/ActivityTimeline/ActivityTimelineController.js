({
    doInit : function(component, event, helper) {
        let relatedToId = component.get("v.recordId");
        let relatedToFieldNamesString = component.get("v.relationshipFields");
        let sObjectNamesString = component.get("v.sObjectNames");
        let subjectFieldNamesString = component.get("v.subjectFieldNames");
        let descriptionFieldNamesString = component.get("v.descriptionFieldNames");
        let dateFieldNamesString = component.get("v.dateFieldNames");
        let iconNamesFieldString = component.get("v.iconNames");
        
        let relatedToFieldNames = relatedToFieldNamesString?relatedToFieldNamesString.split(','):[];
        let sObjectNames = sObjectNamesString?sObjectNamesString.split(','):[];
        let subjectFieldNames = subjectFieldNamesString?subjectFieldNamesString.split(','):[];
        let descriptionFieldNames = descriptionFieldNamesString?descriptionFieldNamesString.split(','):[];
        let dateFieldNames = dateFieldNamesString?dateFieldNamesString.split(','):[];
        let iconNames = iconNamesFieldString?iconNamesFieldString.split(','):[];
        
        let newActivityList = [];
        
        for ( let i = 0; i < relatedToFieldNames.length; i++ ) {
            let action = component.get( "c.getSObjects" );
            let params = {
                relatedToId: relatedToId,
                relatedToFieldName: relatedToFieldNames[i],
                sObjectName: sObjectNames[i],
                dateFieldName: dateFieldNames[i],
                subjectFieldName: subjectFieldNames[i],
                descriptionFieldName: descriptionFieldNames[i]
            };
            action.setParams(params);
            action.setCallback(this, function( response ) {
                let state = response.getState();
                let awc = response.getReturnValue();
                const tempParams = {
                        relatedToFieldName: relatedToFieldNames[i],
                        sObjectName: sObjectNames[i],
                        subjectFieldName: subjectFieldNames[i],
                        descriptionFieldName: descriptionFieldNames[i],
                        dateFieldName: dateFieldNames[i],
                    	iconName: iconNames[i]
                    };
                if ( state === "SUCCESS" && awc != null && awc != undefined) {
                    let records = awc.records;
                    let objectLabel = awc.objectName;
                    let iconName = awc.iconName;
                    console.log(iconName);
                    if (tempParams.iconName != '' && tempParams.iconName != undefined && tempParams.iconName != null) {
                        console.log(tempParams.iconName);
                        iconName = 'standard:' + tempParams.iconName;
                    }
                    
                    records.forEach(function(element,index) {
                        console.log(element);
                        //let s = helper.getFromattedDateHeader(element[tempParams.dateFieldName]);
                        newActivityList.push({
                            activity: element,
                            date: helper.getChildField(element,tempParams.dateFieldName),
                            relatedToFieldName: tempParams.relatedToFieldName,
                            sObjectName: objectLabel,
                            subjectFieldName: tempParams.subjectFieldName,
                            descriptionFieldName: tempParams.descriptionFieldName,
                            dateFieldName: tempParams.dateFieldName,
                            id: element.Id,
                            iconName: iconName
                        });
                    });
                } else {
                    console.log("This object doesn't exist.");
                    alert(`Issue processing this object. Check to ensure the api names are correct\n
                          sObjectName: ${params.sObjectName}
                          relatedToFieldName: ${tempParams.relatedToFieldName}
                          subjectFieldName: ${tempParams.subjectFieldName}
                          descriptionFieldName: ${tempParams.descriptionFieldName}
                          dateFieldName: ${tempParams.dateFieldName}
                          `);
                }
                if ( i == (relatedToFieldNames.length - 1) ) {
                    newActivityList.sort(function(a,b){
                        let d1 = null;
                        if ( a.date != undefined ) { 
                            d1 = new Date(a.date);
                        }
                        let d2 = null;
                        if ( b.date != undefined ) {
                            d2 = new Date(b.date);
                        }
                        
                        if ( d1 === null && d2 != null ) {
                            return -1;
                        } else if ( d1 != null && d2 === null ) {
                            return 1;
                        } else if ( d1 === null && d2 === null ) {
                            return 0;
                        } else if ( d1 > d2 ) {
                            return -1;
                        } else if ( d2 > d1 ) {
                            return 1;
                        }
                        return 0;
                    });
                    let newListObj = {};
                    for(const index in newActivityList ) {
                        const prop = newActivityList[index];
                        const s = helper.getFormmattedDateHeader(prop.date);
                        
                        if ( newListObj[s] === undefined ) {
                            newListObj[s] = [prop];
                        } else {
                            newListObj[s].push(prop);
                        }
                    }
                    let newList = [];
                    for(const p in newListObj) {
                        newList.push({
                            name: p,
                            values: newListObj[p]
                        });
                    }
                    if ( newList.length > 0 ) {
                    	component.set("v.ActiveSectionName",newList[0].name);
                        component.set("v.ActivityList",newList);
                        component.set("v.showActivityList", true);
                    }
                }
            });
            $A.enqueueAction( action );
        }
    }
})