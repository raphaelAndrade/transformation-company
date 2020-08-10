import React, {useState}  from 'react';
import { Consumer } from './Context/Context'

const Result_Battle = () => {
    const [numberBattles,setNumberBattles] = useState(0);
    const [battleResult, setBattleResult] = useState("");
    const [Alldestroyed, setAlldestroyed] = useState(false);
    const [winnerTeam, setWinnerTeam] = useState([])



    var winnerTeamArray = []
    const compareResult = (autoBolts, decepticons) => {
        const battleField = [] //Field Of Battle
   
        for(let i = 0; i < 2; i++){
            battleField[i] = []
        }

        let autoboltsTeam = battleField[0] = [...autoBolts]; //TODO: create setState
        let decepticonsTeam = battleField[1] = [...decepticons];
        let differenceFightersNumber = 0;
        var survivor;
        let numberOfSurvivor = [];
        let loseTeamArray = [];
        let Variautobolt = 0;
        let Varidecepticons = 0;
        var battleNum = 0;
        

        

        //who survivor
        for(let i = 0; i < battleField.length; i++){
            if(autoboltsTeam.length > decepticonsTeam.length){
                differenceFightersNumber = autoboltsTeam.length - decepticonsTeam.length;
                for(let i = 0; i < differenceFightersNumber; i++) {
                    survivor = autoboltsTeam.pop();
                    numberOfSurvivor.push(survivor);
                }
            } else {
                differenceFightersNumber = decepticonsTeam.length - autoboltsTeam.length;
                for(let i = 0; i < differenceFightersNumber; i++) {
                    survivor = decepticonsTeam.pop();
                    numberOfSurvivor.push(survivor);
                }
            }
        }

        
        for(let i = 0; i < autoboltsTeam.length; i++){
            if(autoboltsTeam[i].name.toLowerCase() === "optimus prime" && decepticonsTeam[i].name.toLowerCase() === "predaking"){
                setAlldestroyed(true);              
             } else if(autoboltsTeam[i].name.toLowerCase() === "optimus prime" && decepticonsTeam[i].name.toLowerCase() !== "predaking"){
                winnerTeamArray.push(autoboltsTeam[i].name);
                loseTeamArray.push(decepticonsTeam[i].name);
                Variautobolt++;
                battleNum++;
                setNumberBattles(battleNum);
             } else if(decepticonsTeam[i].name.toLowerCase() === "predaking" && autoboltsTeam[i].name.toLowerCase() !== "optimus prime") {
                winnerTeamArray.push(decepticonsTeam[i].name);
                loseTeamArray.push(autoboltsTeam[i].name);
                Varidecepticons++
                battleNum++;
                setNumberBattles(battleNum);
             } else if(parseInt(autoboltsTeam[i].abilities.courage) > parseInt(decepticonsTeam[i].abilities.courage) && parseInt(autoboltsTeam[i].abilities.courage) - parseInt(decepticonsTeam[i].abilities.courage) >= 4){ //TODO: check it again
                winnerTeamArray.push(autoboltsTeam[i].name);
                loseTeamArray.push(decepticonsTeam[i].name);
                Variautobolt++;
                battleNum++;
                setNumberBattles(battleNum);
             }  else if(parseInt(decepticonsTeam[i].abilities.courage) > parseInt(autoboltsTeam[i].abilities.courage) && parseInt(decepticonsTeam[i].abilities.courage) - parseInt(autoboltsTeam[i].abilities.courage) >= 4){ 
                winnerTeamArray.push(autoboltsTeam[i].name);
                loseTeamArray.push(decepticonsTeam[i].name);
                Variautobolt++;
                battleNum++;
                setNumberBattles(battleNum);
             } else if(parseInt(autoboltsTeam[i].abilities.overall === decepticonsTeam[i].abilities.overall)){
                Variautobolt = Variautobolt;
                Varidecepticons = Varidecepticons;
                battleNum++;
                setNumberBattles(battleNum);
             } else if(autoboltsTeam[i].abilities.overall > decepticonsTeam[i].abilities.overall){
                winnerTeamArray.push(autoboltsTeam[i].name);
                loseTeamArray.push(decepticonsTeam[i].name);
                Variautobolt++;
                battleNum++;
                setNumberBattles(battleNum);
            } else {
                winnerTeamArray.push(decepticonsTeam[i].name);
                loseTeamArray.push(autoboltsTeam[i].name);
                Varidecepticons++
                battleNum++;
                setNumberBattles(battleNum);
                }
            }

            if(Alldestroyed == true) {
                setBattleResult("All fighters were destroyed")
             } else if(Variautobolt > Varidecepticons){
                setBattleResult("The winning team is AutoBolt")
            }else if(Variautobolt == 0 && Varidecepticons == 0){
                setBattleResult("The fight ended without winners")
            } else {
                setBattleResult("The winning team is Decepticon")
            }
    }

    return(
        <Consumer>
            {value => {
                const {showResultBattle,autobotsTeam,decepticonsTeam} = value;
                compareResult(autobotsTeam,decepticonsTeam);
                return(
                    <>
                    {showResultBattle ? 
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Battle Result</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="stage">
                                    <ul>
                                        <li><span>{numberBattles}</span> Battles</li>
                                        <li>{battleResult}</li>
                                        {Alldestroyed == false ? <li>
                                            <ul>
                                                <li>The Winning Fighters are:</li>
                                                {winnerTeamArray.map((val, key) => (
                                                  <li key={key}>{val}</li>
                                                ))}
                                            </ul>
                                        </li> : " "}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> : " "
                    }
                    </>
                )
            }}
        </Consumer>
    )
}
export default Result_Battle;
