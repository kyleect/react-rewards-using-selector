import { useCallback, useState } from 'react';
import { confetti } from '../components/Confetti/Confetti';
import { emoji } from '../components/Emoji/Emoji';
import { balloons } from '../components/Balloons/Balloons';
import { UseRewardType } from './useReward.types';

export const useReward: UseRewardType = (selector, type, config) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const internalAnimatingCallback = () => {
    setIsAnimating(false);
  };

  const reward = useCallback(() => {
    const foundContainer = document.querySelector(selector);
    if (!foundContainer) return;
    setIsAnimating(true);
    switch (type) {
      case 'confetti':
        confetti(foundContainer, internalAnimatingCallback, config);
        break;
      case 'emoji':
        emoji(foundContainer, internalAnimatingCallback, config);
        break;
      case 'balloons':
        balloons(foundContainer, internalAnimatingCallback, config);
        break;
      default:
        console.error(`${type} is not a valid react-rewards type.`);
    }
  }, [config, selector, type]);

  return { reward, isAnimating };
};
