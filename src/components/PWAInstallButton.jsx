import { useEffect, useState } from "react";
function PWAInstallButton () {
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [deferredPrompt, setDefferedEvent] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDefferedEvent(e);
            setShowInstallButton(true);
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstallClick = async () => {
    if (deferredPrompt) {
        const userChoice = await deferredPrompt.prompt();

        if(userChoice.outcome === 'accepted') {
            setDefferedPrompt(null);
            setShowInstallButton(false);
        }
    }
    }
    return (
        showInstallButton ?
        <button onClick={handleInstallClick}>
           Download App
        </button>
        : null
    )
}

export default PWAInstallButton