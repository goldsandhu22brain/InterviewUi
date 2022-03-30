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
connection.autoCloseEntireSession = true;

// https://www.rtcmulticonnection.org/docs/maxParticipantsAllowed/
connection.maxParticipantsAllowed = 1000;
// set value 2 for one-to-one connection
// connection.maxParticipantsAllowed = 2;

//// here goes canvas designer
var designer = new CanvasDesigner();

// you can place widget.html anywhere
designer.widgetHtmlURL = '/Candidate/Interview/CodingTest';//compiler-design.html';
designer.widgetJsURL = '';

designer.addSyncListener(function (data) {
    connection.send(data);
});
// here goes RTCMultiConnection

connection.chunkSize = 16000;
connection.enableFileSharing = false;

connection.session = {
    audio: true,
    video: true,
    data: true,
    screen: true,
    oneway: true
};
connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
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

connection.onUserStatusChanged = function (event) {
    var infoBar = document.getElementById('onUserStatusChanged');
    var employerInfoBar = document.getElementById('onEmployerJoinedStatus');
    employerInfoBar.innerHTML = 'Employer has not joined yet';
    var names = [];
    var roles = [];
    connection.getAllParticipants().forEach(function (pid) {
        names.push(getFullName(pid));
        roles.push(getRoles(pid));
    });

    if (!names.length) {
        names = ['Only You'];
    } else {
        names = [/*connection.extra.userFullName || */'You'].concat(names);
        employerInfoBar.innerHTML = 'Employer has joined';
    }

    infoBar.innerHTML = '<b>Active users:</b> ' + names.join(', ');
};

connection.onopen = function (event) {
    connection.onUserStatusChanged(event);
    document.getElementById('btn-chat-message').disabled = false;
};
connection.onclose = connection.onerror = connection.onleave = function (event) {
    connection.onUserStatusChanged(event);
};

