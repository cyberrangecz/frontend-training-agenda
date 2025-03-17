import { Team, TrainingUser } from '@crczp/training-model';

function comparePlayersByName(a: TrainingUser, b: TrainingUser): number {
    if (a.name === b.name) {
        return a.id - b.id;
    }
    return a.name.localeCompare(b.name);
}

function compareTeamsById(a: Team, b: Team): number {
    return a.id - b.id;
}

export { comparePlayersByName, compareTeamsById };
