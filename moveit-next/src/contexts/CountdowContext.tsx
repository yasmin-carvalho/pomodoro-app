import { createContext, ReactNode, useContext, useEffect, useState } from "react"; 
import { ChallengesContext } from "./ChallengesContext";

interface CountdowContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdow: () => void;
    resetCountdow: () => void;
}

interface CountdowProviderProps {
    children: ReactNode;
}

export const CountdowContext = createContext ({} as CountdowContextData)

let countdownTimeout: NodeJS.Timeout; 

export function CountdowProvider ({ children }: CountdowProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] =useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdow() {
        setIsActive(true);
    }

    function resetCountdow() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1*60);
    }

    useEffect(() => {
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <CountdowContext.Provider value={{
            minutes,
            seconds,
            hasFinished, 
            isActive,
            startCountdow,
            resetCountdow,
        }}>
            {children}
        </CountdowContext.Provider>
    )
}