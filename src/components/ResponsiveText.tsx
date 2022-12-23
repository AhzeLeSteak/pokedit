import {useId, useLayoutEffect, useState} from "react";


export const ResponsiveText = (props: {text: string}) => {

    const id = useId();
    const [fontSize, setFontSize] = useState(1);


    useLayoutEffect(() => {
        function updateSize() {
            const h = document.getElementById(id)?.getBoundingClientRect().height;
            h && setFontSize(h*.7);
        }
        window.addEventListener('resize', updateSize);
        setTimeout(() => updateSize(), 1);
        return () => window.removeEventListener('resize', updateSize);
    }, [id]);


    return <div id={id} style={{height: '100%',  fontSize: fontSize+'px'}}>{props.text}</div>
}