var connection = new RTCMultiConnection();

//connection.socketURL = '/';
connection.socketURL = 'https://www.brainmeasures.com:9001/';

connection.extra = {
    userFullName: userFullName,
    role: role
};

/// make this room public
connection.publicRoomIdentifier = publicIdentifier;

connection.socketMessageEvent = 'canvas-dashboard-demo';

// keep room opened even if owner leaves
connection.autoCloseEntireSession = false;

// https://www.rtcmulticonnection.org/docs/maxParticipantsAllowed/
connection.maxParticipantsAllowed = 1000;
// set value 2 for one-to-one connection
// connection.maxParticipantsAllowed = 2;

// here goes canvas designer
var designer = new CanvasDesigner();

////// you can place widget.html anywhere
designer.widgetHtmlURL = '/Candidate/Interview/CodingTest';//compiler-design.html';
designer.widgetJsURL = '';

designer.addSyncListener(function (data) {
    connection.send(data);
});
// here goes RTCMultiConnection

connection.chunkSize = 16000;
connection.enableFileSharing = true;

connection.session = {
    audio: true,
    video: true,
    data: true
};
connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

connection.onUserStatusChanged = function (event) {
    var infoBar = document.getElementById('onUserStatusChanged');
    var candidateInfoBar = document.getElementById('onCandidateJoinedStatus');
    candidateInfoBar.innerHTML = 'Candidate has not joined yet';
    var names = [];
    var roles = [];
    connection.getAllParticipants().forEach(function (pid) {
        names.push(getFullName(pid));
        roles.push(getRoles(pid));
    });

    if (!names.length) {
        names = ['Only You'];
    } else {
        names = [/*connection.extra.userFullName ||*/ 'You'].concat(names);
        if (roles.includes('Candidate')) {
            candidateInfoBar.innerHTML = 'Candidate has joined';
        }
    }

    infoBar.innerHTML = '<b>Active users:</b> ' + names.join(', ');
};

connection.onopen = function (event) {
    connection.onUserStatusChanged(event);

    //if (designer.pointsLength <= 0) {
    //    // make sure that remote user gets all drawings synced.
    //    setTimeout(function () {
    //        connection.send('plz-sync-points');
    //    }, 1000);
    //}

    document.getElementById('btn-chat-message').disabled = false;
    document.getElementById('btn-private-chat').disabled = false;
    document.getElementById('btn-send-codetest').disabled = false;
    document.getElementById('btn-send-test').disabled = false;
};
connection.onclose = connection.onerror = connection.onleave = function (event) {
    connection.onUserStatusChanged(event);
};

connection.onmessage = function (event) {
    if (event.data.showMainVideo) {
        // $('#main-video').show();
        $('#screen-viewer').css({
            top: $('#widget-container').offset().top,
            left: $('#widget-container').offset().left,
            width: $('#widget-container').width(),
            height: $('#widget-container').height()
        });
        $('#screen-viewer').show();
        return;
    }

    if (event.data.hideMainVideo) {
        // $('#main-video').hide();
        $('#screen-viewer').hide();
        return;
    }

    if (event.data.typing === true) {
        $('#key-press').show().find('span').html(event.extra.userFullName + ' is typing');
        return;
    }

    if (event.data.typing === false) {
        $('#key-press').hide().find('span').html('');
        return;
    }

    if (event.data.chatMessage) {
        appendChatMessage(event);
        return;
    }
    if (event.closeMeeting) {
        closeWindow();
    }
    if (event.data.checkmark === 'received') {
        var checkmarkElement = document.getElementById(event.data.checkmark_id);
        if (checkmarkElement) {
            checkmarkElement.style.display = 'inline';
        }
        return;
    }

    if (event.data === 'plz-sync-points') {
        designer.sync();
        return;
    }

    designer.syncData(event.data);
};

