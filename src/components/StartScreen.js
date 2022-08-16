import styled from "styled-components"

const StartPage = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:25px;
    background-color: black;
    min-height: 100vh;
    margin:0; padding:0;
    color:white;
`;
const CustomButton = styled.button`
    border: 1px solid white;
    background-color: black;
    color:white;
`;
const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap:10px;
    flex-direction: column;
`
export default function StartScreen({setStartScreen}){
    

    return (
        <StartPage>
            <h1>Find-And-Seek</h1>
            <Menu>
                <ButtonWrapper className="option-wrapper">
                    <CustomButton onClick={()=> setStartScreen((prevState)=>!prevState)}><h3>Start Game</h3></CustomButton>
                    <CustomButton><h3>View LeaderBoard</h3></CustomButton>
                </ButtonWrapper>
            </Menu>
        </StartPage>
    )
}