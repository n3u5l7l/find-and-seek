import styled from "styled-components";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import particlesOptions from "../particles.json";
const Page = styled(motion.main)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:25px;
    min-width: 100vw;
    min-height: 100vh;
    width:100%;
    margin:0; padding:0;
    color:white;
`;

export default function ApplyParticle(props) {
    const particlesInit = async (engine) => {
        await loadFull(engine);
    } //maybe don't need useCallback

    return (Component) => {

        return ( 
            <Page  exit={{opacity:0}} transition={{duration:0.5}}  >
                <Particles id="tsparticles" options={particlesOptions} init={particlesInit} />
                <Component {...props}/>
            </Page>
        )
    }
}

/*
export default function ApplyParticle(props) {

    return (Component) => (moreProps) => {
        const particlesInit = useCallback( async (engine) => {
            await loadFull(engine);
        }, []); //maybe don't need useCallback

        return ( 
            <Page  exit={{opacity:0}} transition={{duration:0.5}}  >
                <Particle id="tsparticles" options={particlesOptions} init={particlesInit} />
                <Component {...props}/>
            </Page>
        )
    }
}

=> (Component) => (moreProps) =>{
    const particlesInit = useCallback( async (engine) => {
        await loadFull(engine);
    }, []); //maybe don't need useCallback

    return ( 
        <Page  exit={{opacity:0}} transition={{duration:0.5}}  >
            <Particle id="tsparticles" options={particlesOptions} init={particlesInit} />
            <Component {...props}/>
        </Page>
    )
}


    const particlesInit = useCallback( async (engine) => {
        await loadFull(engine);
    }, []); //maybe don't need useCallback

    return ( 
        <Page  exit={{opacity:0}} transition={{duration:0.5}}  >
            <Particle id="tsparticles" options={particlesOptions} init={particlesInit} />
            <Component {...props}/>
        </Page>
    )
}
*/