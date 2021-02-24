import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css'
import {CloseIcon} from './CloseIcon'



let countdownTimeout: NodeJS.Timeout;
let timeToCountdown = 0.1 //in minutes

export function Countdown() {


  const { startNewChallenge } =  useContext(ChallengesContext);

  const [time, setTime] = useState(timeToCountdown * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false);
    setTime(timeToCountdown * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time-1)
      }, 1000)
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
          disabled
          type="button" 
          className={styles.countdownButton}
        >
          <div className={styles.countdownButtonDiv}>
            Ciclo encerrado
            <img src="icons/check.svg" alt="Level"/>
          </div>
          <div></div>
        </button>
      ) : (
        <>
          {isActive ? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <CloseIcon />
            </button>
    
          ) : (
    
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo 
              <img src="icons/play.svg" alt="Level"/>
            </button>
          ) }
        </>
      )}      

      
    </div>
  );
}