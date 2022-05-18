import db from '../firebase'

function updateStep1(orderID)
{
    db.collection('orderInProgress').doc(orderID).update({
        step1:true
    })
}
function updateStep2(orderID)
{
    db.collection('orderInProgress').doc(orderID).update({
        step2:true
    })
}
function updateStep3(orderID)
{
    db.collection('orderInProgress').doc(orderID).update({
        step3:true
    })
}
function updateStep4(orderID)
{
    db.collection('orderInProgress').doc(orderID).update({
        step4:true
    })
}

export {updateStep1,updateStep2,updateStep3,updateStep4}