// extra code
connection.onstream = function (event) {
    //if (event.stream.isScreen && !event.stream.canvasStream) {
    //    $('#screen-viewer').get(0).srcObject = event.stream;
    //    $('#screen-viewer').hide();
    //}
    //else
    if (event.extra.role === 'Candidate') {
        if (event.stream.isScreen === true || event.stream.isScreen === 'true') {
            var existing = document.getElementById(event.streamid);
            if (existing && existing.parentNode) {
                existing.parentNode.removeChild(existing);
            }
            event.mediaElement.removeAttribute('src');
            event.mediaElement.removeAttribute('srcObject');
            event.mediaElement.muted = true;
            event.mediaElement.volume = 0;
            event.mediaElement.controls = false;
            event.stream.isScreen = true;
            var videoScreen = document.getElementById('screen-viewer');
            //var videoScreen = document.createElement('video');
            //try {
            //    videoScreen.setAttributeNode(document.createAttribute('autoplay'));
            //    videoScreen.setAttributeNode(document.createAttribute('playsinline'));
            //} catch (e) {
            //    videoScreen.setAttribute('autoplay', true);
            //    videoScreen.setAttribute('playsinline', true);
            //}

            if (event.type === 'local') {
                videoScreen.volume = 0;
                try {
                    videoScreen.setAttributeNode(document.createAttribute('muted'));
                } catch (e) {
                    videoScreen.setAttribute('muted', true);
                }
            }
            videoScreen.srcObject = event.stream;
            $('#screen-viewer').show();
            //var width = innerWidth - 80;
            //var mediaElement = getHTMLMediaElement(videoScreen, {
            //    title: event.userid,
            //    buttons: ['full-screen'],
            //    width: width,
            //    showOnMouseEnter: false
            //});

            //connection.videosContainer.appendChild(mediaElement);

            //setTimeout(function () {
            //    mediaElement.media.play();
            //}, 5000);

            //mediaElement.id = event.streamid;

        }
        else {
            var video = document.getElementById('main-video');
            video.setAttribute('data-streamid', event.streamid);
            // video.style.display = 'none';
            if (event.type === 'local') {
                video.muted = true;
                video.volume = 0;
            }
            video.srcObject = event.stream;
            $('#main-video').show();
        }
    }
    else {
        event.mediaElement.controls = false;
        var otherVideos = document.querySelector('#other-videos');
        otherVideos.appendChild(event.mediaElement);
    }

    connection.onUserStatusChanged(event);
};

connection.onstreamended = function (event) {
    var video = document.querySelector('video[data-streamid="' + event.streamid + '"]');
    if (!video) {
        video = document.getElementById(event.streamid);
        if (video) {
            video.parentNode.removeChild(video);
            return;
        }
    }
    if (video) {
        video.srcObject = null;
        video.style.display = 'none';
    }
};

var conversationPanel = document.getElementById('conversation-panel');

function appendChatMessage(event, checkmark_id) {
    var div = document.createElement('div');

    div.className = 'message';

    if (event.data) {
        div.innerHTML = '<b>' + (event.extra.userFullName || event.userid) + ':</b><br>' + event.data.chatMessage;

        if (event.data.checkmark_id) {
            connection.send({
                checkmark: 'received',
                checkmark_id: event.data.checkmark_id
            });
        }
    } else {
        div.innerHTML = '<b>You:</b> <img style="max-width:20px;max-height:20px" class="checkmark" id="' + checkmark_id + '" title="Received" src="/images/checkmark.png"><br>' + event;
        div.style.background = '#cbffcb';
    }

    conversationPanel.appendChild(div);

    conversationPanel.scrollTop = conversationPanel.clientHeight;
    conversationPanel.scrollTop = conversationPanel.scrollHeight - conversationPanel.scrollTop;
}

var keyPressTimer;
var numberOfKeys = 0;
$('#txt-chat-message').emojioneArea({
    pickerPosition: "top",
    filtersPosition: "bottom",
    tones: false,
    autocomplete: true,
    inline: true,
    hidePickerOnBlur: true,
    events: {
        focus: function () {
            $('.emojionearea-category').unbind('click').bind('click', function () {
                $('.emojionearea-button-close').click();
            });
        },
        keyup: function (e) {
            var chatMessage = $('.emojionearea-editor').html();
            if (!chatMessage || !chatMessage.replace(/ /g, '').length) {
                connection.send({
                    typing: false
                });
            }


            clearTimeout(keyPressTimer);
            numberOfKeys++;

            if (numberOfKeys % 3 === 0) {
                connection.send({
                    typing: true
                });
            }

            keyPressTimer = setTimeout(function () {
                connection.send({
                    typing: false
                });
            }, 1200);
        },
        blur: function () {
            // $('#btn-chat-message').click();
            connection.send({
                typing: false
            });
        }
    }
});

window.onkeyup = function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        $('#btn-chat-message').click();
    }
};

document.getElementById('btn-chat-message').onclick = function () {
    var chatMessage = $('.emojionearea-editor').html();
    $('.emojionearea-editor').html('');

    if (!chatMessage || !chatMessage.replace(/ /g, '').length) return;

    var checkmark_id = connection.userid + connection.token();

    appendChatMessage(chatMessage, checkmark_id);

    connection.send({
        chatMessage: chatMessage,
        checkmark_id: checkmark_id
    });

    connection.send({
        typing: false
    });
};

