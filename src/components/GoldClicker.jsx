import { useEffect } from "react";
import { Coins, Pickaxe, Cpu, ChevronsUp } from 'lucide-react';
import { motion } from "framer-motion";
import { scaleOnHover } from './utils/animations.jsx';
import AnimatedValue from "./functional/AnimatedValue";
import styles from './GoldClicker.module.css'
import useLocalStorageState from "use-local-storage-state";

function GoldClicker({initialValue = 0}) {
    const [gold, setGold] = useLocalStorageState('gold', { defaultValue: 0 });
    const [clickPower, setClickPower] = useLocalStorageState('clickPower', { defaultValue: 1 });
    const [clickUpgradeCost, setClickUpgradeCost] = useLocalStorageState('clickUpgradeCost', { defaultValue: 10 });
    const [autoClickerCost, setAutoClickerCost] = useLocalStorageState('autoClickerCost', { defaultValue: 20 });
    const [autoClickers, setAutoClickers] = useLocalStorageState('autoClickers', { defaultValue: 0 });
    const [autoClickerSpeedUpCost, setAutoClickerSpeedUpCost] = useLocalStorageState('autoClickerSpeedUpCost', { defaultValue: 10 });
    const [autoClickerSpeedUps, setAutoClickerSpeedUp] = useLocalStorageState('autoClickerSpeedUps', { defaultValue: 1 });


    const autoClicker = () => {
        if (gold >= autoClickerCost){
            setGold(prevGold => prevGold - autoClickerCost);
            setAutoClickers(prevAutoClickers => prevAutoClickers + 1);
            setAutoClickerCost(prevAutoClickerCost => prevAutoClickerCost * 2);
        }
    }

    useEffect(() => {
        const interval = 1000 / autoClickerSpeedUps;
        const timer = setInterval(() => {
            setGold(prevGold => prevGold + autoClickers);
        }, interval);

        return () => clearInterval(timer);
    }, [autoClickers, autoClickerSpeedUps])


    const autoClickerSpeedUp = () => {
        if (gold >= autoClickerSpeedUpCost)
        {
            setGold(prevGold => prevGold - autoClickerSpeedUpCost);
            setAutoClickerSpeedUp(prevAutoClickerSpeedUp => prevAutoClickerSpeedUp + 0.1);
            setAutoClickerSpeedUpCost(prevAutoClickerSpeedUpCost => prevAutoClickerSpeedUpCost * 2);
        }
    }

    const upgradeClickPower = () => {
        if (gold >= clickUpgradeCost)
        {
            setGold(prevGold => prevGold - clickUpgradeCost);
            setClickPower(prevClickPower => prevClickPower + 1);
            setClickUpgradeCost(prevClickUpgradeCost => prevClickUpgradeCost * 2);
        }
    }

    return(
        <div className={styles.goldClicker}>
            <h1>Gold clicker</h1>
            <div className={styles.stats}>
                <p><Coins />Gold: <AnimatedValue value={gold} customAnimationProps={{transition: 1}}/></p>
                <p><Pickaxe />Click power: <AnimatedValue value={clickPower} animationType="bounce"/></p>
                <p><Cpu />Auto-Clickers: <AnimatedValue value={autoClickers} /></p>
                <p><ChevronsUp />Auto-Clicker Speed Ups: <AnimatedValue value={autoClickerSpeedUps.toFixed(1)} />x</p>
            </div>
            <div className={styles.buttons}>
                <motion.button onClick={() => setGold(prevGold => prevGold + clickPower)}{...scaleOnHover}><Coins />Dig gold</motion.button><br />
                <motion.button onClick={upgradeClickPower} disabled={gold < clickUpgradeCost}{...scaleOnHover}><Pickaxe />Upgrade (Cost: {clickUpgradeCost})</motion.button><br />
                <motion.button onClick={autoClicker} disabled={gold < autoClickerCost}{...scaleOnHover}><Cpu />Buy Auto-Clicker (Cost: {autoClickerCost})</motion.button><br />
                <motion.button onClick={autoClickerSpeedUp} disabled={gold < autoClickerSpeedUpCost}{...scaleOnHover}><ChevronsUp />Buy Auto-Clicker Speed Up (Cost: {autoClickerSpeedUpCost})</motion.button>
            </div>
        </div>
    )
}

export default GoldClicker