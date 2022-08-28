import styled from "styled-components";
import PropTypes from "prop-types";

const CustomSection = styled.section`
    display: none;
    align-items: center;
    gap:15px;

    & > .character{
        display:flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    & > .character.found{
        opacity:0.5;
    }
    & > .character.found::before{
        content: "";
        width: 100%;
        position: absolute;
        top: 50%;
        left:0;
        height: 3px;
        background: gray;
        transform:translateY(-50%);
    }
    & > .character > img{
        width: 70px;
        height:auto;
    }

    & > .character > div{
        position: relative;
    }

    & > .character.found > div::before{
        content: "";
        width: 100%;
        position: absolute;
        top: 50%;
        left:0;
        height: 3px;
        background: gray;
        transform:translateY(-50%);
    }
`
export default function Character ({characters, charFound}){

    return (
        <CustomSection className="character-dropdown-list">
            {characters.map((char, index) => (
                <div className={charFound.includes(char.name) ?"character found": "character"} key={index}>
                    <img src={char.image}  alt={char.name}></img>
                    <div>{char.name}</div>
                </div>
            ))}
           
        </CustomSection>
    )
}

Character.prototype={
    characters: PropTypes.array,
    charFound: PropTypes.array

}