//code added for private chat
document.getElementById('btn-private-chat').onclick = function () {
    var chatMessage = $('.emojionearea-editor').html();
    $('.emojionearea-editor').html('');

    if (!chatMessage || !chatMessage.replace(/ /g, '').length) return;

    var checkmark_id = connection.userid + connection.token();
    appendChatMessage(chatMessage, checkmark_id);

    connection.send({
        chatMessage: chatMessage,
        checkmark_id: checkmark_id,
        private: true
    });

    connection.send({
        typing: false
    });
};

//code for enabling code test window
document.getElementById('btn-send-codetest').onclick = function () {
    connection.send({
        sendCodeTest: true
    });
};

//code for enabling test window
document.getElementById('btn-send-test').onclick = function () {
    $("#exampleModal").modal("show");
};

//close modal popup
function CloseModal() {
    $("#exampleModal").modal("hide");
}

//code for calling test window
function SendTest() {
    var allowedToGoBack = $("#modalAllowedToGoBack").is(":checked");
    var canSkip = $("#modalCanSkip").is(":checked");
    var isReviewAllowed = $("#modalIsReviewAllowed").is(":checked");
    var title = document.getElementById('modalTitle').value;
    var mins = document.getElementById('modalTotalTimeInMinutes').value;
    var e = document.getElementById("modalQuestionOn");
    var questionOn = e.options[e.selectedIndex].value;
    $.ajax({
        url: '/Employer/Interview/StartMcQTest',
        type: 'POST',
        dataType: 'json',
        data: { Id: roomId, QuestionOn: questionOn, Title: title, TotalTimeInMinutes: mins, AllowedToGoBack: allowedToGoBack, IsReviewAllowed: isReviewAllowed, CanSkip: canSkip },
        success: function (response) {
            if (response.Status) {
                connection.send({
                    sendTest: true,
                    test_id: response.Id
                });
                CloseModal();
            }
        },
        error: function () {
            alert('error');
        }
    });
}

//code for disabling video
function HideEmployerVideo() {
    connection.streamEvents.selectAll().forEach(stream => {
        if (stream.extra.userFullName === connection.extra.userFullName && !stream.isScreen) {
            var video = document.querySelector('video[data-streamid="' + stream.streamid + '"]');
            if (!video) {
                video = document.getElementById(stream.streamid);
                if (video) {
                    video.parentNode.removeChild(video);
                    return;
                }
            }
            if (video) {
                video.srcObject = null;
                video.style.display = 'none';
            }
        }
    });
    connection.send({
        hideEmployerVideo: true,
        employerName: connection.extra.userFullName
    });
    var btnHtml = "<button class='fa fa-camera mr-1' aria-hidden='true' id='btn-start-video' onclick='ShowEmployerVideo()'>Start Video</button>";
    document.getElementById('list-btn-video').innerHTML = btnHtml;
}

//code for enabling video
function ShowEmployerVideo() {
    connection.streamEvents.selectAll().forEach(stream => {
        if (stream.extra.userFullName === connection.extra.userFullName && !stream.isScreen) {
            stream.mediaElement.controls = false;
            var otherVideos = document.querySelector('#other-videos');
            otherVideos.appendChild(stream.mediaElement);
        }
    });
    connection.send({
        hideEmployerVideo: false,
        employerName: connection.extra.userFullName
    });
    var btnHtml = "<button class='fa fa-camera mr-1' aria-hidden='true' id='btn-end-video' onclick='HideEmployerVideo()'>End Video</button>";
    document.getElementById('list-btn-video').innerHTML = btnHtml;
}

//code for enabling and disabling audio
//document.getElementById('btn-end-audio').onclick = function () {
//    var video = document.querySelector('video[data-streamid="' + event.streamid + '"]');
//    if (!video) {
//        video = document.getElementById(event.streamid);
//        if (video) {
//            video.audio = false;
//            return;
//        }
//    }
//    if (video) {
//        video.audio = false;
//    }
//};

function closeWindow() {
    window.close();
}

/*code for end meeting*/
document.getElementById('btn-end-meeting').onclick = function () {
    if (confirm("Do you want to end the meeting?") == true) {
        var value = connection.sessionid;
        $.ajax({
            url: '/Candidate/Interview/EndMeeting',
            type: 'POST',
            dataType: 'json',
            data: { id: value },
            success: function (data) {
                if (data.Success) {
                    connection.send({
                        closeMeeting: true,
                    });
                    connection.getAllParticipants().forEach(function (pid) {
                        connection.disconnectWith(pid);
                    });
                    window.close();
                }
            },
            error: function () {
                alert('error');
            }
        });
    } else {
        return;
    }
};

function getFullName(userid) {
    var _userFullName = userid;
    if (connection.peers[userid] && connection.peers[userid].extra.userFullName) {
        _userFullName = connection.peers[userid].extra.userFullName;
    }
    return _userFullName;
}

function getRoles(userid) {
    var _role = userid;
    if (connection.peers[userid] && connection.peers[userid].extra.role) {
        _role = connection.peers[userid].extra.role;
    }
    return _role;
}

