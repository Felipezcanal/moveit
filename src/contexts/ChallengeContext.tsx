import { createContext, ReactNode, useContext, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number,
  currentXp: number, 
  xpToNextLevel: number,
  challengesCompleted: number, 
  levelUp: () => void,
  startNewChallenge: () => void,
  activeChallenge: Challenge
  resetChallenge: () => void,
}

interface ChalengesProviderProps {
  children: ReactNode;
}


export const ChallengesContext = createContext({} as ChallengesContextData)
export function ChallengesProvider ({children}: ChalengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  return ( 

    <ChallengesContext.Provider value={{ 
      level, 
      currentXp, 
      xpToNextLevel,
      challengesCompleted, 
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
    }}>
      {children}
    </ChallengesContext.Provider>

  );
}