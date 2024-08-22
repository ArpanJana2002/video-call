import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { roomId } = useParams();
    const [userName, setUserName] = useState('');
    const [isMeetingStarted, setIsMeetingStarted] = useState(false);
    const meetingContainerRef = useRef(null);

    const startMeeting = async () => {
        if (!userName) {
            alert('Please enter your name');
            return;
        }

        const appID = 1729859975; // Replace with your actual app ID
        const serverSecret = "b7453c5511226b472afc0e57c3784006"; // Replace with your actual server secret
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), userName);
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: meetingContainerRef.current,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });

        setIsMeetingStarted(true);
    };

    useEffect(() => {
        if (meetingContainerRef.current && isMeetingStarted) {
            startMeeting();
        }
    }, [isMeetingStarted]);

    return (
        <div className="room-page">
            {!isMeetingStarted ? (
                <div className="enter-name">
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <button onClick={startMeeting}>Join Room</button>
                </div>
            ) : (
                <div ref={meetingContainerRef} style={{ width: '100%', height: '100vh' }}></div>
            )}
        </div>
    );
};

export default RoomPage;
