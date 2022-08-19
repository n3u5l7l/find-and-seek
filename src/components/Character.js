import styled from "styled-components";

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
export default function Character ({characters}){

    return (
        <CustomSection className="character-dropdown-list">
            {characters.map((char, index) => (
                <div className="character">
                    <img src={char.image} key={index} alt={char.name}></img>
                    <div>{char.name}</div>
                </div>
            ))}
           
        </CustomSection>
    )
}