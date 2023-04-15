import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Timer = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    background-color: #000;
`;

const Text = styled.h1`
    color: #50dfff;
    font-size: 32px;
    text-align: center;
`;

export default function workTimer() {
    const [countdown, setCountdown] = useState("");
    const [goHome, setGoHome] = useState(false);

    useEffect(() => {
        const userTime = prompt("When did you arrive?");
        if (userTime) {
            const [userHours, userMinutes] = userTime.split(":");
            const userDate = new Date();
            userDate.setHours(parseInt(userHours));
            userDate.setMinutes(parseInt(userMinutes));
            const countdownDate = new Date(userDate.getTime() + 8.5 * 60 * 60 * 1000);
            const countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const timeRemaining = countdownDate - now;
                const hours = Math.floor(
                    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                setCountdown(`${hours}:${minutes}:${seconds}`);
                if (timeRemaining < 0) {
                    clearInterval(countdownInterval);
                    setGoHome(true);
                    setCountdown("Time's up!");
                }
            }, 1000);
            return () => clearInterval(countdownInterval);
        }
    }, []);

    return <Timer>{countdown && <Text>{countdown}</Text>}</Timer>;
}
