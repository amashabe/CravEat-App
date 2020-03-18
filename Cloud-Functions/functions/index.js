const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();

exports.sendPushNotification =  functions.firestore.document('notifications/{notificationId}').onCreate((snap, context)=> {
    const newValue = snap.data();
    const userId = newValue.uid;
    const type = newValue.type;

    db.collection('users').doc(userId).get()
        .then(user => {
            if (user.data().token) {
                axios
                    .post(
                        "https://exp.host/--/api/v2/push/send",
                        {
                            to: user.data().token,
                            title: 'Notification',
                            body: type === 'COMMENT' ? `${newValue.commenterName} commented on your post.` : `${newValue.likerName} liked your post.`,
                            sound: "default",
                            data: context.params
                        },
                        {
                            headers: {
                                accept: "application/json",
                                "accept-encoding": "gzip, deflate",
                                "content-type": "application/json"
                            }
                        }
                    )
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }).catch(error => console.log(error))
        return 0;
})
