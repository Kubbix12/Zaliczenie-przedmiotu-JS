import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from "react-toastify";

function HelloFromExpress() {
    const [fetchMessage, setFetchMessage] = useState('');
    useEffect(() => {
        const fetchMessage = async () => {
            toast('Loading...');
            const response = await fetch('/api/hello');
            const data = await response.text();
            setTimeout(() => {
                setFetchMessage(data);
                toast.dismiss();
                toast.success('Loaded!');
            }, 3000);
            // setFetchMessage(data);
        };
        fetchMessage();
    }, []);
    return ( <h1>{fetchMessage ? fetchMessage : <RotatingLines strokeColor="#4f4f4f" visible={true} height="80" width="80" strokeWidth="5" animationDuration="0.75" ariaLabel='rotating-lines-loading'/>}</h1> );
}

export default HelloFromExpress