connection.onmessage = function (event) {
    if (event.data.showMainVideo) {
        $('#main-video').show();
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
        $('#main-video').hide();
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

    if (event.data.chatMessage && !event.data.private) {
        appendChatMessage(event);
        return;
    }

    if (event.data.hideEmployerVideo) {
        removeEmployerVideo(event.data.employerName);
    }
    else {
        startEmployerVideo(event.data.employerName);
    }

    if (event.data.checkmark === 'received') {
        var checkmarkElement = document.getElementById(event.data.checkmark_id);
        if (checkmarkElement) {
            checkmarkElement.style.display = 'inline';
        }
        return;
    }

    if (event.data.sendCodeTest) {
        bindCodingTest();
    }

    if (event.data.sendTest) {
        bindTest(event.data.test_id);
    }
    if (event.closeMeeting) {
        closeWindow();
    }
    if (event.data === 'plz-sync-points') {
        designer.sync();
        return;
    }

    designer.syncData(event.data);
};

// extra code
connection.onstream = function (event) {
    if (event.stream.isScreen && !event.stream.canvasStream) {
        $('#screen-viewer').get(0).srcObject = event.stream;
        $('#screen-viewer').hide();
    }
    else if (event.extra.role === 'Candidate') {
        let obj = JSON.parse(event.stream.idInstance);
        //to enable screen share by default
        if (obj !== null && (obj.isScreen === true || obj.isScreen === 'true')) {
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
            var videoScreen = document.createElement('video');
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
        div.innerHTML = '<b>You:</b> <img class="checkmark" id="' + checkmark_id + '" title="Received" src="https://www.webrtc-experiment.com/images/checkmark.png"><br>' + event;
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

//code added for attend test window
function bindCodingTest() {
    var x = document.getElementById("code-test");
    var y = document.getElementById("quiz-test");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
    }
}

var testId;
//code added for normal test window
function bindTest(id) {
    //var x = document.getElementById("quiz-test");
    //var y = document.getElementById("code-test");
    //if (x.style.display === "none") {
    //    x.style.display = "inline-block";
    //    y.style.display = "none";
    //} else {
    //    x.style.display = "none";
    //}
    testId = id;
    getQuestion();
}

//code to get questions based on question no0
function getQuestion(nextQuestionId, currentQuestionId, answer, currentQuestionType) {
    $.ajax({
        url: '/Candidate/UserTest/LoadQuestion',
        type: 'POST',
        dataType: 'html',
        data: { McqId: testId, CandidateId: userId, InterviewId: roomId, NextQuestionId: nextQuestionId, Id: currentQuestionId, OptionNo: answer, QuestionType: currentQuestionType },
        success: function (response) {
            var result = response;
            $('#testDiv').html(result);
        },
        error: function () {
            alert('Error while loading questions...');
        }
    });
}

function GetAnswer(currentQuestionType)
{
    var ans;
    switch (currentQuestionType) {
        case 'RadioButton':
            ans = $("input:radio[name='flexRadio']:checked").val()
            break;
        case 'ImageRadioButton':
            ans = $("input:radio[name='imageRadio']:checked").val()
            break;
        case 'CheckBox':
            ans = $("input:checkbox[name='flexCheckbox']:checked").val()
            break;
        case 'ImageCheckBox':
            ans = $("input:checkbox[name='imageCheckbox']:checked").val()
            break;
    }
    return ans;
}

//code for onclick of question no
function onClikQuestionNo(nextQuestionId, currentQuestionId, currentQuestionType) {
    var answer = GetAnswer(currentQuestionType);
    getQuestion(nextQuestionId, currentQuestionId, answer, currentQuestionType);
}

//code for getting next question based on question no
function nextQuestion(input) {
    var nextQuestionId = $(input).attr('data-question-id');
    var currentQuestionId = $(input).attr('data-current-question');
    var currentQuestionType = $(input).attr('data-current-questionType');
    var answer = GetAnswer(currentQuestionType);
    getQuestion(nextQuestionId, currentQuestionId, answer, currentQuestionType);
}

//submitting test
function submitTest(input) {
    var currentQuestionId = $(input).attr('data-current-question');
    var currentQuestionType = $(input).attr('data-current-questionType');
    var answer = GetAnswer(currentQuestionType);
    $.ajax({
        url: '/Candidate/UserTest/SubmitMcq',
        type: 'POST',
        dataType: 'html',
        data: { McqId: testId, CandidateId: userId, InterviewId: roomId, Id: currentQuestionId, OptionNo: answer, QuestionType: currentQuestionType},
        success: function (response) {
            var result = response;
            $('#testDiv').html(result);
        },
        error: function () {
            alert('Error while submitting test...');
        }
    });
}

//code hide employer video
function removeEmployerVideo(name) {
    connection.streamEvents.selectAll().forEach(stream => {
        if (stream.extra.userFullName === name && !stream.isScreen) {
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
}

//code start employer video
function startEmployerVideo(name) {
    connection.streamEvents.selectAll().forEach(stream => {
        if (stream.extra.userFullName === name && !stream.isScreen) {
            stream.mediaElement.controls = false;
            var otherVideos = document.querySelector('#other-videos');
            otherVideos.appendChild(stream.mediaElement);
        }
    });
}

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

    connection.attachStreams.push(stream);
    connection.onstream({
        stream: stream,
        type: 'local',
        streamid: stream.id,
        //mediaElement: video
    });

    var screenTrackId = stream.getTracks()[0].id;
    addStreamStopListener(stream, function () {
        connection.send({
            hideMainVideo: true
        });

        $('#main-video').hide();
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

    $('#main-video').show();
    $('#screen-viewer').css({
        top: $('#widget-container').offset().top,
        left: $('#widget-container').offset().left,
        width: $('#widget-container').width(),
        height: $('#widget-container').height()
    });
    $('#screen-viewer').show();
}