if (!!password) {
    connection.password = password;
}

designer.appendTo(document.getElementById('content'), function () {
    //var tempStreamCanvas = document.getElementById('temp-stream-canvas');
    //var tempStream = tempStreamCanvas.captureStream();
    //tempStream.isScreen = true;
    //tempStream.streamid = tempStream.id;
    //tempStream.type = 'local';
    //connection.attachStreams.push(tempStream);
    //window.tempStream = tempStream;

    var sessionid = roomId;
    connection.extra.roomOwner = true;
    connection.open(sessionid, function (isRoomOpened, roomid, error1) {
        if (error1) {
            if (error1 === connection.errors.ROOM_NOT_AVAILABLE) {
                //alert('Someone already created this room. Please either join or create a separate room.');

                connection.join(sessionid, function (isRoomJoined, roomid, error) {
                    if (error) {
                        if (error === connection.errors.ROOM_NOT_AVAILABLE) {
                            alert('This room does not exist. Please either create it or wait for moderator to enter in the room.');
                        }
                        alert(error);
                    }
                });
            }
        }
        connection.socket.on('disconnect', function () {
            location.reload();
        });
    });
    designer.destroy();
});

function addStreamStopListener(stream, callback) {
    stream.addEventListener('ended', function () {
        callback();
        callback = function () { };
    }, false);

    stream.addEventListener('inactive', function () {
        callback();
        callback = function () { };
    }, false);

    stream.getTracks().forEach(function (track) {
        track.addEventListener('ended', function () {
            callback();
            callback = function () { };
        }, false);

        track.addEventListener('inactive', function () {
            callback();
            callback = function () { };
        }, false);
    });
}

function replaceTrack(videoTrack, screenTrackId) {
    if (!videoTrack) return;
    if (videoTrack.readyState === 'ended') {
        alert('Can not replace an "ended" track. track.readyState: ' + videoTrack.readyState);
        return;
    }
    connection.getAllParticipants().forEach(function (pid) {
        var peer = connection.peers[pid].peer;
        if (!peer.getSenders) return;
        var trackToReplace = videoTrack;
        peer.getSenders().forEach(function (sender) {
            if (!sender || !sender.track) return;
            if (screenTrackId) {
                if (trackToReplace && sender.track.id === screenTrackId) {
                    sender.replaceTrack(trackToReplace);
                    trackToReplace = null;
                }
                return;
            }

            if (sender.track.id !== tempStream.getTracks()[0].id) return;
            if (sender.track.kind === 'video' && trackToReplace) {
                sender.replaceTrack(trackToReplace);
                trackToReplace = null;
            }
        });
    });
}

function replaceScreenTrack(stream) {
    stream.isScreen = true;
    stream.streamid = stream.id;
    stream.type = 'local';

    // connection.attachStreams.push(stream);
    connection.onstream({
        stream: stream,
        type: 'local',
        streamid: stream.id,
        // mediaElement: video
    });

    var screenTrackId = stream.getTracks()[0].id;
    addStreamStopListener(stream, function () {
        connection.send({
            hideMainVideo: true
        });

        // $('#main-video').hide();
        $('#screen-viewer').hide();
        $('#btn-share-screen').show();
        replaceTrack(tempStream.getTracks()[0], screenTrackId);
    });

    stream.getTracks().forEach(function (track) {
        if (track.kind === 'video' && track.readyState === 'live') {
            replaceTrack(track);
        }
    });

    connection.send({
        showMainVideo: true
    });

    // $('#main-video').show();
    $('#screen-viewer').css({
        top: $('#widget-container').offset().top,
        left: $('#widget-container').offset().left,
        width: $('#widget-container').width(),
        height: $('#widget-container').height()
    });
    $('#screen-viewer').show();
}

        //$('#btn-share-screen').click(function () {
        //    if (!window.tempStream) {
        //        alert('Screen sharing is not enabled.');
        //        return;
        //    }

        //    $('#btn-share-screen').hide();

        //    if (navigator.mediaDevices.getDisplayMedia) {
        //        navigator.mediaDevices.getDisplayMedia(screen_constraints).then(stream => {
        //            replaceScreenTrack(stream);
        //        }, error => {
        //            alert('Please make sure to use Edge 17 or higher.');
        //        });
        //    }
        //    else if (navigator.getDisplayMedia) {
        //        navigator.getDisplayMedia(screen_constraints).then(stream => {
        //            replaceScreenTrack(stream);
        //        }, error => {
        //            alert('Please make sure to use Edge 17 or higher.');
        //        });
        //    }
        //    else {
        //        alert('getDisplayMedia API is not available in this browser.');
        //    }
        //});