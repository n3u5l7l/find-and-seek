import styled from "styled-components";
import AshKetchum from "../assets/ash-ketch-1.png";
import Tom from "../assets/tom-tom-and-jerry-png-418409.png"

const CustomSection = styled.section`
    display: none;
    align-items: center;

    & > .character{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    & > .character > img{
        width: 70px;
        height:auto;
    }
`
export default function Character (){

    return (
        <CustomSection className="character-dropdown-list">
            <div className="character">
                <img src={AshKetchum} alt="Ash Ketchum"></img>
                <div>Ash</div>
            </div>
            <div className="character">
                <img src={Tom} alt="Tom"></img>
                <div>Tom</div>
            </div>
        </CustomSection>
    )
}