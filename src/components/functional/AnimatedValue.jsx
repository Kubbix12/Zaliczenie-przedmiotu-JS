import { motion, AnimatePresence } from 'framer-motion'
import merge from 'lodash.merge'
import * as animations from './../utils/animations.jsx';

function AnimatedValue({value, animationType = 'fadeInUp', customAnimationProps = {}}) {

    const mergedProps = merge(animations[animationType], customAnimationProps);
    return (
        <AnimatePresence mode="popLayout">
            <motion.span  key={value} {...mergedProps}>
                {value}
            </motion.span>
        </AnimatePresence>
    );
}

export default AnimatedValue