import React, {Component} from 'react';

class ClassJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lodestoneData: this.props.lodestoneData
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.lodestoneData !== nextProps.lodestoneData) {
            this.setState({lodestoneData: nextProps.lodestoneData});
        }
    }

    getClassJobIconsSorted() {

        let classJobAbbreviations = {
            "Astrologian": "AST", 
            "Bard" : "BRD",
            "Black Mage": "BLM",
            "Dark Knight": "DRK",
            "Dragoon" : "DRG",
            "Machinist" : "MCH",
            "Monk" : "MNK",
            "Ninja" : "NIN",
            "Paladin" : "PLD",
            "Red Mage" : "RDM",
            "Samurai" : "SAM",
            "Summoner" : "SMN",
            "Warrior" : "WAR",
            "White Mage" : "WHM"
        };

        let sortedClassJobs = [];

        Object.values(this.state.lodestoneData.data.classjobs).sort((a, b) => {
            let nameA = a.name;
            let nameB = b.name;

            return nameA.localeCompare(nameB);
        }).map((classJob, index) => {

            if (classJob.level === 0) return classJob;

            switch(classJob.name){
                case "Astrologian":
                case "Bard":
                case "Black Mage":
                case "Dark Knight":
                case "Dragoon":
                case "Machinist":
                case "Monk":
                case "Ninja":
                case "Paladin":
                case "Red Mage":
                case "Samurai":
                case "Summoner":
                case "Warrior":
                case "White Mage":
                    sortedClassJobs.push({
                        name: classJob.name,
                        abbr: classJobAbbreviations[classJob.name],
                        imgSrc: "/img/" + classJobAbbreviations[classJob.name].toLowerCase() + ".png",
                        level: classJob.level
                    });
                    break;
                default:break;
            }
            return classJob;
        }).map((classJob, index) => {

            if (classJob.level === 0) return null;

            switch(classJob.name){
                case "Alchemist":
                case "Armorer":
                case "Blacksmith":
                case "Botanist":
                case "Carpenter":
                case "Culinarian":
                case "Fisher":
                case "Goldsmith":
                case "Leatherworker":
                case "Miner":
                case "Weaver":
                    sortedClassJobs.push({
                        name: classJob.name,
                        abbr: classJob.data.abbr,
                        imgSrc: classJob.data.icon,
                        level: classJob.level
                    });
                    break;
                default:break;
            }

            return null;
        });

        return (
            <ul style={{listStyle: 'none', padding:0, marginTop: '1em'}}>
            {sortedClassJobs.map((classJob, index) => {
                return (
                    <li key={index} style={{float: 'left', textAlign: 'center', marginRight: '0.2em'}}>
                        <img width={24} height={24} src={classJob.imgSrc} alt={classJob.name}/><br/>
                        <span>{classJob.level}</span>
                    </li>
                )
            })
            }
            </ul>
        )
    }


    render() {
        return this.getClassJobIconsSorted();
    }

}

export default ClassJobs;