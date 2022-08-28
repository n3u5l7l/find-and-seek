import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import particlesOptions from "../particles.json";

export default function ApplyParticle(props) {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, [])

    return (Component) => {

        return ( 
            <>
                <Particles id="tsparticles" options={particlesOptions} init={particlesInit} />
                <Component {...props}/>
            </>
        )
    }
}