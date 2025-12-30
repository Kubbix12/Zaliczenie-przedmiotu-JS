export const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
    exit: { y: -20, opacity: 0 }
};

export const fadeInDown = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
};

export const scaleIn = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.5 }
};

export const bounce = {
    initial: { scale: 0 },
    animate: { scale: 1.2 },
    transition: { type: "spring", stiffness: 300, damping: 10 }
};

export const rotate = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 2, ease: "easeInOut" }
};

export const flip = {
    initial: { rotateX: 0 },
    animate: { rotateX: 360 },
    transition: { duration: 2, ease: "easeInOut" }
};

export const zoomIn = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.5 }
};

export const zoomOut = {
    initial: { scale: 1 },
    animate: { scale: 0 },
    transition: { duration: 0.5 }
};

export const slideInLeft = {
    initial: { x: "-100%" },
    animate: { x: 0 },
    transition: { duration: 0.5 }
};

export const slideInRight = {
    initial: { x: "100%" },
    animate: { x: 0 },
    transition: { duration: 0.5 }
};

export const slideInTop = {
    initial: { y: "-100%" },
    animate: { y: 0 },
    transition: { duration: 0.5 }
};

export const slideInBottom = {
    initial: { y: "100%" },
    animate: { y: 0 },
    transition: { duration: 0.5 }
};

export const scaleOnHover = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 }
};
