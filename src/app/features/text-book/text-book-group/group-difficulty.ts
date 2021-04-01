export interface IGroupDifficulty {
  groupId: number;
  name: string;
  color: string;
}

export const difficulties: IGroupDifficulty[] = [
  { groupId: 0, name: 'Beginner', color: 'f94144' },
  { groupId: 1, name: 'Elementary', color: 'f3722c' },
  { groupId: 2, name: 'Intermediate', color: 'f8961e' },
  { groupId: 3, name: 'Upper-Intermediate', color: '90be6d' },
  { groupId: 4, name: 'Advanced', color: '43aa8b' },
  { groupId: 5, name: 'Proficiency', color: '577590' },
];
